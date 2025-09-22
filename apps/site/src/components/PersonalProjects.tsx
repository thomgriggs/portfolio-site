import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

// Personal projects data - can be swapped with Sanity data later
const personalProjects = [
  {
    title: "Portfolio Website",
    slug: "portfolio-website",
    href: "/projects/portfolio-website",
    image: "/images/projects/portfolio.jpg",
    year: 2024,
    client: "Personal",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Figma"],
    excerpt: "My personal portfolio website built with Next.js 15, featuring custom animations and responsive design.",
    featured: true,
    isPersonal: true
  },
  {
    title: "Design System Library",
    slug: "design-system-library",
    href: "/projects/design-system-library",
    image: "/images/projects/design-system.jpg",
    year: 2024,
    client: "Personal",
    tags: ["React", "Storybook", "Design Tokens", "Accessibility"],
    excerpt: "Comprehensive design system with reusable components, documentation, and accessibility guidelines.",
    featured: true,
    isPersonal: true
  },
  {
    title: "CSS Animation Playground",
    slug: "css-animation-playground",
    href: "/projects/css-animation-playground",
    image: "/images/projects/css-playground.jpg",
    year: 2023,
    client: "Personal",
    tags: ["CSS", "Animations", "Interactive", "Learning"],
    excerpt: "Interactive playground for experimenting with CSS animations and micro-interactions.",
    featured: true,
    isPersonal: true
  },
  {
    title: "Typography Experiments",
    slug: "typography-experiments",
    href: "/projects/typography-experiments",
    image: "/images/projects/typography.jpg",
    year: 2023,
    client: "Personal",
    tags: ["Typography", "CSS", "Web Fonts", "Design"],
    excerpt: "Collection of typography experiments exploring web fonts, spacing, and readability.",
    featured: false,
    isPersonal: true
  },
  {
    title: "Accessibility Testing Tool",
    slug: "accessibility-testing-tool",
    href: "/projects/accessibility-testing-tool",
    image: "/images/projects/a11y-tool.jpg",
    year: 2023,
    client: "Personal",
    tags: ["Accessibility", "Testing", "Chrome Extension", "WCAG"],
    excerpt: "Browser extension for automated accessibility testing and WCAG compliance checking.",
    featured: false,
    isPersonal: true
  },
  {
    title: "Performance Monitoring Dashboard",
    slug: "performance-monitoring-dashboard",
    href: "/projects/performance-monitoring-dashboard",
    image: "/images/projects/performance.jpg",
    year: 2022,
    client: "Personal",
    tags: ["Performance", "Monitoring", "Web Vitals", "Analytics"],
    excerpt: "Real-time performance monitoring dashboard for tracking Core Web Vitals and user experience metrics.",
    featured: false,
    isPersonal: true
  }
];

export function PersonalProjects() {
  // Get featured personal projects (first 3)
  const featuredPersonalProjects = personalProjects
    .filter(project => project.featured)
    .slice(0, 3);

  return (
    <section className="personal-projects" aria-label="Personal projects" data-test="personal-projects">
      <div className="personal-projects-content">
        <div className="personal-projects-header">
          <h2 className="personal-projects-title">Personal Projects</h2>
          <p className="personal-projects-subtitle">
            Side projects and experiments that showcase my passion for clean code and creative problem-solving.
          </p>
        </div>

        <div className="personal-projects-grid">
          {featuredPersonalProjects.map((project) => (
            <Card key={project.slug} className="personal-project-card">
              <div className="personal-project-image">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="personal-project-img"
                />
                <div className="personal-project-badge">
                  <Badge variant="secondary" className="personal-badge">
                    Personal
                  </Badge>
                </div>
              </div>
              <CardContent className="personal-project-content">
                <h3 className="personal-project-title">{project.title}</h3>
                <p className="personal-project-excerpt">{project.excerpt}</p>
                <div className="personal-project-tags">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="personal-project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={project.href} className="personal-project-link">
                  View details →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="personal-projects-cta">
          <Button asChild variant="outline" className="personal-projects-btn">
            <Link href="/projects?type=personal">
              See more personal work
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
