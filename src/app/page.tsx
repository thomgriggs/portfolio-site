import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/lib/projects.data';
import Hero from '@/components/Hero';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default function HomePage() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <main className="homepage" id="main-content" role="main">
      <Hero />

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
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
            
            <div className="homepage-featured-footer">
              <Link 
                href="/projects" 
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
