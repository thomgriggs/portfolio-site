import React from 'react';
import projectsData from '../../content/projects.json';
import Section from '../../components/ui/Section';
import ProjectCard from '../../components/ProjectCard';

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
    <main className="projects-page" id="main" role="main">
      <Section>
        <div className="max-w-3xl">
          <h1>Projects</h1>
          <p className="text-lg text-muted mt-6">
            Three projects that show how I approach front-end development—clean code, accessibility, and performance.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              role={project.tagline}
              image={project.image || "/placeholder-project.svg"}
              alt={`Screenshot of ${project.title} website showing the homepage design and layout`}
              challenge={project.challenge}
              solution={project.solution}
              impact={project.impact}
              href={project.url}
            />
          ))}
        </div>
      </Section>
    </main>
  );
}