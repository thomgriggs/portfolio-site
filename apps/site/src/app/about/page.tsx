import Link from 'next/link';

export const metadata = {
  title: 'About',
  description: 'Learn about Thom Griggs, a senior frontend developer with 15+ years experience translating designs into clean, accessible code.',
};

export default function AboutPage() {
  return (
    <main className="about-page" id="main-content" role="main">
      {/* Header */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-hero-text">
            <h1 className="about-title">About</h1>
            <p className="about-subtitle">
              Front-end developer who hand-codes clean, fast, accessible sites for brands and hospitality
            </p>
            
            {/* Back to Home */}
            <div className="about-back-link">
              <Link href="/" className="back-link">
                ← Back to Home
              </Link>
            </div>
          </div>
          
          <div className="about-hero-visual">
            <div className="about-profile">
              <div className="about-profile-image">
                <div className="about-profile-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
              </div>
              
              <div className="about-social">
                <h3 className="about-social-title">Connect with me</h3>
                <div className="about-social-links">
                  <a href="mailto:thomgriggs@gmail.com" className="about-social-link" aria-label="Email">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/in/thomgriggs" className="about-social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://github.com/thomgriggs" className="about-social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="https://calendly.com/thomgriggs/30min" className="about-social-link" aria-label="Schedule a call" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content">
        <div className="about-content-container">
          <div className="about-intro">
            <p className="about-intro-text">
              I build front-end for brands and hospitality—clean HTML/CSS, straightforward JavaScript, and small, reliable components.
            </p>
            
            <p className="about-intro-text">
              I like tidy code, sensible spacing, and features that respect the keyboard. I&apos;ll take the messy parts, organize them, and make them feel simple.
            </p>
            
            <p className="about-intro-text">
              Right now I&apos;m polishing patterns for sliders, menus, and content templates, and leaning into performance and accessibility basics.
            </p>
          </div>

          {/* CTA */}
          <div className="about-cta">
            <div className="about-cta-actions">
              <Link href="/projects" className="btn btn-primary">
                View my work
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Say hello
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
