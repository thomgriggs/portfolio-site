import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://thomgriggs-portfolio.vercel.app";
  const urls = ["/", "/projects", "/about", "/contact", "/notes", "/archive"];
  return urls.map(p => ({ url: `${base}${p}`, changefreq: "weekly", priority: p === "/" ? 1 : 0.7 }));
}
