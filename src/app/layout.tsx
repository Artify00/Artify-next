// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Artify',
  description: 'Secure Provenance Chain for Artworks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-black font-sans bg-white">
        {children}
      </body>
    </html>
  );
}
