// pages/guide.tsx
import { useRouter } from 'next/router';

export default function GuidePage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white p-6">
      <div className="flex justify-end">
        <button
          onClick={handleBack}
          className="text-red-600 border border-red-300 dark:border-red-600 hover:bg-red-100 dark:hover:bg-red-700 px-4 py-2 rounded mb-4"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-start">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-lg border border-gray-300 dark:border-gray-800">
          <h2 className="text-3xl font-bold mb-4 text-green-600">📘 LinkSaver Guide</h2>
          <ul className="list-disc pl-5 space-y-3 text-base leading-relaxed">
            <li><strong>Save Links:</strong> Paste any URL, hit save. We&apos;ll fetch the title, favicon, and summary automatically.</li>
            <li><strong>Tagging:</strong> Assign tags to organize your bookmarks. Use the tag search bar to filter them.</li>
            <li><strong>Reorder:</strong> Drag and drop bookmarks to reorder them as per your preference.</li>
            <li><strong>AI Summary:</strong> Powered by Jina AI, each saved link auto-generates a smart summary.</li>
            <li><strong>Responsive UI:</strong> Works seamlessly on desktop and mobile. Dark mode supported!</li>
            <li><strong>Logout:</strong> Securely logs you out of your session to protect your data.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
