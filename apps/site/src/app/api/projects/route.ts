import { NextResponse } from 'next/server';
import { sanity } from '@/sanity/client';
import { ALL_PROJECTS } from '@/sanity/queries';
import type { Project } from '@/types/sanity';

export async function GET() {
  try {
    const projects = await sanity.fetch<Project[]>(ALL_PROJECTS);
    return NextResponse.json(projects);
  } catch {
    // Error fetching projects
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
