import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import projectsData from '@/content/projects.json';

interface Project {
  slug: string;
  title: string;
  role: string;
  stack: string[];
  year: number;
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
        <h1>Featured Work</h1>
        <p>Three flagship projects that showcase my approach to front-end development, accessibility, and performance optimization.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.slug} className="project-card card">
            <div className="project-image">
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={300}
                className="project-img"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            
            <div className="project-content">
              <div className="project-meta">
                <span className="project-year">{project.year}</span>
                <span className="project-role">{project.role}</span>
              </div>
              
              <h2 className="project-title">{project.title}</h2>
              
              <div className="project-stack">
                {project.stack.map((tech, index) => (
                  <span key={index} className="stack-tag">
                    {tech}
                  </span>
                ))}
              </div>
              
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
              
              <div className="project-actions">
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Live Site →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
