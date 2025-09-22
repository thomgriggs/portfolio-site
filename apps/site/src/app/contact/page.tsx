"use client";
import { useState } from "react";
import Section from '../../components/ui/Section';

export default function ContactPage() {
  const [message, setMessage] = useState("");
  const [assistantText] = useState("");

  function pick(template: string) {
    setMessage(template);
    const el = document.getElementById("message") as HTMLTextAreaElement | null;
    el?.focus();
  }

  return (
    <main className="contact-page" id="main" role="main">
      <Section>
        <div className="max-w-3xl">
          <h1>Let&apos;s work together</h1>
          <p className="text-lg text-muted mt-6">Tell me what you need and how I can help. I&apos;ll reply quickly.</p>

          <div className="mt-8 mb-8">
            <button 
              type="button" 
              className="btn btn-primary mb-4"
              onClick={() => pick("Site URL: ")}
            >
              Request a 3-bullet audit
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Quick actions</h2>
              <div className="space-y-3">
                <button type="button" className="btn w-full text-left" onClick={() => pick("I'm looking for an accessibility review on an existing site…")}>Accessibility Help</button>
                <button type="button" className="btn w-full text-left" onClick={() => pick("I need a simple, fast marketing site with clean HTML/CSS and minimal JS…")}>New Site</button>
                <button type="button" className="btn w-full text-left" onClick={() => pick("We have a menu/slider/navigation that needs to be keyboard-friendly and smoother…")}>UI Cleanup</button>
              </div>
            </div>

            <form className="space-y-4" action="mailto:thomgriggs@gmail.com" method="post" encType="text/plain" aria-describedby="contact-note">
              <input type="hidden" name="subject" value="Website inquiry from thomgriggs-portfolio" />
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input name="name" required className="input w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input name="email" type="email" required className="input w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea id="message" name="message" rows={6} required className="textarea w-full" value={message} onChange={(e)=>setMessage(e.target.value)} />
              </div>
                      <p id="contact-note" className="text-sm text-muted">Prefer a call? Include a time/timezone and we&apos;ll sync.</p>
              <button type="submit" className="btn btn-primary">Send</button>
            </form>
          </div>
          {assistantText && (
            <div aria-live="polite" aria-atomic="true" className="mt-6">{assistantText}</div>
          )}
        </div>
      </Section>
    </main>
  );
}