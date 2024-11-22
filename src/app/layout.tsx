import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AP Dashboard",
  description: "My dashboard pulling in all info relevant to me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="fixed inset-0 bg-[var(--background)] -z-10">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-2)] to-[var(--accent-1)] opacity-10 blur-3xl" />
        </div>
        {children}
      </body>
    </html>
  );
}

