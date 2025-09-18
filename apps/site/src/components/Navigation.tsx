"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <div className="nav-wrap">
      <div className="flex items-center justify-between py-3">
        <Link href="/" className="font-semibold">TG</Link>
        <button
          className="md:hidden rounded px-3 py-2"
          aria-label="Open menu"
          aria-controls="site-menu"
          aria-expanded={open ? "true" : "false"}
          onClick={() => setOpen(!open)}
        >
          <span aria-hidden>☰</span>
        </button>
      </div>

      <nav id="site-menu" aria-label="Main" className={`${open ? "block" : "hidden"} md:block`}>
        <div ref={menuRef} className="grid gap-2 md:flex md:gap-4 pb-4 md:pb-0">
          <Link href="/projects" className="px-2 py-1 rounded focus-visible:outline-2 focus-visible:outline-offset-4">Projects</Link>
          <Link href="/about" className="px-2 py-1 rounded focus-visible:outline-2 focus-visible:outline-offset-4">About</Link>
          <Link href="/notes" className="px-2 py-1 rounded focus-visible:outline-2 focus-visible:outline-offset-4">Notes</Link>
          <Link href="/archive" className="px-2 py-1 rounded focus-visible:outline-2 focus-visible:outline-offset-4">Archive</Link>
          <Link href="/contact" className="px-2 py-1 rounded focus-visible:outline-2 focus-visible:outline-offset-4">Contact</Link>
        </div>
      </nav>
    </div>
  );
}
