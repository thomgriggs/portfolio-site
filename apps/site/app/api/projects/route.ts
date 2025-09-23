import { NextResponse } from "next/server";

export const revalidate = 60 * 60; // 1 hour

export async function GET() {
  const src =
    process.env.PROJECTS_JSON_URL ??
    "https://raw.githubusercontent.com/thomgriggs/portfolio-site/main/apps/site/public/projects.json";

  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000);

    const res = await fetch(src, { signal: ctrl.signal });
    clearTimeout(t);

    if (!res.ok) {
      return NextResponse.json({ projects: [] }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ projects: [] }, { status: 200 });
  }
}
