import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";

export const metadata: Metadata = {
  title: 'AP Dashboard',
  description: 'Dashboard to collecting ',
  icons: {
    // Standard favicon
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    // Apple touch icon
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    // Android chrome icons
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <div className="fixed inset-0 bg-[var(--background)] -z-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-2)] to-[var(--accent-1)] opacity-10 blur-3xl" />
        </div>
        {children}
      </body>
    </html>
  );
}

