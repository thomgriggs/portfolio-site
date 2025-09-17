import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container">
      <div className="not-found">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-description">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/" className="cta-button">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
