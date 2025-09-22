import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/projects.data';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="container py-6" aria-label="Breadcrumb">
        <Link 
          href="/projects" 
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Back to Projects
        </Link>
      </nav>

      {/* Hero Image */}
      <section className="container mb-12">
        <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            loading="lazy"
            priority={false}
          />
        </div>
      </section>

      {/* Case Study Content */}
      <article className="container max-w-4xl mx-auto px-4 pb-16">
        {/* Intro */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {project.title}
          </h1>
          <div className="prose prose-lg text-gray-600">
            <p className="text-xl leading-8">
              {project.excerpt}
            </p>
          </div>
        </section>

        {/* Role & Constraints */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Role & Constraints</h2>
          <div className="prose prose-lg text-gray-600">
            <p>
              As the lead front-end developer for {project.client}, I was responsible for creating 
              a modern, accessible web experience that would showcase the luxury hospitality brand 
              while maintaining optimal performance across all devices.
            </p>
            <p>
              Key constraints included tight deadlines, strict brand guidelines, and the need for 
              seamless integration with existing booking systems. The project required careful 
              balance between visual impact and functional usability.
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Highlights</h2>
          <div className="space-y-8">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Responsive Design System</h3>
              <p className="text-gray-600">
                Implemented a comprehensive design system with consistent spacing, typography, 
                and color tokens that scales beautifully from mobile to desktop.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Optimization</h3>
              <p className="text-gray-600">
                Achieved 95+ Lighthouse scores through image optimization, code splitting, 
                and strategic lazy loading of non-critical content.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility Excellence</h3>
              <p className="text-gray-600">
                Ensured WCAG 2.1 AA compliance with proper semantic markup, keyboard navigation, 
                and screen reader optimization.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Elements</h3>
              <p className="text-gray-600">
                Created smooth animations and micro-interactions that enhance user engagement 
                without compromising performance.
              </p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-gray-600">Lighthouse Performance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">40%</div>
              <div className="text-sm text-gray-600">Increase in Bookings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2.1s</div>
              <div className="text-sm text-gray-600">Average Load Time</div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technology Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200"
              >
                {tag}
              </span>
            ))}
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
              TypeScript
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
              Tailwind CSS
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
              Framer Motion
            </span>
          </div>
        </section>

        {/* Lessons Learned */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Lessons Learned</h2>
          <div className="prose prose-lg text-gray-600">
            <p>
              This project reinforced the importance of early performance planning and accessibility 
              considerations. Working closely with the design team from the beginning allowed us to 
              create a cohesive experience that balances visual appeal with functional requirements.
            </p>
            <p>
              The integration with existing booking systems taught me valuable lessons about API 
              design and error handling, ensuring a smooth user experience even when external 
              services experience issues.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
