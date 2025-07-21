'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';

interface Bookmark {
  id: string;
  user_id: string;
  url: string;
  title: string;
  favicon: string;
  summary: string;
  tags: string[];
  order: number;
}

export default function Dashboard() {
  const [url, setUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [tagSearch, setTagSearch] = useState('');
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.replace('/login');
      } else {
        await fetchBookmarks();
      }
      setAuthChecked(true);
    };
    checkUser();
  }, [router]);

  const fetchBookmarks = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) return;

      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('order', { ascending: true });

      if (error) throw new Error(error.message);
      if (data) setBookmarks(data);
    } catch (err: any) {
      console.error('❌ Fetch failed:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveBookmark = async () => {
    setError(null);
    if (!url) {
      setError('Please enter a URL.');
      return;
    }

    try {
      const parsedUrl = new URL(url);
      const response = await fetch(`/api/summary?url=${encodeURIComponent(url)}`);
      const summary = response.ok ? await response.text() : 'No summary available.';
      const title = parsedUrl.hostname;
      const favicon = `${parsedUrl.origin}/favicon.ico`;
      const user = (await supabase.auth.getUser()).data.user;

      const tagList = tagsInput
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);

      const { error: insertError } = await supabase.from('bookmarks').insert([
        {
          user_id: user?.id,
          url,
          title,
          favicon,
          summary,
          tags: tagList,
          order: bookmarks.length,
        },
      ]);

      if (insertError) {
        setError('Failed to save bookmark.');
        console.error(insertError);
      } else {
        setUrl('');
        setTagsInput('');
        fetchBookmarks();
      }
    } catch (err) {
      setError('Invalid URL. Please check and try again.');
      console.error(err);
    }
  };

  const deleteBookmark = async (id: string) => {
    try {
      const { error } = await supabase.from('bookmarks').delete().eq('id', id);
      if (error) throw new Error(error.message);
      fetchBookmarks();
    } catch (err: any) {
      alert('❌ Failed to delete: ' + err.message);
    }
  };

  const reorder = async (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(bookmarks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    const updated = reordered.map((bm, i) => ({ ...bm, order: i }));
    setBookmarks(updated);

    for (let i = 0; i < updated.length; i++) {
      await supabase.from('bookmarks').update({ order: i }).eq('id', updated[i].id);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const filteredBookmarks = bookmarks.filter((bm) =>
    selectedTag ? bm.tags?.includes(selectedTag.toLowerCase()) : true
  );

  if (!authChecked || loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-black">
        <p className="text-lg text-gray-700 dark:text-gray-300 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 px-4 md:px-6 bg-gradient-to-r from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-300 dark:border-gray-700 pb-4 flex-wrap gap-2">
        <h1 className="text-3xl font-extrabold text-blue-700 dark:text-blue-400">
          🔗 Link Saver
        </h1>
        <div className="flex gap-2 flex-wrap text-sm items-center">
          <a
            href="/guide"
            className="hover:bg-blue-100 dark:hover:bg-gray-700 px-2 py-1 rounded text-blue-600 dark:text-blue-300 border border-blue-300 dark:border-blue-600"
          >
            Guide
          </a>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hover:bg-blue-100 dark:hover:bg-gray-700 px-2 py-1 rounded"
          >
            {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:bg-red-100 dark:hover:bg-red-700 px-2 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* URL + Tags Input */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          className="flex-1 p-2 border rounded shadow-sm"
          placeholder="Paste URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          className="w-full md:w-1/3 p-2 border rounded shadow-sm"
          placeholder="Tags (comma-separated)"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />
        <button
          onClick={saveBookmark}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md"
        >
          Save
        </button>
      </div>

      {/* Error Display */}
      {error && <p className="text-red-500 text-sm mb-4 ml-1">{error}</p>}

      {/* Tag Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded shadow-sm"
          placeholder="Search by tag..."
          value={tagSearch}
          onChange={(e) => {
            setTagSearch(e.target.value);
            setSelectedTag(e.target.value);
          }}
        />
        <button
          className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded text-sm"
          onClick={() => {
            setSelectedTag('');
            setTagSearch('');
          }}
        >
          Clear
        </button>
      </div>

      {/* Bookmark List */}
      <DragDropContext onDragEnd={reorder}>
        <Droppable droppableId="bookmarks">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {filteredBookmarks.map((bm, index) => (
                <Draggable key={bm.id} draggableId={bm.id} index={index}>
                  {(provided) => (
                    <div
                      className="p-4 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition hover:shadow-lg overflow-x-auto"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="flex justify-between flex-wrap gap-2">
                        <div className="flex gap-3 items-start">
                          <img
                            src={bm.favicon}
                            className="w-5 h-5 mt-1"
                            alt="favicon"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src =
                                'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
                            }}
                          />
                          <div>
                            <a
                              href={bm.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline break-words"
                            >
                              {bm.title}
                            </a>
                            <p className="text-sm mt-1 text-gray-700 dark:text-gray-300 break-words">
                              {bm.summary.slice(0, 150)}...
                            </p>
                            <div className="mt-2 flex gap-2 flex-wrap max-w-full">
                              {(bm.tags || []).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full whitespace-nowrap"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteBookmark(bm.id)}
                          className="text-red-500 hover:text-red-700 text-sm shrink-0"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
