import { sanity } from "../../sanity/client";
import { ALL_PROJECTS } from "../../sanity/queries";
import type { Project } from "../../types/sanity";
import ArchivePageClient from "./ArchivePageClient";

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

export default async function ArchivePage() {
  // Fetch projects from Sanity
  const projects = await sanity.fetch(ALL_PROJECTS, {}, {
    next: { revalidate: 7200, tags: ['projects'] }
  });

  // Transform Sanity projects to ArchiveProject format
  const archiveProjects: ArchiveProject[] = projects.map((project: Project) => ({
    id: project._id,
    title: project.title,
    description: project.description || 'No description available',
    year: new Date(project.dateCreated).getFullYear().toString(),
    category: project.industry || 'Hospitality',
    technologies: project.skills || [],
    image: project.images?.[0]?.asset?.url,
    urlPath: project.urlPath,
    status: project.urlPath ? 'live' : 'archived',
    type: project.featured ? 'featured' : 'client'
  }));

  return <ArchivePageClient projects={archiveProjects} />;
}
