import Link from 'next/link';

interface LetsTalkProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
}

export default function LetsTalk({
  title = "Let's Talk",
  description = "Ready to work with a senior frontend developer who can handle complex projects efficiently?",
  primaryButtonText = "Start a Project",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Learn More About Me",
  secondaryButtonLink = "/about",
  className = ""
}: LetsTalkProps) {
  return (
    <div className={`lets-talk ${className}`}>
      <h3 className="lets-talk-title">{title}</h3>
      <p className="lets-talk-description">{description}</p>
      <div className="lets-talk-actions">
        <Link href={primaryButtonLink} className="btn btn-primary">
          {primaryButtonText}
        </Link>
        <Link href={secondaryButtonLink} className="btn btn-secondary">
          {secondaryButtonText}
        </Link>
      </div>
    </div>
  );
}




