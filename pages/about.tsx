// pages/about.tsx
import Navbar from '../components/Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl p-8 bg-white dark:bg-gray-950 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold mb-6 text-green-600">About LinkSaver</h2>
          <p className="mb-4 text-lg leading-relaxed">
            <strong>LinkSaver</strong> is a full-stack productivity app built to help you save, organize, and summarize web links in one clean, intuitive interface.
          </p>

          <ul className="list-disc pl-6 space-y-3 text-base">
            <li><strong>Auth:</strong> Sign up and log in securely via Supabase.</li>
            <li><strong> Link Saving:</strong> Add any URL and auto-fetch title + favicon.</li>
            <li><strong> AI Summary:</strong> Get smart link summaries using Jina AI.</li>
            <li><strong> Tags:</strong> Categorize links with easily searchable tags.</li>
            <li><strong> Tag Search:</strong> Filter bookmarks by tag names using a search bar.</li>
            <li><strong> Drag & Drop:</strong> Reorder links and persist changes to Supabase.</li>
            <li><strong> Responsive UI:</strong> Optimized for both desktop and mobile, including tag/button overflow handling.</li>
            <li><strong> Dark Mode:</strong> Automatic theme switch for day/night reading.</li>
          </ul>

          <p className="mt-6 leading-relaxed">
            Whether you&apos;re a student, researcher, or lifelong learner, LinkSaver helps you stay organized and focused. No clutter, just clarity.
          </p>
        </div>
      </main>
    </div>
  );
}
