// app/layout.tsx
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Artify',
  description: 'Secure Provenance Chain for Artworks',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black font-sans">
        <header className="w-full border-b border-gray-200 p-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">Artify</Link>
          <nav className="space-x-4">
            <Link href="/dashboard" className="text-gray-700 hover:text-black">Dashboard</Link>
            <Link href="/admin" className="text-gray-700 hover:text-black">Admin</Link>
            <Link href="/login" className="text-gray-700 hover:text-black">Logout</Link>
          </nav>
        </header>
        <main className="max-w-4xl mx-auto p-6">
          {children}
        </main>
        <footer className="w-full border-t border-gray-200 mt-10 p-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Artify. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
