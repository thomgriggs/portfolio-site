"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Search, ExternalLink, Globe, Calendar, Tag } from "lucide-react";
import "./archive.css";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [displayedProjects, setDisplayedProjects] = useState(24);

  useEffect(() => {
    async function fetchProjects() {
      try {
        console.log('Starting to fetch projects...');
        // Test with a simple fetch first
        const response = await fetch('/api/projects');
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data received:', data.length, 'projects');
        
        const archiveProjects: ArchiveProject[] = data.map((project: any) => ({
          id: project._id,
          title: project.title,
          description: project.description || 'No description available',
          year: new Date(project.dateCreated).getFullYear().toString(),
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
      <div className="archive-page">
        <div className="archive-container">
          <div className="archive-loading">
            <div className="archive-loading-spinner">
              <div className="archive-spinner-dots">
                <div className="archive-spinner-dot"></div>
                <div className="archive-spinner-dot"></div>
                <div className="archive-spinner-dot"></div>
              </div>
            </div>
            <p className="archive-loading-text">Loading archive...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="archive-page">
        <div className="archive-container">
          <div className="archive-header">
            <Link href="/" className="archive-back-link">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="archive-title">Project Archive</h1>
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">Error loading projects: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Filter projects based on search and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", "hospitality", "other"];
  const totalProjects = projects.length;
  const loadedPercentage = Math.round((displayedProjects / totalProjects) * 100);

  const loadMore = () => {
    setDisplayedProjects(prev => Math.min(prev + 24, filteredProjects.length));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="archive-page">
      <div className="archive-container">
        {/* Header */}
        <div className="archive-header">
          <Link href="/" className="archive-back-link">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="archive-title">Project Archive</h1>
          <p className="archive-subtitle">
            A comprehensive collection of {totalProjects} projects spanning over a decade of front-end development work.
          </p>
        </div>

        {/* Filters */}
        <div className="archive-filters">
          <div className="archive-search-container">
            <div className="archive-search-input-wrapper">
              <Search className="archive-search-icon" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="archive-search-input"
              />
            </div>
          </div>

          <div className="archive-category-filters">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`archive-category-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="archive-results">
          <div className="archive-results-header">
            <div className="archive-results-count">
              Showing {Math.min(displayedProjects, filteredProjects.length)} of {filteredProjects.length} projects
              {filteredProjects.length < totalProjects && ' (scroll to load more)'}
            </div>
            <div className="archive-results-hint">
              <div className="archive-results-percentage">{loadedPercentage}% loaded</div>
              <div className="archive-progress-bar">
                <div 
                  className="archive-progress-fill" 
                  style={{ width: `${loadedPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="archive-grid">
            {filteredProjects.slice(0, displayedProjects).map((project, index) => (
              <div key={project.id} className="archive-grid-item">
                <div className="project-card">
                  <div className="browser-frame">
                    <div className="browser-header">
                      <div className="browser-controls">
                        <div className="browser-dot"></div>
                        <div className="browser-dot"></div>
                        <div className="browser-dot"></div>
                      </div>
                      <div className="address-bar">
                        {project.urlPath ? (
                          <span className="text-xs text-muted-foreground truncate">
                            {project.urlPath}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">Preview</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="project-preview">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={`Screenshot of ${project.title} website showing the homepage design and layout`}
                          width={400}
                          height={300}
                          className="archive-card-image"
                        />
                      ) : (
                        <div className="archive-card-image bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">No preview available</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="project-info">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="project-title">{project.title}</h3>
                      {project.urlPath && (
                        <a
                          href={project.urlPath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                          aria-label={`Visit ${project.title} website`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <p className="project-description mb-3">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{project.year}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Tag className="w-3 h-3" />
                          <span className="capitalize">{project.category}</span>
                        </div>
                      </div>
                      {project.urlPath && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Globe className="w-3 h-3" />
                          <span>Live</span>
                        </div>
                      )}
                    </div>

                    {project.technologies.length > 0 && (
                      <div className="project-tags">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="project-tag">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="project-tag">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More / End States */}
          {displayedProjects < filteredProjects.length ? (
            <div className="archive-load-more">
              <button
                onClick={loadMore}
                className="archive-load-more-text"
              >
                Scroll down to load more projects
              </button>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="archive-end">
              <p className="archive-end-text">
                You've reached the end of the archive. That's all {filteredProjects.length} projects!
              </p>
            </div>
          ) : (
            <div className="archive-empty">
              <div className="archive-empty-icon">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <p className="archive-empty-text">
                No projects found matching your search criteria.
              </p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="archive-cta">
          <h2>Ready to start your next project?</h2>
          <p>Let's discuss how I can bring the same attention to detail and craftsmanship to your website.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn btn-outline">
              Back to Portfolio
            </Link>
            <Link href="/contact" className="btn btn-primary">
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="archive-scroll-top"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      </div>
    </div>
  );
}