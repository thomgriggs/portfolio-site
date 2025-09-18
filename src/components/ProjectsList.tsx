'use client';

import React, { useState, useEffect } from 'react';
import type { Project } from '@/types/sanity';
import Link from 'next/link';
import RealScreenshotPreview from '@/app/archive/RealScreenshotPreview';
import '../app/work-gallery.css';

interface ProjectsListProps {
  initialProjects?: Project[];
}

export default function ProjectsList({ initialProjects = [] }: ProjectsListProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(initialProjects.length === 0);

  // Load projects on component mount if not provided initially
  useEffect(() => {
    if (initialProjects.length > 0) {
      setLoading(false);
      return;
    }

    async function loadProjects() {
      // Starting to fetch projects
      try {
        const response = await fetch('/api/projects');
        // Response status
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const fetchedProjects = await response.json();
        // Projects fetched successfully
        setProjects(fetchedProjects);
      } catch {
        // Error loading projects
      } finally {
        setLoading(false);
      }
    }
    
    loadProjects();
  }, [initialProjects.length]);

  // ProjectsList render state

  if (loading) {
    return (
      <section className="projects-section">
        <div className="empty-state">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="empty-state-text">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-section">
      <div className="projects-header">
        <h2 className="projects-title">Featured Projects</h2>
        <Link href="/archive" className="projects-archive-link">
          View Full Archive →
        </Link>
      </div>

      {projects.length > 0 ? (
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={project._id} className="project-item">
              <div className="project-container">
                <RealScreenshotPreview 
                  project={project} 
                  index={index} 
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-state-text">
            No featured projects yet — add some in Studio.
          </p>
          <p className="empty-state-subtext">
            Featured projects will appear here once they&apos;re added to your Sanity CMS.
          </p>
        </div>
      )}
    </section>
  );
}
