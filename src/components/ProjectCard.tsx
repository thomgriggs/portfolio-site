import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  role: string;
  image: string;
  alt: string;
  challenge: string;
  solution: string;
  impact: string;
  href: string;
}

export default function ProjectCard({
  title,
  role,
  image,
  alt,
  challenge,
  solution,
  impact,
  href,
}: ProjectCardProps) {
  return (
    <div className="space-y-4">
      <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-serif-display text-xl font-medium">{title}</h3>
          <p className="font-serif-body text-muted-foreground text-sm">{role}</p>
        </div>
        
        <div className="space-y-2 text-sm">
          <div>
            <strong>Challenge:</strong> {challenge}
          </div>
          <div>
            <strong>Solution:</strong> {solution}
          </div>
          <div>
            <strong>Impact:</strong> {impact}
          </div>
        </div>
        
        <Link href={href} className="inline-block text-primary hover:underline">
          View details →
        </Link>
      </div>
    </div>
  );
}
