'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define Project type locally since we're not using Sanity
interface Project {
  _id: string;
  title: string;
  description: string;
  industry: string;
  featured: boolean;
  urlPath: string;
  dateCreated: string;
  images: Array<{
    _key: string;
    asset: {
      _ref: string;
      _type: string;
      url: string;
    };
  }>;
  skills: string[];
  tags?: string[];
  url?: string;
}

// Services data removed - not used in current implementation

export default function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load featured projects (no Sanity dependency)
  useEffect(() => {
    const loadProjects = () => {
      // Sample projects data
      const sampleProjects: Project[] = [
        {
          _id: 'project-1',
          title: 'Portfolio Website',
          description: 'Modern portfolio site built with Next.js 15, TypeScript, and advanced performance optimization techniques.',
          industry: 'Personal',
          featured: true,
          urlPath: '/',
          dateCreated: '2025-01-15',
          images: [],
          skills: ['Next.js', 'TypeScript', 'Performance', 'Accessibility'],
          tags: ['Next.js', 'TypeScript', 'Performance'],
          url: 'https://thomgriggs.com'
        },
        {
          _id: 'project-2',
          title: 'E-commerce Platform',
          description: 'Full-stack e-commerce solution with React, Node.js, and modern payment integration.',
          industry: 'E-commerce',
          featured: true,
          urlPath: '/projects/ecommerce',
          dateCreated: '2024-12-01',
          images: [],
          skills: ['React', 'Node.js', 'E-commerce', 'Payments'],
          tags: ['React', 'Node.js', 'E-commerce'],
          url: 'https://example-ecommerce.com'
        },
        {
          _id: 'project-3',
          title: 'Design System',
          description: 'Comprehensive design system with reusable components and documentation.',
          industry: 'Design',
          featured: true,
          urlPath: '/projects/design-system',
          dateCreated: '2024-11-15',
          images: [],
          skills: ['Design Systems', 'Components', 'Documentation', 'Figma'],
          tags: ['Design Systems', 'Components', 'Figma'],
          url: 'https://example-design-system.com'
        }
      ];
      
      setProjects(sampleProjects);
      setIsLoading(false);
    };

    loadProjects();
  }, []);

  // Auto-advance slider
  useEffect(() => {
    if (projects.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [projects.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <main className="work-page" id="main-content" role="main">
      {/* Header */}
      <section className="work-hero">
        <div className="work-hero-content">
          <h1 className="work-title">Here&apos;s My Work</h1>
          <p className="work-subtitle">
            Senior frontend developer with 15+ years experience translating designs into clean, accessible code
          </p>
          <Link href="/" className="work-back-link">
            ← Back to Home
          </Link>
        </div>
      </section>

      {/* Featured Work Slider */}
      <section className="work-featured">
        <div className="work-featured-container">
          <h2 className="work-featured-title">Featured Projects</h2>
          <p className="work-featured-subtitle">
            A selection of projects showcasing my expertise in design-to-code translation, accessibility, and performance optimization
          </p>
          
          {isLoading ? (
            <div className="work-slider-loading">
              <div className="work-slider-spinner"></div>
              <p>Loading featured projects...</p>
            </div>
          ) : projects.length > 0 ? (
            <div className="work-slider">
              <div className="work-slider-container">
                <div 
                  className="work-slider-track"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {projects.map((project) => (
                    <div key={project._id} className="work-slide">
                      <div className="work-slide-content">
                        <div className="work-slide-image">
                          {project.images && project.images.length > 0 && project.images[0]?.asset?.url ? (
                            <Image
                              src={project.images[0].asset.url}
                              alt={project.title}
                              fill
                              className="work-slide-img"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="work-slide-placeholder">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <polyline points="21,15 16,10 5,21"/>
                              </svg>
                              <span className="work-slide-placeholder-text">{project.title}</span>
                            </div>
                          )}
                        </div>
                        <div className="work-slide-info">
                          <h3 className="work-slide-title">{project.title}</h3>
                          <p className="work-slide-description">{project.description}</p>
                          <div className="work-slide-tags">
                            {project.tags && project.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span key={tagIndex} className="work-slide-tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="work-slide-link"
                          >
                            View Project →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Slider Controls */}
              <div className="work-slider-controls">
                <button 
                  className="work-slider-btn work-slider-prev"
                  onClick={prevSlide}
                  aria-label="Previous project"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15,18 9,12 15,6"/>
                  </svg>
                </button>
                
                <div className="work-slider-dots">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      className={`work-slider-dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  className="work-slider-btn work-slider-next"
                  onClick={nextSlide}
                  aria-label="Next project"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6"/>
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="work-slider-empty">
              <p>No featured projects available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Here's My Process */}
      <section className="work-process">
        <div className="work-process-container">
          <h2 className="work-process-title">Here&apos;s My Process</h2>
          <p className="work-process-subtitle">
            I specialize in translating designs into clean, accessible code while guiding teams toward better technical decisions
          </p>
          
          <div className="work-process-grid">
            <div className="work-process-item">
              <div className="work-process-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
              <h3 className="work-process-item-title">Design Review</h3>
              <p className="work-process-item-text">
                I review designs for technical feasibility, accessibility considerations, and future-proofing opportunities. I ask questions to understand the deeper meaning behind design decisions.
              </p>
            </div>
            
            <div className="work-process-item">
              <div className="work-process-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  <path d="M8 12l2 2 4-4"/>
                </svg>
              </div>
              <h3 className="work-process-item-title">Technical Guidance</h3>
              <p className="work-process-item-text">
                I guide designers and teams away from potential pitfalls, suggesting techniques that require less copy or stronger images based on my experience with 250+ projects.
              </p>
            </div>
            
            <div className="work-process-item">
              <div className="work-process-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16,18 22,12 16,6"/>
                  <polyline points="8,6 2,12 8,18"/>
                </svg>
              </div>
              <h3 className="work-process-item-title">Clean Implementation</h3>
              <p className="work-process-item-text">
                I translate designs into semantic HTML, accessible CSS, and lightweight JavaScript, ensuring cross-browser compatibility and performance optimization.
              </p>
            </div>
            
            <div className="work-process-item">
              <div className="work-process-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                  <path d="M13 12h3a2 2 0 0 1 2 2v1"/>
                  <path d="M13 12H9a2 2 0 0 0-2 2v1"/>
                </svg>
              </div>
              <h3 className="work-process-item-title">Quality Assurance</h3>
              <p className="work-process-item-text">
                I run comprehensive testing for accessibility compliance, performance metrics, and cross-device functionality to ensure the final product meets high standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Here's What Makes Me Different - Interactive */}
      <section className="work-differentiation">
        <div className="work-differentiation-container">
          <h2 className="work-differentiation-title">Here&apos;s What Makes Me Different</h2>
          <p className="work-differentiation-subtitle">
            My unique combination of experience, expertise, and approach sets me apart from other frontend developers
          </p>
          
          <div className="work-differentiation-grid">
            <div className="work-differentiation-item">
              <div className="work-differentiation-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="work-differentiation-content">
                <h3 className="work-differentiation-item-title">250+ Boutique Websites</h3>
                <div className="work-differentiation-counter">
                  <span className="work-differentiation-number">250</span>
                  <span className="work-differentiation-plus">+</span>
                </div>
                <p className="work-differentiation-item-text">
                  I&apos;ve built and maintained 250+ handcrafted hotel websites, developing the ability to fill in design details from minimal information and move projects forward efficiently.
                </p>
              </div>
            </div>
            
            <div className="work-differentiation-item">
              <div className="work-differentiation-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div className="work-differentiation-content">
                <h3 className="work-differentiation-item-title">Design-to-Code Translation</h3>
                <div className="work-differentiation-animation">
                  <div className="work-differentiation-transform">
                    <span>Design</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"/>
                    </svg>
                    <span>Code</span>
                  </div>
                </div>
                <p className="work-differentiation-item-text">
                  Starting in design and evolving into frontend development has given me deep appreciation for the creative process and ability to support positive design elements.
                </p>
              </div>
            </div>
            
            <div className="work-differentiation-item">
              <div className="work-differentiation-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="work-differentiation-content">
                <h3 className="work-differentiation-item-title">Team Collaboration</h3>
                <div className="work-differentiation-graph">
                  <div className="work-differentiation-bar" style={{ height: '60%' }}></div>
                  <div className="work-differentiation-bar" style={{ height: '80%' }}></div>
                  <div className="work-differentiation-bar" style={{ height: '100%' }}></div>
                  <div className="work-differentiation-bar" style={{ height: '90%' }}></div>
                </div>
                <p className="work-differentiation-item-text">
                  I excel as a translator between design and backend teams, communicating future problems proactively and pushing for innovation when time allows.
                </p>
              </div>
            </div>
            
            <div className="work-differentiation-item">
              <div className="work-differentiation-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <div className="work-differentiation-content">
                <h3 className="work-differentiation-item-title">Remote Work Mastery</h3>
                <div className="work-differentiation-stats">
                  <div className="work-differentiation-stat">
                    <span className="work-differentiation-stat-number">15+</span>
                    <span className="work-differentiation-stat-label">Years Remote</span>
                  </div>
                  <div className="work-differentiation-stat">
                    <span className="work-differentiation-stat-number">100%</span>
                    <span className="work-differentiation-stat-label">Communication</span>
                  </div>
                </div>
                <p className="work-differentiation-item-text">
                  I&apos;ve mastered the art of remote collaboration, balancing work and life effectively while maintaining high communication standards and project momentum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Let's Talk */}
      <section className="work-cta">
        <div className="work-cta-container">
          <h2 className="work-cta-title">Let&apos;s Talk</h2>
          <p className="work-cta-subtitle">
            Ready to work with a senior frontend developer who can handle complex projects efficiently?
          </p>
          <div className="work-cta-actions">
            <a
              href="https://calendly.com/thomgriggs/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              📅 Schedule a Call
            </a>
            <a
              href="/contact"
              className="btn btn-secondary"
            >
              Send a Message
            </a>
          </div>
        </div>
      </section>

      {/* Behind the Scenes Video */}
      <section className="work-video">
        <div className="work-video-container">
          <h2 className="work-video-title">Behind the Scenes</h2>
          <p className="work-video-subtitle">A glimpse into my creative process and personal projects</p>
          <div className="work-video-wrapper">
            <video
              className="work-video-element"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/videos/video.mp4" type="video/mp4" />
              <source src="/videos/video.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </main>
  );
}