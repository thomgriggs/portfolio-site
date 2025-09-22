import Link from 'next/link';

export const metadata = {
  title: 'Notes',
  description: 'Short notes on things I\'m building or refining. Less polish, more progress.',
};

// Short notes on things I'm building or refining
const notes = [
  {
    id: 1,
    date: '2025-01-15',
    title: 'Refactored slider helpers to simplify focus management',
    content: 'Cleaned up the Swiper wrapper to handle keyboard focus more reliably. Added proper aria-labels and reduced-motion support.',
    excerpt: 'Cleaned up the Swiper wrapper to handle keyboard focus more reliably.',
    type: 'refactor',
    tags: ['JavaScript', 'Accessibility', 'Swiper']
  },
  {
    id: 2,
    date: '2025-01-10',
    title: 'Dialed in spacing tokens for hero → section rhythm',
    content: 'Standardized the spacing between hero sections and content blocks. Using consistent --space-12 for section margins.',
    excerpt: 'Standardized the spacing between hero sections and content blocks.',
    type: 'design',
    tags: ['CSS', 'Design Tokens', 'Spacing']
  },
  {
    id: 3,
    date: '2025-01-05',
    title: 'Swapped heavy icons for inline SVG to cut JS',
    content: 'Replaced icon fonts with inline SVG icons. Smaller bundle size and better control over styling.',
    excerpt: 'Replaced icon fonts with inline SVG icons for better performance.',
    type: 'performance',
    tags: ['SVG', 'Performance', 'Icons']
  }
];

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'refactor': return 'Refactor';
    case 'design': return 'Design';
    case 'performance': return 'Performance';
    default: return 'Note';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export default function NotesPage() {
  return (
    <main className="notes-page" id="main" role="main">
      {/* Header */}
      <section className="notes-hero">
        <div className="notes-hero-content">
          <h1 className="notes-title">Notes</h1>
          <p className="notes-subtitle">
            Short notes on things I&apos;m building or refining. Less polish, more progress.
          </p>
          <Link href="/" className="notes-back-link">
            ← Back to Home
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="notes-content">
        <div className="notes-container">
          {/* Notes List */}
          <div className="notes-list">
            {notes.map((note) => (
              <article key={note.id} className="notes-post">
                <div className="notes-post-content">
                  <div className="notes-post-meta">
                    <time className="notes-post-date" dateTime={note.date}>
                      {formatDate(note.date)}
                    </time>
                    <span className="notes-post-type">
                      {getTypeLabel(note.type)}
                    </span>
                  </div>
                  
                  <h3 className="notes-post-title">{note.title}</h3>
                  <p className="notes-post-excerpt">{note.excerpt}</p>
                  
                  <div className="notes-post-tags">
                    {note.tags.map((tag, index) => (
                      <span key={index} className="notes-post-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}