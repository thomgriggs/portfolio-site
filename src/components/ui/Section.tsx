import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Section({ children, className = '' }: SectionProps) {
  return (
    <section className={`container mx-auto px-4 max-w-5xl py-16 md:py-24 ${className}`}>
      {children}
    </section>
  );
}