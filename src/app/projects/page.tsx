'use client';

import { useState } from 'react';
import { ProjectCard, ProjectCardSkeleton } from '@/components/ProjectCard';
import { projects } from '@/lib/projects.data';

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  
  // Get unique tags from projects
  const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))];
  
  // Filter projects based on selected tag
  const filteredProjects = selectedTag === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(selectedTag));

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured Projects
          </h1>
          <p className="text-xl text-gray-600 leading-8">
            A collection of production-ready applications built with modern web technologies, 
            focusing on performance, accessibility, and user experience.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="container mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-colors
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                ${selectedTag === tag
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }
              `}
              aria-pressed={selectedTag === tag}
              aria-label={`Filter by ${tag}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        
        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600">No projects found for the selected filter.</p>
          </div>
        )}
      </section>
    </main>
  );
}