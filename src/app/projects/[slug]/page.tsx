import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/projects.data';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-6 py-4" aria-label="Breadcrumb">
        <Link 
          href="/projects" 
          className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        >
          ← Back to Projects
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag: string) => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">{project.excerpt}</p>
        </div>

        {/* Hero Image */}
        <div className="aspect-[4/3] relative mb-12">
          <Image
            src={project.image}
            alt={`${project.title} project hero image`}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </section>

      {/* Case Study Content */}
      <article className="max-w-4xl mx-auto px-6 pb-16">
        {/* Intro */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Hotel Palombaggia is a luxury beachfront resort located on the pristine shores of Corsica, 
            France. The client needed a complete digital transformation to showcase their premium 
            accommodations, world-class amenities, and exclusive location while providing an 
            intuitive booking experience for discerning travelers.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            The project involved redesigning their existing website with a focus on visual storytelling, 
            performance optimization, and seamless user experience across all devices.
          </p>
        </section>

        {/* Role & Constraints */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Role & Constraints</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">My Role</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Front-end development and implementation</li>
                <li>• Performance optimization and Core Web Vitals</li>
                <li>• Accessibility compliance (WCAG 2.1 AA)</li>
                <li>• Cross-browser compatibility testing</li>
                <li>• Mobile-first responsive design</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Constraints</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Tight 6-week development timeline</li>
                <li>• Existing brand guidelines to follow</li>
                <li>• Integration with legacy booking system</li>
                <li>• Multi-language support requirements</li>
                <li>• Strict performance budgets</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Key Highlights</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Immersive Visual Experience</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Created a stunning visual narrative using high-resolution photography and smooth 
                animations to showcase the resort's luxury amenities and breathtaking location.
              </p>
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/projects/palombaggia-gallery-1.jpg"
                  alt="Hotel Palombaggia gallery view showing luxury accommodations"
                  fill
                  className="object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Performance Optimization</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Implemented advanced performance techniques including image optimization, lazy loading, 
                and code splitting to achieve Core Web Vitals scores above 90.
              </p>
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/projects/palombaggia-performance.jpg"
                  alt="Performance metrics dashboard showing Core Web Vitals scores"
                  fill
                  className="object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Accessibility Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Ensured full WCAG 2.1 AA compliance with semantic HTML, proper ARIA labels, 
                keyboard navigation, and screen reader optimization.
              </p>
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/projects/palombaggia-accessibility.jpg"
                  alt="Accessibility testing interface showing screen reader compatibility"
                  fill
                  className="object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Mobile-First Design</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Designed with mobile-first approach, ensuring seamless experience across all 
                devices with touch-friendly interactions and optimized layouts.
              </p>
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/projects/palombaggia-mobile.jpg"
                  alt="Mobile view of Hotel Palombaggia website showing responsive design"
                  fill
                  className="object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Booking Integration</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Seamlessly integrated with the existing booking system while maintaining 
                brand consistency and providing a smooth user journey from browsing to reservation.
              </p>
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/projects/palombaggia-booking.jpg"
                  alt="Booking interface showing reservation flow"
                  fill
                  className="object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Results</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Performance Score</div>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">2.1s</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Load Time</div>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Accessibility</div>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">40%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Booking Increase</div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Frontend</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Next.js 15 with App Router</li>
                <li>• TypeScript for type safety</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Framer Motion for animations</li>
                <li>• React Hook Form for forms</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Performance & SEO</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Next.js Image Optimization</li>
                <li>• Web Vitals monitoring</li>
                <li>• Structured data markup</li>
                <li>• Meta tags optimization</li>
                <li>• Progressive Web App features</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Lessons Learned */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Lessons Learned</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Performance First</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Starting with performance optimization from day one rather than retrofitting 
                led to better user experience and higher conversion rates.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Accessibility as Foundation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Building accessibility into the core architecture rather than adding it later 
                resulted in cleaner code and better maintainability.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Visual Storytelling Impact</h3>
              <p className="text-gray-600 dark:text-gray-300">
                High-quality imagery and thoughtful visual hierarchy significantly improved 
                user engagement and time spent on the site.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Ready to start your project?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Let's discuss how I can help bring your vision to life with clean, performant code.
          </p>
          <Link 
            href="/contact" 
            className="inline-block px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Get In Touch
          </Link>
        </section>
      </article>
    </main>
  );
}