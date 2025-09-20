"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, Filter, ChevronDown, ExternalLink, Calendar, Briefcase } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

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
  const [showFilters, setShowFilters] = useState(false);
  const [projectsToShow, setProjectsToShow] = useState(24);

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
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const featuredProjects = projects.filter(p => p.type === 'featured');
  const clientProjects = projects.filter(p => p.type === 'client');

  const stats = [
    { label: "Years Experience", value: "10+" },
    { label: "Projects Completed", value: `${projects.length}+` },
    { label: "Live Websites", value: projects.filter(p => p.status === 'live').length },
    { label: "Industries Served", value: "8+" }
  ];

  const loadMore = () => {
    setProjectsToShow(prev => Math.min(prev + 24, clientProjects.length));
  };

  const ProjectCard = ({ project, index }: { project: ArchiveProject; index: number }) => (
    <Card 
      className={`group hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
        true 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: true ? `${index * 100}ms` : '0ms'
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge 
                variant={project.type === 'featured' ? 'default' : 'secondary'}
                className={`${
                  project.type === 'featured' ? 'bg-primary' : 
                  project.type === 'client' ? 'skill-ombre-2' : 'skill-ombre-4'
                } text-xs`}
              >
                {project.type === 'featured' && <Star className="w-3 h-3 mr-1" />}
                {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
              </Badge>
              <Badge 
                variant={project.status === 'live' ? 'default' : 'outline'}
                className={`text-xs ${
                  project.status === 'live' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'border-muted-foreground/30'
                }`}
              >
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </Badge>
            </div>
            
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-1">
              {project.title}
            </h3>
            
            <div className="text-sm text-muted-foreground mb-2 space-y-1">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3 h-3" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-3 h-3" />
                  <span>{project.category}</span>
                </div>
              </div>
            </div>
          </div>
          
          {project.image && (
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted/30 flex-shrink-0 ml-4">
              <Image
                src={project.image}
                alt={project.title}
                width={64}
                height={64}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="space-y-3">
          <div>
            <div className="text-xs text-muted-foreground mb-2">Technologies</div>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech, idx) => (
                <Badge 
                  key={idx} 
                  variant="secondary"
                  className={`skill-ombre-${Math.min((idx % 5) + 1, 5)} text-xs`}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {project.type === 'featured' && (
          <div className="mt-4 pt-4 border-t border-border">
            <Link href={`/project/${project.id}`}>
              <Button size="sm" className="w-full group/btn">
                <span>View Case Study</span>
                <ExternalLink className="w-3 h-3 ml-2 group-hover/btn:scale-110 transition-transform" />
              </Button>
            </Link>
          </div>
        )}

        {project.urlPath && project.urlPath !== '#' && (
          <div className="mt-4 pt-4 border-t border-border">
            <a href={project.urlPath} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="w-full group/btn">
                <span>Visit Website</span>
                <ExternalLink className="w-3 h-3 ml-2 group-hover/btn:scale-110 transition-transform" />
              </Button>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-muted/50 border border-border text-sm text-muted-foreground mb-6">
            <Star className="w-4 h-4 mr-2 text-primary" />
            Complete Project Archive
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold mb-6 tracking-tight max-w-4xl mx-auto">
            A Decade of <span className="text-primary italic">Hospitality</span> Websites
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Browse through {projects.length}+ hand-coded hospitality websites spanning 10 years of development. 
            Each project represents careful attention to detail, custom functionality, and pixel-perfect execution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant="outline" 
              size="lg" 
              className="group"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter Projects
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              {projects.filter(p => p.status === 'live').length} live websites
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center space-y-2"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                <div className="text-3xl sm:text-4xl font-semibold text-foreground animate-count-up">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-semibold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground">Highlighted work showcasing advanced functionality and design complexity</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Client Projects Archive */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Client Projects Archive</h2>
            <p className="text-muted-foreground">
              Complete collection of hospitality websites developed over the past decade
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientProjects.slice(0, projectsToShow).map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Load More */}
          {projectsToShow < clientProjects.length && (
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                onClick={loadMore}
              >
                Load More Projects
                <span className="ml-2 text-sm text-muted-foreground">
                  ({clientProjects.length - projectsToShow} remaining)
                </span>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-semibold">Ready to Start Your Next Project?</h2>
          <p className="text-muted-foreground text-lg">
            Let's discuss how I can bring the same attention to detail and craftsmanship to your hospitality website.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" variant="outline">
                Back to Portfolio
              </Button>
            </Link>
            <Button size="lg" asChild>
              <a href="/#contact">
                Get In Touch
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}