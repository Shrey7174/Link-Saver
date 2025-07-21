// components/AuthLayout.tsx

import Navbar from './Navbar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      
      {/* Persistent Navbar at top */}
      <Navbar />

      {/* Auth form container */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 mt-8">
        <div className="w-full max-w-lg bg-white dark:bg-gray-950 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
