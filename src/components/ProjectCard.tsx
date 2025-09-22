import Link from 'next/link';
import Image from 'next/image';

export type Project = {
  title: string;
  slug: string; // used for /projects/[slug]
  href: string; // external or internal link; if internal, prefer `/projects/[slug]`
  image: string; // path or URL to 4:3 asset
  year?: number;
  client?: string;
  tags: string[]; // e.g., ["Hospitality", "Brand", "Interactive"]
  excerpt?: string; // 1–2 lines
  featured?: boolean; // alters elevation and grid span
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, slug, href, image, year, client, tags, excerpt, featured } = project;
  
  const ariaLabel = `${title}${client ? ` for ${client}` : ''}`;
  
  return (
    <Link 
      href={href}
      className={`
        group block rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        ${featured ? 'ring-1 ring-primary/20 scale-[1.02] lg:col-span-2' : ''}
      `}
      aria-label={ariaLabel}
    >
      {/* Image */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      {/* Content */}
      <div className="p-4 md:p-5 space-y-3">
        {/* Title */}
        <h3 className="text-xl leading-7 font-semibold text-gray-900 line-clamp-2">
          {title}
        </h3>
        
        {/* Meta */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {year && <span>{year}</span>}
          {year && client && <span>•</span>}
          {client && <span>{client}</span>}
        </div>
        
        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm text-gray-600 leading-5 line-clamp-2">
            {excerpt}
          </p>
        )}
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

// Skeleton Component
export function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl shadow-sm overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-[4/3] bg-gray-200"></div>
      
      {/* Content skeleton */}
      <div className="p-4 md:p-5 space-y-3">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        
        {/* Meta skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        
        {/* Excerpt skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        
        {/* Tags skeleton */}
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>
      </div>
    </div>
  );
}

// Attach skeleton to main component
ProjectCard.Skeleton = ProjectCardSkeleton;
