import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto max-w-4xl px-4 py-3 flex items-center gap-6">
        <Link href="/" className="text-lg font-semibold">TG</Link>
        <div className="ml-auto flex gap-4">
          <Link href="/" className="font-medium hover:underline">Home</Link>
          <Link href="/about" className="font-medium hover:underline">About</Link>
          <Link href="/projects" className="font-medium hover:underline">Projects</Link>
        </div>
      </nav>
    </header>
  );
}
