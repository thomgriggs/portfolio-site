import React from 'react';
import Image from 'next/image';
import projectsData from '@/content/projects.json';

interface Project {
  slug: string;
  title: string;
  tagline: string;
  challenge: string;
  solution: string;
  impact: string;
  image: string;
  url: string;
  tags: string[];
}

export default function ProjectsPage() {
  const projects: Project[] = projectsData;

  return (
    <div className="container">
      <div className="projects-hero">
        <h1>Projects</h1>
        <p>Three projects that show how I approach front-end development—clean code, accessibility, and performance.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.slug} className="project-card card">
            <div className="project-image">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="project-img"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              ) : (
                <div className="project-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21,15 16,10 5,21"/>
                  </svg>
                  <span className="project-placeholder-text">{project.title}</span>
                </div>
              )}
            </div>
            
            <div className="project-content">
              <h2 className="project-title">{project.title}</h2>
              <p className="project-tagline">{project.tagline}</p>
              
              <div className="project-challenge">
                <h3>Challenge</h3>
                <p>{project.challenge}</p>
              </div>
              
              <div className="project-solution">
                <h3>Solution</h3>
                <p>{project.solution}</p>
              </div>
              
              <div className="project-impact">
                <h3>Impact</h3>
                <p>{project.impact}</p>
              </div>
              
              <div className="project-tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
