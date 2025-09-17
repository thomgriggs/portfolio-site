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
            <h1 className="about-title">About Me</h1>
            <p className="about-subtitle">
              Senior frontend developer with 15+ years experience translating designs into clean, accessible code
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
            <h2 className="about-intro-title">Hi, I&apos;m Thom — a senior frontend developer who specializes in design-to-code translation.</h2>
            
            <p className="about-intro-text">
              I started in design and evolved into frontend development, giving me a unique perspective on both the creative process and technical implementation. Over 15+ years, I&apos;ve built 250+ boutique websites, developing the ability to fill in design details from minimal information and move projects forward efficiently.
            </p>
            
            <p className="about-intro-text">
              What sets me apart is my role as a translator between design and backend teams. I excel at communicating future problems proactively, guiding teams away from potential pitfalls, and pushing for innovation when time allows. I&apos;ve mastered remote collaboration while maintaining high communication standards and project momentum.
            </p>
          </div>

          {/* Professional Timeline */}
          <div className="about-timeline">
            <h3 className="about-timeline-title">My Professional Journey</h3>
            <p className="about-timeline-subtitle">
              Over 15+ years, I&apos;ve evolved from design into senior frontend development, building expertise in translating complex designs into clean, accessible code.
            </p>
            
            <div className="about-timeline-container">
              <div className="about-timeline-item">
                <div className="about-timeline-marker">
                  <div className="about-timeline-dot"></div>
                </div>
                <div className="about-timeline-content">
                  <div className="about-timeline-header">
                    <h4 className="about-timeline-role">Cendyn (formerly WIHP)</h4>
                    <span className="about-timeline-position">Front-End Developer</span>
                    <span className="about-timeline-duration">2014 – 2025</span>
                  </div>
                  <ul className="about-timeline-achievements">
                    <li>Built and maintained 250+ bespoke hotel and lifestyle websites from Figma/PDF designs</li>
                    <li>Developed custom Sass-based responsive framework that reduced build times and improved performance</li>
                    <li>Created front-end components like interactive sliders, scroll-triggered effects, and ADA-friendly navigation</li>
                    <li>Collaborated across teams to synchronize workflows and enhance CMS through reusable templates</li>
                  </ul>
                </div>
              </div>
              
              <div className="about-timeline-item">
                <div className="about-timeline-marker">
                  <div className="about-timeline-dot"></div>
                </div>
                <div className="about-timeline-content">
                  <div className="about-timeline-header">
                    <h4 className="about-timeline-role">ThomGriggs LLC</h4>
                    <span className="about-timeline-position">Senior Frontend Developer</span>
                    <span className="about-timeline-duration">2022 – Present</span>
                  </div>
                  <ul className="about-timeline-achievements">
                    <li>Contracted to provide front-end support for Optimum RV&apos;s website maintenance and redesign</li>
                    <li>Delivered ADA compliance updates for QlikTech&apos;s Support Portal across desktop and mobile</li>
                    <li>Built custom responsive websites for local businesses (F&S Frame & Trim, enV Hair Studio)</li>
                    <li>Specialized in design-to-code translation with minimal design information</li>
                  </ul>
                </div>
              </div>
              
              <div className="about-timeline-item">
                <div className="about-timeline-marker">
                  <div className="about-timeline-dot"></div>
                </div>
                <div className="about-timeline-content">
                  <div className="about-timeline-header">
                    <h4 className="about-timeline-role">Bisk Education</h4>
                    <span className="about-timeline-position">Senior Art Director (Interactive)</span>
                    <span className="about-timeline-duration">2006 – 2014</span>
                  </div>
                  <ul className="about-timeline-achievements">
                    <li>Led front-end coding for a 6-person interactive design team, overseeing quality and standards</li>
                    <li>Built responsive templates for universities including USF, University of St. Thomas, and UF</li>
                    <li>Implemented semantic grid system with LESS to streamline layouts and scalability</li>
                    <li>Developed campaign template systems enabling fast-turn media buys with adaptable templates</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <p className="about-timeline-conclusion">
              This journey has given me a unique perspective on both design and development, making me an effective translator between creative teams and technical implementation. I understand the creative process while delivering clean, accessible code.
            </p>
          </div>

          {/* What Makes Me Different */}
          <div className="about-differentiation">
            <h3 className="about-differentiation-title">What Makes Me Different</h3>
            <div className="about-differentiation-grid">
              <div className="about-differentiation-item">
                <div className="about-differentiation-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h4 className="about-differentiation-item-title">250+ Boutique Websites</h4>
                <p className="about-differentiation-item-description">
                  Volume experience with design-to-code translation, developing the ability to fill in design details from minimal information.
                </p>
              </div>
              
              <div className="about-differentiation-item">
                <div className="about-differentiation-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h4 className="about-differentiation-item-title">Design Background</h4>
                <p className="about-differentiation-item-description">
                  Deep appreciation for creative process and ability to support positive design elements while delivering clean code.
                </p>
              </div>
              
              <div className="about-differentiation-item">
                <div className="about-differentiation-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h4 className="about-differentiation-item-title">Team Translator</h4>
                <p className="about-differentiation-item-description">
                  Excel as interpreter between design and backend teams, communicating future problems proactively.
                </p>
              </div>
              
              <div className="about-differentiation-item">
                <div className="about-differentiation-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <h4 className="about-differentiation-item-title">Remote Mastery</h4>
                <p className="about-differentiation-item-description">
                  Balanced work and life while maintaining high communication standards and project momentum.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Expertise */}
          <div className="about-expertise">
            <h3 className="about-expertise-title">Technical Expertise</h3>
            <div className="about-expertise-grid">
              <div className="about-expertise-category">
                <h4 className="about-expertise-category-title">Design & Development</h4>
                <ul className="about-expertise-list">
                  <li>Design-to-Code Translation — Figma/PDF to responsive HTML/CSS/JS</li>
                  <li>Modern Frontend — React, TypeScript, Next.js, Sass</li>
                  <li>Responsive Design — Mobile-first, cross-browser compatibility</li>
                </ul>
              </div>
              
              <div className="about-expertise-category">
                <h4 className="about-expertise-category-title">Accessibility & Performance</h4>
                <ul className="about-expertise-list">
                  <li>ADA Compliance — WCAG standards, keyboard navigation, screen readers</li>
                  <li>Performance Optimization — Custom frameworks, bundle optimization</li>
                  <li>Core Web Vitals — Speed, accessibility, SEO optimization</li>
                </ul>
              </div>
              
              <div className="about-expertise-category">
                <h4 className="about-expertise-category-title">Tools & Frameworks</h4>
                <ul className="about-expertise-list">
                  <li>Version Control — Git, GitHub, collaborative workflows</li>
                  <li>Build Tools — Webpack, Vite, modern development setup</li>
                  <li>CMS Integration — Sanity, headless CMS, content management</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="about-cta">
            <h3 className="about-cta-title">Ready to Work Together?</h3>
            <p className="about-cta-description">
              I&apos;m looking for opportunities to bring my design-to-code expertise to your team. Whether it&apos;s a full-time role or a challenging project, I&apos;m ready to contribute from day one.
            </p>
            <div className="about-cta-actions">
              <Link href="/work" className="btn btn-primary">
                View My Work
              </Link>
              <a
                href="https://calendly.com/thomgriggs/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
