"use client";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

export function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section" role="banner" aria-label="Hero section">
      {/* Background gradient */}
      <div className="hero-background" aria-hidden="true"></div>
      
      {/* Floating elements for visual interest */}
      <div className="hero-floating-bg-1" aria-hidden="true"></div>
      <div className="hero-floating-bg-2" aria-hidden="true"></div>
      
      <div className="hero-content">
        <div className="hero-grid">
          {/* Left side - Text content */}
          <div className="hero-text-content">
            <div className="hero-title-group">
              <h1 className="hero-title" id="main-heading">
                I build production-ready UI—fast, accessible, and maintainable.
              </h1>
            </div>
            
            <div className="hero-description">
              <p className="hero-description-text" role="text" aria-label="Professional description">
                Hand-coded with Next.js + TypeScript. Proven on 260+ launches across hospitality and brands.
              </p>
            </div>
            
            <div className="hero-actions" role="group" aria-label="Primary actions">
              <Button 
                onClick={scrollToProjects} 
                size="lg" 
                className="group"
                aria-label="View my work portfolio"
              >
                View my work
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" aria-hidden="true" />
              </Button>
              <Button 
                onClick={scrollToContact} 
                variant="outline" 
                size="lg"
                aria-label="Say hello and get in touch"
              >
                Say hello
              </Button>
            </div>
            
            <nav className="hero-social" role="navigation" aria-label="Social media links">
              <a 
                href="https://github.com/thomgriggs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="Visit Thom's GitHub profile to view code repositories"
              >
                <Github className="hero-social-icon" aria-hidden="true" />
                <span>GitHub</span>
              </a>
              <a 
                href="https://linkedin.com/in/thomgriggs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hero-social-link"
                aria-label="Connect with Thom on LinkedIn for professional networking"
              >
                <Linkedin className="hero-social-icon" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
              <a 
                href="mailto:hello@thomgriggs.com"
                className="hero-social-link"
                aria-label="Send email to Thom to discuss projects or opportunities"
              >
                <Mail className="hero-social-icon" aria-hidden="true" />
                <span>Email</span>
              </a>
            </nav>
          </div>
          
          {/* Right side - Visual elements */}
          <div className="hero-visual" role="complementary" aria-label="Visual elements">
            {/* Floating badges - only show on larger screens to avoid crowding */}
            <div className="hero-floating-badges" role="region" aria-label="Technical skills badges" aria-hidden="true">
              <div className="hero-floating-badge hero-floating-badge-1" role="img" aria-label="HTML/CSS Expert skill level">
                <div className="hero-floating-badge-label">HTML/CSS</div>
                <div className="hero-floating-badge-value">Expert</div>
              </div>
              
              <div className="hero-floating-badge hero-floating-badge-2" role="img" aria-label="Typography Passionate skill level">
                <div className="hero-floating-badge-label">Typography</div>
                <div className="hero-floating-badge-value">Passionate</div>
              </div>
              
              <div className="hero-floating-badge hero-floating-badge-3" role="img" aria-label="React Learning skill level">
                <div className="hero-floating-badge-label">React</div>
                <div className="hero-floating-badge-value">Learning</div>
              </div>
              
              <div className="hero-floating-badge hero-floating-badge-4" role="img" aria-label="JavaScript Advanced skill level">
                <div className="hero-floating-badge-label">JavaScript</div>
                <div className="hero-floating-badge-value">Advanced</div>
              </div>
              
              <div className="hero-floating-badge hero-floating-badge-5" role="img" aria-label="Figma Expert skill level">
                <div className="hero-floating-badge-label">Figma</div>
                <div className="hero-floating-badge-value">Expert</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="hero-scroll-indicator" role="button" aria-label="Scroll down to view more content" tabIndex={0}>
        <span className="hero-scroll-text">SCROLL</span>
        <ArrowDown className="hero-scroll-arrow" aria-hidden="true" />
      </div>
    </section>
  );
}
