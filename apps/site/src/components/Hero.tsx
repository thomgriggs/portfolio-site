"use client";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Counter } from './Counter';

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
              <p className="hero-subtitle" role="text" aria-label="Professional title">
                Front-End Developer
              </p>
              <h1 className="hero-title" id="main-heading">
                <span className="hero-title-first">Thom</span>
                <span className="hero-title-last">Griggs</span>
              </h1>
            </div>
            
            <div className="hero-description">
              <p className="hero-description-text" role="text" aria-label="Professional description">
                Crafting pixel-perfect, responsive websites for the hospitality industry. 
                <span className="text-foreground font-medium" aria-label="10 plus years of experience">
                  <Counter end={10} suffix="+ years" />
                </span> of hand-coding 
                with a deep appreciation for <span className="text-foreground font-medium">typography</span> and 
                the <span className="text-foreground font-medium">craft</span>.
              </p>
              
              <div className="hero-status" role="status" aria-live="polite">
                <div className="hero-status-item">
                  <div className="hero-status-dot" aria-hidden="true"></div>
                  <span>Available for work</span>
                </div>
                <div>
                  <Counter end={260} suffix="+ websites" /> delivered
                </div>
              </div>
            </div>
            
            <div className="hero-actions" role="group" aria-label="Primary actions">
              <Button 
                onClick={scrollToProjects} 
                size="lg" 
                className="group"
                aria-label="Scroll to projects section to explore my work"
              >
                Explore My Work
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" aria-hidden="true" />
              </Button>
              <Button 
                onClick={scrollToContact} 
                variant="outline" 
                size="lg"
                aria-label="Scroll to contact section to get in touch"
              >
                Let's Connect
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
          <div className="hero-visual" role="complementary" aria-label="Professional profile and skills">
            <div className="hero-profile-container">
              <div className="hero-profile-bg" aria-hidden="true"></div>
              <div className="hero-profile-card" role="region" aria-label="Professional profile card">
                <div className="hero-profile-image" role="img" aria-label="Profile image placeholder">
                  <span>Profile Image</span>
                </div>
                <div className="hero-profile-details" role="list" aria-label="Professional details">
                  <div className="hero-profile-detail" role="listitem">
                    <span className="hero-profile-detail-label">Location</span>
                    <span className="hero-profile-detail-value">Remote</span>
                  </div>
                  <div className="hero-profile-detail" role="listitem">
                    <span className="hero-profile-detail-label">Experience</span>
                    <span className="hero-profile-detail-value">10+ Years</span>
                  </div>
                  <div className="hero-profile-detail" role="listitem">
                    <span className="hero-profile-detail-label">Focus</span>
                    <span className="hero-profile-detail-value">Hospitality</span>
                  </div>
                </div>
              </div>
            </div>
            
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
