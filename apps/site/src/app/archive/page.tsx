"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface ArchiveProject {
  id: string;
  title: string;
  description: string;
  year: string;
  category: string;
  technologies: string[];
  image?: string;
  urlPath?: string;
  status: 'live' | 'archived';
  type: 'featured' | 'client' | 'personal';
}

export default function ArchivePage() {
  const [projects, setProjects] = useState<ArchiveProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const archiveProjects: ArchiveProject[] = data.map((project: any) => ({
          id: project._id || 'unknown',
          title: project.title || 'Untitled Project',
          description: project.description || 'No description available',
          year: project.dateCreated ? new Date(project.dateCreated).getFullYear().toString() : '2024',
          category: project.industry?.toLowerCase() || 'hospitality',
          technologies: project.skills || [],
          image: project.images?.[0]?.asset?.url,
          urlPath: project.urlPath,
          status: project.urlPath ? 'live' : 'archived',
          type: project.featured ? 'featured' : 'client'
        }));

        setProjects(archiveProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch projects');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading archive...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading projects: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
            
            <div className="text-sm text-muted-foreground">
              {projects.length} projects
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl display-serif mb-4">
            Project Archive
          </h1>
          <p className="text-xl font-serif-body text-muted-foreground max-w-3xl">
            A comprehensive collection of {projects.length} projects spanning over a decade of front-end development work.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="group cursor-pointer"
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Project Image */}
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No Image
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.status === 'live' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-serif-body font-medium group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-sm font-sans text-muted-foreground ml-2">
                      {project.year}
                    </span>
                  </div>
                  
                  <p className="text-sm font-serif-body text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 text-xs font-sans font-medium rounded-full skill-ombre-1"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-sans font-medium rounded-full">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  {project.urlPath && project.urlPath !== '#' ? (
                    <a 
                      href={project.urlPath} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-sans text-primary hover:text-primary/80 transition-colors"
                    >
                      Visit Website
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  ) : (
                    <span className="text-sm font-sans text-muted-foreground">
                      Case Study Coming Soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No projects found.</p>
          </div>
        )}
      </main>
    </div>
  );
}