export function AlwaysLearning() {
  const learningTopics = [
    "React Server Components",
    "Advanced TypeScript",
    "Web Performance",
    "Accessibility Patterns",
    "Design Systems",
    "Next.js 15",
    "CSS Grid & Flexbox",
    "Web Vitals",
    "Figma to Code",
    "Component Architecture"
  ];

  return (
    <section className="always-learning" aria-label="Learning topics" data-test="always-learning">
      <div className="always-learning-content">
        <h2 className="always-learning-title">Always learning</h2>
        <div className="always-learning-chips" role="list" aria-label="Learning topics">
          {learningTopics.map((topic, index) => (
            <span
              key={index}
              className="always-learning-chip"
              role="listitem"
              aria-pressed="false"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
