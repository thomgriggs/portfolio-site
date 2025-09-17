import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Updates',
  description: 'Professional updates from Thom Griggs, senior frontend developer - project insights, technical learnings, and industry thoughts.',
};

// Professional updates with images - showcasing expertise and industry insights
const updates = [
  {
    id: 1,
    date: '2025-01-15',
    title: 'Portfolio Site Launch: Next.js 15 & Performance Optimization',
    content: 'Launched my new portfolio site built with Next.js 15 and TypeScript, achieving 100% Lighthouse scores across all categories. The project demonstrates advanced performance optimization techniques including bundle splitting, image optimization, and Core Web Vitals improvements. Key features include semantic CSS architecture and accessibility-first design patterns.',
    excerpt: 'Achieving 100% Lighthouse scores with Next.js 15, TypeScript, and advanced performance optimization techniques.',
    type: 'project',
    tags: ['Next.js', 'TypeScript', 'Performance', 'Accessibility'],
    image: '/images/updates/portfolio-launch.jpg',
    readTime: '5 min read'
  },
  {
    id: 2,
    date: '2025-01-10',
    title: 'AI-Assisted Development Workflows',
    content: 'Exploring how AI can enhance development workflows while maintaining code quality and architectural decisions. Implementing AI tools for documentation generation, code review assistance, and client communication templates. The key is strategic integration that augments rather than replaces developer expertise.',
    excerpt: 'Strategic AI integration that enhances development workflows while maintaining code quality and architectural decisions.',
    type: 'learning',
    tags: ['AI', 'Workflow', 'Automation', 'Productivity'],
    image: '/images/updates/ai-workflows.jpg',
    readTime: '4 min read'
  },
  {
    id: 3,
    date: '2025-01-05',
    title: 'Enterprise Accessibility Audit: WCAG 2.1 AA Compliance',
    content: 'Completed comprehensive accessibility audit for enterprise client, identifying and resolving WCAG 2.1 AA compliance issues. Focused on screen reader compatibility, keyboard navigation, and color contrast optimization. Delivered detailed remediation report with implementation timeline.',
    excerpt: 'Comprehensive WCAG 2.1 AA compliance audit with detailed remediation strategies for enterprise clients.',
    type: 'work',
    tags: ['Accessibility', 'WCAG', 'Enterprise', 'Audit'],
    image: '/images/updates/accessibility-audit.jpg',
    readTime: '6 min read'
  },
  {
    id: 4,
    date: '2024-12-28',
    title: 'Design System Architecture: Scalable Component Libraries',
    content: 'Developed comprehensive design system for agency client, establishing consistent patterns across 15+ websites. Created reusable component library with TypeScript interfaces, Storybook documentation, and automated testing. Reduced development time by 40% while improving design consistency.',
    excerpt: 'Building scalable design systems that reduce development time by 40% while improving design consistency.',
    type: 'project',
    tags: ['Design Systems', 'Components', 'TypeScript', 'Storybook'],
    image: '/images/updates/design-system.jpg',
    readTime: '7 min read'
  },
  {
    id: 5,
    date: '2024-12-20',
    title: 'Remote Collaboration: Building Effective Team Dynamics',
    content: 'Reflecting on 5+ years of remote work experience and strategies for maintaining team cohesion across time zones. Key insights include asynchronous communication patterns, documentation-first approaches, and regular virtual check-ins. Remote work success depends on clear processes and intentional relationship building.',
    excerpt: '5+ years of remote work insights: building team cohesion across time zones through intentional processes.',
    type: 'personal',
    tags: ['Remote Work', 'Collaboration', 'Team Building', 'Communication'],
    image: '/images/updates/remote-collaboration.jpg',
    readTime: '5 min read'
  },
  {
    id: 6,
    date: '2024-12-15',
    title: 'Performance Optimization: Core Web Vitals Mastery',
    content: 'Deep dive into Core Web Vitals optimization techniques, achieving 95+ scores across all metrics. Implemented advanced strategies including resource hints, critical CSS inlining, and progressive image loading. Performance optimization is not just about speed—it\'s about user experience and business impact.',
    excerpt: 'Mastering Core Web Vitals optimization with advanced strategies that impact both UX and business metrics.',
    type: 'learning',
    tags: ['Performance', 'Core Web Vitals', 'Optimization', 'UX'],
    image: '/images/updates/performance-optimization.jpg',
    readTime: '8 min read'
  }
];

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'project': return 'Project';
    case 'learning': return 'Learning';
    case 'work': return 'Work';
    case 'personal': return 'Personal';
    default: return 'Update';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'project': return 'var(--color-primary)';
    case 'learning': return 'var(--color-success)';
    case 'work': return 'var(--color-warning)';
    case 'personal': return 'var(--color-info)';
    default: return 'var(--text-secondary)';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export default function UpdatesPage() {
  return (
    <main className="updates-page" id="main-content" role="main">
      {/* Header */}
      <section className="updates-hero">
        <div className="updates-hero-content">
          <h1 className="updates-title">Updates</h1>
          <p className="updates-subtitle">
            Professional insights, project updates, and technical learnings from my journey as a senior frontend developer.
          </p>
          <Link href="/" className="updates-back-link">
            ← Back to Home
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="updates-content">
        <div className="updates-container">
          {/* Introduction */}
          <div className="updates-intro">
            <h2 className="updates-intro-title">What You&apos;ll Find Here</h2>
            <p className="updates-intro-text">
              This space showcases my professional growth, project insights, and technical discoveries. 
              From deep-dives into performance optimization to reflections on remote collaboration, 
              each update offers a glimpse into the thinking behind my work.
            </p>
          </div>

          {/* Updates List */}
          <div className="updates-list">
            {updates.map((update) => (
              <article key={update.id} className="updates-post">
                <div className="updates-post-image">
                  <Image
                    src={update.image}
                    alt={update.title}
                    width={400}
                    height={250}
                    className="updates-post-img"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div className="updates-post-overlay">
                    <span 
                      className="updates-post-type"
                      style={{ backgroundColor: getTypeColor(update.type) }}
                    >
                      {getTypeLabel(update.type)}
                    </span>
                  </div>
                </div>
                
                <div className="updates-post-content">
                  <div className="updates-post-meta">
                    <time className="updates-post-date" dateTime={update.date}>
                      {formatDate(update.date)}
                    </time>
                    <span className="updates-post-read-time">{update.readTime}</span>
                  </div>
                  
                  <h3 className="updates-post-title">{update.title}</h3>
                  <p className="updates-post-excerpt">{update.excerpt}</p>
                  
                  <div className="updates-post-tags">
                    {update.tags.map((tag, index) => (
                      <span key={index} className="updates-post-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link href={`/updates/${update.id}`} className="updates-post-link">
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="updates-newsletter">
            <div className="updates-newsletter-content">
              <h3 className="updates-newsletter-title">Stay Updated</h3>
              <p className="updates-newsletter-text">
                Get notified when I publish new insights, project updates, or technical deep-dives.
              </p>
              <form className="updates-newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="updates-newsletter-input"
                  required
                />
                <button type="submit" className="updates-newsletter-button">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* RSS Feed */}
          <div className="updates-rss">
            <p className="updates-rss-text">
              Prefer RSS? <a href="/rss.xml" className="updates-rss-link">Subscribe to the feed</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}