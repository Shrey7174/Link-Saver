'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Login', href: '/login' },
    { name: 'Sign Up', href: '/signup' },
  ];

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 sm:px-8 py-4 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-800">
      {/* Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-2xl">🔗</span>
        <h1 className="text-xl font-bold sm:font-extrabold text-green-600 tracking-wide">
          LinkSaver
        </h1>
      </div>

      {/* Nav Links */}
      <div className="flex flex-wrap gap-4 text-sm sm:text-base font-medium">
        {navItems.map(({ name, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={`px-2 py-1 rounded-md transition-colors duration-300 ${
                isActive
                  ? 'text-green-600 dark:text-green-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
