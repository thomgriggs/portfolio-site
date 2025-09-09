import { sanity } from '@/sanity/client';
import { ALL_PROJECTS } from '@/sanity/queries';
import type { Project } from '@/types/sanity';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Work',
  description: 'Explore my portfolio of web development projects, featuring modern applications built with React, Next.js, and TypeScript.',
};

export default async function WorkPage() {
  noStore();
  const projects = await sanity.fetch<Project[]>(ALL_PROJECTS);
  
  // Separate featured and regular projects
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Selected Work</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in modern web development
          </p>
        </div>

        {/* Back to Home */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <article 
                key={project._id} 
                className="group border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 font-medium">
                    Featured
                  </span>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {project.year ? `${project.year} · ` : ''}
                    {project.type || 'Website'}
                    {project.industry ? ` · ${project.industry}` : ''}
                  </p>
                  
                  {project.summary && (
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {project.summary}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold mb-8">
          {featuredProjects.length > 0 ? 'All Projects' : 'Projects'}
        </h2>
        
        {projects.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article 
                key={project._id} 
                className={`group border rounded-lg p-5 hover:shadow-md transition-all duration-300 ${
                  project.featured 
                    ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                      Featured
                    </span>
                  )}
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No projects yet — add one in Studio.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Projects will appear here once they&apos;re added to your Sanity CMS.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}