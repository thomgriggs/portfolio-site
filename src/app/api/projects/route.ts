import { NextResponse } from 'next/server';
import { sanity } from '../../../sanity/client';
import { ALL_PROJECTS } from '../../../sanity/queries';

export async function GET() {
  try {
    const projects = await sanity.fetch(ALL_PROJECTS);
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

