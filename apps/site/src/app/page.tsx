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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Thomas Griggs
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Frontend Developer & Creative Technologist
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            I build exceptional digital experiences with modern web technologies. 
            Specializing in React, Next.js, and TypeScript.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/work" 
              className="px-8 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              View My Work
            </Link>
            <a 
              href="mailto:thomgriggs@gmail.com" 
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      {featuredProjects.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Work</h2>
            <p className="text-gray-600 dark:text-gray-300">A selection of my recent projects</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article 
                key={project._id} 
                className="group border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                    Featured
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {project.year ? `${project.year} · ` : ''}
                  {project.type || 'Website'}
                  {project.industry ? ` · ${project.industry}` : ''}
                </p>
                
                {project.summary && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {project.summary}
                  </p>
                )}
              </article>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/work" 
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              View All Projects →
            </Link>
          </div>
        </section>
      )}

      {/* Skills Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Technologies & Skills</h2>
          <p className="text-gray-600 dark:text-gray-300">Tools and technologies I work with</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            'React', 'Next.js', 'TypeScript', 'Tailwind CSS',
            'Node.js', 'Sanity CMS', 'Vercel', 'Git'
          ].map((skill) => (
            <div 
              key={skill}
              className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">{skill}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
