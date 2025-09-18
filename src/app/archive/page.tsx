import React from 'react';
import { sanity } from '@/sanity/client';
import { ALL_PROJECTS } from '@/sanity/queries';
import type { Project } from '@/types/sanity';
import ArchiveClient from './ArchiveClient';

// Optimized caching strategy
export const revalidate = 7200; // Revalidate every 2 hours
export const dynamic = 'force-dynamic';

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await sanity.fetch(ALL_PROJECTS, {}, {
      next: { revalidate: 7200, tags: ['projects'] }
    });
    return projects;
  } catch {
    // Error fetching projects
    return [];
  }
}

export default async function ArchivePage() {
  const projects = await getProjects();

  return <ArchiveClient projects={projects} />;
}
