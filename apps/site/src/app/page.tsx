import { sanity } from '@/sanity/client'
import { ALL_PROJECTS } from '@/sanity/queries'
import type { Project } from '@/types/sanity'
import { unstable_noStore as noStore } from 'next/cache'

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function WorkPage() {
  noStore();
  const projects = await sanity.fetch<Project[]>(ALL_PROJECTS);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Selected Work</h1>
      <ul className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <li key={p._id} className="border rounded-lg p-5">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-medium">{p.title}</h2>
              {p.featured ? (
                <span className="text-xs px-2 py-1 rounded-full border bg-yellow-100">Featured</span>
              ) : null}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {p.year ? `${p.year} · ` : ''}{p.type || 'Website'}{p.industry ? ` · ${p.industry}` : ''}
            </p>
            {p.summary ? <p className="text-sm mt-3">{p.summary}</p> : null}
          </li>
        ))}
      </ul>
    </main>
  )
}
