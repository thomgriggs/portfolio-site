import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <header className="border-b">
          <nav className="mx-auto max-w-4xl px-4 py-3 flex gap-4">
            <Link href="/" className="font-medium">Home</Link>
            <Link href="/about" className="font-medium">About</Link>
            <Link href="/projects" className="font-medium">Projects</Link>
          </nav>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
