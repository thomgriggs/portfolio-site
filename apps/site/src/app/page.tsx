import Link from 'next/link';
import { sanity } from '@/sanity/client';
import { ALL_PROJECTS } from '@/sanity/queries';
import type { Project } from '@/types/sanity';
import { unstable_noStore as noStore } from 'next/cache';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  noStore();
  const projects = await sanity.fetch<Project[]>(ALL_PROJECTS);
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <main className="homepage" id="main-content" role="main">
      {/* Hero Section */}
      <section className="homepage-hero">
        <div className="homepage-hero-content">
          <div className="homepage-hero-text">
            <h1 className="homepage-title">
              Thom Griggs
            </h1>
            <p className="homepage-subtitle">
              Senior Frontend Developer
            </p>
            <p className="homepage-description">
              I translate beautiful designs into clean, accessible code. With 15+ years of experience 
              and 250+ handcrafted websites, I help teams bridge the gap between design and development.
            </p>
            
            <div className="homepage-stats">
              <div className="homepage-stat">
                <span className="homepage-stat-number">250+</span>
                <span className="homepage-stat-label">Websites Built</span>
              </div>
              <div className="homepage-stat">
                <span className="homepage-stat-number">15+</span>
                <span className="homepage-stat-label">Years Experience</span>
              </div>
              <div className="homepage-stat">
                <span className="homepage-stat-number">100%</span>
                <span className="homepage-stat-label">Remote Work</span>
              </div>
            </div>
            
            <div className="homepage-actions">
              <Link 
                href="/work" 
                className="btn btn-primary"
              >
                View My Work
              </Link>
              <Link 
                href="/contact" 
                className="btn btn-secondary"
              >
                Let's Talk
              </Link>
            </div>
          </div>
          
          <div className="homepage-hero-visual">
            <div className="homepage-code-preview">
              <div className="homepage-code-header">
                <div className="homepage-code-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="homepage-code-title">thomgriggs.com</span>
              </div>
              <div className="homepage-code-content">
                <div className="homepage-code-line">
                  <span className="homepage-code-keyword">const</span>
                  <span className="homepage-code-variable"> developer</span>
                  <span className="homepage-code-operator"> = </span>
                  <span className="homepage-code-string">"design-to-code specialist"</span>
                </div>
                <div className="homepage-code-line">
                  <span className="homepage-code-keyword">const</span>
                  <span className="homepage-code-variable"> experience</span>
                  <span className="homepage-code-operator"> = </span>
                  <span className="homepage-code-number">15</span>
                  <span className="homepage-code-operator"> + </span>
                  <span className="homepage-code-string">" years"</span>
                </div>
                <div className="homepage-code-line">
                  <span className="homepage-code-keyword">const</span>
                  <span className="homepage-code-variable"> projects</span>
                  <span className="homepage-code-operator"> = </span>
                  <span className="homepage-code-number">250</span>
                  <span className="homepage-code-operator"> + </span>
                  <span className="homepage-code-string">" websites"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      {featuredProjects.length > 0 && (
        <section className="homepage-featured">
          <div className="homepage-featured-content">
            <div className="homepage-featured-header">
              <h2 className="homepage-featured-title">Featured Work</h2>
              <p className="homepage-featured-subtitle">
                A selection of projects showcasing design-to-code translation expertise
              </p>
            </div>
            
            <div className="homepage-featured-grid">
              {featuredProjects.map((project) => (
                <article 
                  key={project._id} 
                  className="homepage-featured-card"
                >
                  <div className="homepage-featured-card-header">
                    <h3 className="homepage-featured-card-title">
                      {project.title}
                    </h3>
                    <span className="homepage-featured-badge">
                      Featured
                    </span>
                  </div>
                  
                  <p className="homepage-featured-card-meta">
                    {(project as Project & { year?: string }).year ? `${(project as Project & { year?: string }).year} · ` : ''}
                    {(project as Project & { type?: string }).type || 'Website'}
                    {project.industry ? ` · ${project.industry}` : ''}
                  </p>
                  
                  {(project as Project & { summary?: string }).summary && (
                    <p className="homepage-featured-card-description">
                      {(project as Project & { summary?: string }).summary}
                    </p>
                  )}
                </article>
              ))}
            </div>
            
            <div className="homepage-featured-footer">
              <Link 
                href="/work" 
                className="homepage-featured-link"
              >
                View All Projects →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* What I Do Section */}
      <section className="homepage-what-i-do">
        <div className="homepage-what-i-do-content">
          <div className="homepage-what-i-do-header">
            <h2 className="homepage-what-i-do-title">What I Do</h2>
            <p className="homepage-what-i-do-subtitle">
              I help teams bridge the gap between design and development
            </p>
          </div>
          
          <div className="homepage-what-i-do-grid">
            <div className="homepage-what-i-do-item">
              <div className="homepage-what-i-do-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="homepage-what-i-do-item-title">Design to Code</h3>
              <p className="homepage-what-i-do-item-description">
                Translate Figma designs into pixel-perfect, responsive code that works across all devices.
              </p>
            </div>
            
            <div className="homepage-what-i-do-item">
              <div className="homepage-what-i-do-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3 className="homepage-what-i-do-item-title">Performance</h3>
              <p className="homepage-what-i-do-item-description">
                Optimize for speed and accessibility, ensuring your site loads fast and works for everyone.
              </p>
            </div>
            
            <div className="homepage-what-i-do-item">
              <div className="homepage-what-i-do-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="homepage-what-i-do-item-title">Team Collaboration</h3>
              <p className="homepage-what-i-do-item-description">
                Work seamlessly with designers, developers, and stakeholders to deliver exceptional results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
