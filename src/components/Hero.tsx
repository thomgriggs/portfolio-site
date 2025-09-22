import Link from 'next/link';
import { Button } from './ui/button';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            I build production-ready UI—fast, accessible, and maintainable.
          </h1>
          <p className="hero-subhead">
            Hand-coded with Next.js + TypeScript. Proven on 260+ launches across hospitality and brands.
          </p>
          
          <div className="hero-ctas">
            <Button asChild variant="primary" className="hero-cta-primary">
              <Link href="/projects" aria-label="View my work portfolio">
                View my work
              </Link>
            </Button>
            <Button asChild variant="ghost" className="hero-cta-secondary">
              <Link href="/contact" aria-label="Say hello and get in touch">
                Say hello
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
