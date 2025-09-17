import type { Metadata } from 'next';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Explore my portfolio of web development projects, featuring modern applications built with React, Next.js, and TypeScript.',
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
