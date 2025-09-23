type Project = { name: string; url?: string; description?: string };
export const revalidate = 3600;
export default async function Projects() {
  const res = await fetch("/api/projects", { next: { revalidate } });
  const data = (await res.json()) as { projects?: Project[] };
  const projects = data.projects ?? [];
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Projects</h1>
      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((p, i) => (
            <li key={i} className="rounded-lg border p-4">
              <div className="flex items-baseline gap-3">
                <h2 className="text-lg font-medium">{p.name}</h2>
                {p.url ? (
                  <a href={p.url} className="text-sm underline decoration-dotted" target="_blank" rel="noreferrer">
                    {new URL(p.url).hostname}
                  </a>
                ) : null}
              </div>
              {p.description ? <p className="text-sm mt-1">{p.description}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
