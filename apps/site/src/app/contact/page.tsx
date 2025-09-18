"use client";
import { useState } from "react";

export default function ContactPage() {
  const [message, setMessage] = useState("");

  function pick(template: string) {
    setMessage(template);
    const el = document.getElementById("message") as HTMLTextAreaElement | null;
    el?.focus();
  }

  return (
    <main className="contact-page" id="main" role="main">
      <section className="stack">
        <h1>Let's work together</h1>
        <p className="text-muted">Tell me what you need and how I can help. I'll reply quickly.</p>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="stack">
            <h2 className="text-base">Quick actions</h2>
            <div className="grid gap-2">
              <button type="button" className="btn" onClick={() => pick("I'm looking for an accessibility review on an existing site…")}>Accessibility Help</button>
              <button type="button" className="btn" onClick={() => pick("I need a simple, fast marketing site with clean HTML/CSS and minimal JS…")}>New Site</button>
              <button type="button" className="btn" onClick={() => pick("We have a menu/slider/navigation that needs to be keyboard-friendly and smoother…")}>UI Cleanup</button>
            </div>
          </div>

          <form className="stack" action="mailto:thomgriggs@gmail.com" method="post" encType="text/plain" aria-describedby="contact-note">
            <label className="stack">
              <span>Name</span>
              <input name="name" required className="input" />
            </label>
            <label className="stack">
              <span>Email</span>
              <input name="email" type="email" required className="input" />
            </label>
            <label className="stack">
              <span>Message</span>
              <textarea id="message" name="message" rows={6} required className="textarea" value={message} onChange={(e)=>setMessage(e.target.value)} />
            </label>
            <p id="contact-note" className="text-sm text-muted">Prefer a call? Include a time/timezone and we'll sync.</p>
            <button type="submit" className="btn">Send</button>
          </form>
        </div>
      </section>
    </main>
  );
}