import { sanity } from '@/sanity/client'
import { ALL_PROJECTS } from '@/sanity/queries'

export default async function WorkPage() {
  const projects = await sanity.fetch(ALL_PROJECTS)

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Selected Work</h1>
      <ul className="space-y-3">
        {(projects ?? []).map((p: any) => (
          <li key={p._id} className="border rounded p-4">
            <div className="font-medium">{p.title}</div>
            {p.year ? <div className="text-sm text-gray-500">{p.year}</div> : null}
            {p.summary ? <p className="text-sm mt-1">{p.summary}</p> : null}
          </li>
        ))}
        {(!projects || projects.length === 0) && (
          <li className="text-sm text-gray-500">No projects yet — add one in Studio.</li>
        )}
      </ul>
    </main>
  )
}
