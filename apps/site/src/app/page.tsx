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
    <main className="homepage" id="main" role="main">
      {/* Hero Section */}
      <section className="homepage-hero">
        <div className="homepage-hero-content">
          <div className="homepage-hero-text">
            <h1 className="homepage-title">
              Front-end developer building clean, accessible sites.
            </h1>
            <p className="homepage-subtitle">
              I turn rough ideas into fast, responsive UI with solid keyboard support and clear structure.
            </p>
            
            <div className="homepage-cta">
              <Link href="/projects" className="cta-button">
                View my work
              </Link>
              <Link href="/contact" className="cta-button-secondary">
                Say hello
              </Link>
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

      {/* About Section */}
      <section className="homepage-about">
        <div className="homepage-about-content">
          <div className="homepage-about-header">
            <h2 className="homepage-about-title">About</h2>
          </div>
          
          <div className="homepage-about-text">
            <p>
              I build front-end for brands and hospitality—clean HTML/CSS, straightforward JavaScript, and small, reliable components.
            </p>
            <p>
              I like tidy code, sensible spacing, and features that respect the keyboard. I&apos;ll take the messy parts, organize them, and make them feel simple.
            </p>
            <p>
              Right now I&apos;m polishing patterns for sliders, menus, and content templates, and leaning into performance and accessibility basics.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
