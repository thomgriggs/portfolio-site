'use client';

import React from 'react';
import Image from 'next/image';

interface CSSPreviewProps {
  project: {
    _id: string;
    title: string;
    urlPath?: string;
    images?: Array<{
      _key: string;
      asset: {
        _ref: string;
        _type: 'reference';
        url: string;
      };
    }>;
  };
  index: number;
}

export default function CSSPreview({ project, index }: CSSPreviewProps) {
  const hasValidUrl = project.urlPath && project.urlPath.startsWith('http');

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
      {/* CSS-Only Website Mockup */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Browser Header */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gray-200 border-b border-gray-300">
          <div className="flex items-center h-full px-3 space-x-2">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="flex-1 mx-3 h-4 bg-white rounded-sm"></div>
          </div>
        </div>

        {/* Website Content Area */}
        <div className="absolute top-8 left-0 right-0 bottom-0 p-4">
          {/* Header Bar */}
          <div className="h-6 bg-gray-300 rounded mb-3"></div>
          
          {/* Navigation */}
          <div className="flex space-x-2 mb-4">
            <div className="h-4 bg-gray-300 rounded w-16"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-14"></div>
            <div className="h-4 bg-gray-300 rounded w-18"></div>
          </div>

          {/* Hero Section */}
          <div className="mb-4">
            <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>

          {/* Content Blocks */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded"></div>
            <div className="h-3 bg-gray-300 rounded w-5/6"></div>
            <div className="h-3 bg-gray-300 rounded w-4/5"></div>
          </div>

          {/* Image Placeholder */}
          <div className="absolute bottom-4 right-4 w-16 h-12 bg-gray-300 rounded"></div>
        </div>

        {/* Overlay with project image if available */}
        {project.images && project.images.length > 0 && project.images[0]?.asset?.url && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={project.images[0].asset.url}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 6}
              loading={index < 6 ? "eager" : "lazy"}
              quality={75}
            />
          </div>
        )}

        {/* Visit Button */}
        {hasValidUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
            <a
              href={project.urlPath}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white text-gray-900 rounded-md text-sm font-medium shadow-lg hover:bg-gray-50 transition-colors"
            >
              Visit Site →
            </a>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-base mb-1 truncate">
          {project.title}
        </h3>
        
        {hasValidUrl && (
          <p className="text-xs text-gray-500 truncate">
            {project.urlPath?.replace(/^https?:\/\//, '')}
          </p>
        )}
      </div>
    </div>
  );
}
