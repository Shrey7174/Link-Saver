import Navbar from '../components/Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      
      {/* Navbar at top */}
      <Navbar />

      {/* Main content container */}
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl p-8 bg-white dark:bg-gray-950 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold mb-6 text-green-600">About LinkSaver</h2>
          <p className="mb-4 leading-relaxed">
            <strong>LinkSaver</strong> is a full-stack productivity app designed to help users save, organize, and summarize web links with ease.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Auth:</strong> Sign Up/Login securely with Supabase</li>
            <li><strong>Link Saving:</strong> Bookmark URLs with title and favicon</li>
            <li><strong>AI Summary:</strong> Generate intelligent link summaries via Jina AI</li>
            <li><strong>Tags:</strong> Organize links using searchable tag input</li>
            <li><strong>Tag Search:</strong> Quickly search bookmarks by typing tag names</li>
            <li><strong>Drag & Drop:</strong> Reorder bookmarks and persist the new order to Supabase</li>
            <li><strong>Responsive Design:</strong> Fully mobile-optimized layout, with horizontal overflow protection for large tags or buttons</li>
            <li><strong>Dark Mode:</strong> Seamless support for light and dark themes</li>
          </ul>
          <p className="mt-6">
            Whether you're researching or collecting important resources, LinkSaver gives you a smarter, cleaner way to manage your digital life. Every feature is designed to keep your information organized and accessible, without distractions.
          </p>
        </div>
      </div>
    </div>
  );
}
