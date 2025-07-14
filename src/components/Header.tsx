'use client'

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">Artify</Link>
      <nav className="space-x-4">
        <Link href="/dashboard" className="text-gray-700 hover:text-black">Dashboard</Link>
        <Link href="/admin" className="text-gray-700 hover:text-black">Admin</Link>
        <Link href="/login" className="text-gray-700 hover:text-black">Logout</Link>
      </nav>
    </header>
  );
}
