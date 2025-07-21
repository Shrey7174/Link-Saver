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
    <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 shadow-md bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">🔗</span>
        <h1 className="text-xl font-extrabold text-green-600 tracking-wide">LinkSaver</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-sm font-medium">
        {navItems.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            className={`transition-colors duration-300 px-2 py-1 rounded-md ${
              pathname === href
                ? 'text-green-600 dark:text-green-400 font-semibold'
                : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
