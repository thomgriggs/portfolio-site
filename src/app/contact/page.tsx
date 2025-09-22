"use client";
import { useState } from "react";
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Card, CardContent } from '../../components/ui/card';

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
      <div className="contact-hero">
        <div className="contact-hero-content">
          <h1 className="contact-title">Let&apos;s work together</h1>
          <p className="contact-subtitle">Tell me what you need and how I can help. I&apos;ll reply quickly.</p>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-grid">
          <div className="contact-actions">
            <h2 className="contact-actions-title">Quick actions</h2>
            <div className="contact-actions-list">
              <Button 
                variant="outline" 
                className="contact-action-btn"
                onClick={() => pick("Site URL: ")}
              >
                Request a 3-bullet audit
              </Button>
              <Button 
                variant="ghost" 
                className="contact-action-btn"
                onClick={() => pick("I'm looking for an accessibility review on an existing site…")}
              >
                Accessibility Help
              </Button>
              <Button 
                variant="ghost" 
                className="contact-action-btn"
                onClick={() => pick("I need a simple, fast marketing site with clean HTML/CSS and minimal JS…")}
              >
                New Site
              </Button>
              <Button 
                variant="ghost" 
                className="contact-action-btn"
                onClick={() => pick("We have a menu/slider/navigation that needs to be keyboard-friendly and smoother…")}
              >
                UI Cleanup
              </Button>
            </div>
          </div>

          <Card className="contact-form-card">
            <CardContent className="contact-form-content">
              <form className="contact-form" action="mailto:thomgriggs@gmail.com" method="post" encType="text/plain" aria-describedby="contact-note">
                <input type="hidden" name="subject" value="Website inquiry from thomgriggs-portfolio" />
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
                
                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <Label htmlFor="name" className="contact-form-label">Name</Label>
                    <Input 
                      id="name"
                      name="name" 
                      required 
                      className="contact-form-input" 
                    />
                  </div>
                  <div className="contact-form-field">
                    <Label htmlFor="email" className="contact-form-label">Email</Label>
                    <Input 
                      id="email"
                      name="email" 
                      type="email" 
                      required 
                      className="contact-form-input" 
                    />
                  </div>
                </div>
                
                <div className="contact-form-field">
                  <Label htmlFor="message" className="contact-form-label">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={6} 
                    required 
                    className="contact-form-textarea" 
                    value={message} 
                    onChange={(e)=>setMessage(e.target.value)} 
                  />
                </div>
                
                <p id="contact-note" className="contact-form-note">
                  Prefer a call? Include a time/timezone and we&apos;ll sync.
                </p>
                
                <Button type="submit" className="contact-form-submit">
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {assistantText && (
          <div aria-live="polite" aria-atomic="true" className="contact-assistant">
            {assistantText}
          </div>
        )}
      </div>
    </main>
  );
}