import React from 'react';
import { sanity } from '@/sanity/client';
import { ALL_PROJECTS } from '@/sanity/queries';
import type { Project } from '@/types/sanity';
import WebsitePreview from '../../components/WebsitePreview';
import ModernPreview from '../../components/ModernPreview';
import CleanPreview from '../../components/CleanPreview';
import CSSPreview from '../../components/CSSPreview';
import ImprovedModernPreview from '../../components/ImprovedModernPreview';

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await sanity.fetch(ALL_PROJECTS);
    return projects.slice(0, 6); // Just show first 6 for demo
  } catch {
    // Error fetching projects
    return [];
  }
}

export default async function PreviewDemo() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Website Preview Styles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three different approaches to displaying website previews in your portfolio. 
            Choose the style that best fits your brand and aesthetic.
          </p>
        </div>

        {/* Style 1: Browser Frame */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Style 1: Browser Frame</h2>
            <p className="text-gray-600">
              Mimics a real browser window with controls and address bar. Great for showing actual website screenshots.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <WebsitePreview key={project._id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Style 2: Modern Card */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Style 2: Modern Card</h2>
            <p className="text-gray-600">
              Contemporary design with gradient accents and smooth animations. Perfect for a modern, creative portfolio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ModernPreview key={project._id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Style 3: Clean Minimalist */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Style 3: Clean Minimalist</h2>
            <p className="text-gray-600">
              Simple, clean design that puts focus on the content. Ideal for professional portfolios and corporate work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <CleanPreview key={project._id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Style 4: CSS-Only Mockup */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Style 4: CSS-Only Mockup</h2>
            <p className="text-gray-600">
              Pure CSS website mockup that doesn&apos;t require external services. Consistent, fast, and always works.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <CSSPreview key={project._id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Style 5: Improved Modern Card */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Style 5: Improved Modern Card</h2>
            <p className="text-gray-600">
              Enhanced modern design with dynamic colors, functional details panel, and consistent mockups. No external services needed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ImprovedModernPreview key={project._id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Implementation Notes */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Implementation Notes</h3>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>Screenshot Service:</strong> Currently using a demo screenshot API. For production, you&apos;ll want to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Sign up for a paid screenshot service (ScreenshotAPI, URL2PNG, etc.)</li>
              <li>Add your API key to environment variables</li>
              <li>Implement caching to avoid repeated API calls</li>
              <li>Add fallback handling for failed screenshots</li>
            </ul>
            <p>
              <strong>Alternative Approaches:</strong> You could also use iframe embeds, static mockups, or custom-designed preview cards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
