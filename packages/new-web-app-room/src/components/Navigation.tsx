'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="neon-text text-cyan-400">Token Launch</span>
              <span className="text-white ml-2">Watcher</span>
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                pathname === '/' 
                  ? 'bg-cyan-500/20 text-cyan-400' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              Home
            </Link>
            {pathname.startsWith('/dashboard') && (
              <Link 
                href="/dashboard"
                className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
