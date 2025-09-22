'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface WebsitePreviewProps {
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

export default function WebsitePreview({ project, index }: WebsitePreviewProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Generate a screenshot URL using a service like ScreenshotAPI or similar
  const getScreenshotUrl = (url: string) => {
    // Using a free screenshot service - you can replace with your preferred service
    const encodedUrl = encodeURIComponent(url);
    return `https://api.screenshotone.com/take?access_key=demo&url=${encodedUrl}&viewport_width=1280&viewport_height=720&device_scale_factor=1&format=png&image_quality=80&block_ads=true&block_cookie_banners=true&block_trackers=true&block_banners_by_heuristics=true&delay=2&timeout=30`;
  };

  const hasValidUrl = project.urlPath && project.urlPath.startsWith('http');
  const screenshotUrl = hasValidUrl && project.urlPath ? getScreenshotUrl(project.urlPath) : null;

  return (
    <div 
      className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Browser Frame */}
      <div className="bg-gray-100 border-b border-gray-300 rounded-t-lg">
        <div className="flex items-center px-4 py-3 space-x-2">
          {/* Browser Controls */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          
          {/* Address Bar */}
          <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-600 truncate">
            {project.urlPath || 'No URL available'}
          </div>
        </div>
      </div>

      {/* Website Preview */}
      <div className="relative aspect-video bg-gray-50">
        {screenshotUrl && !imageError ? (
          <Image
            src={screenshotUrl}
            alt={`${project.title} website preview`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 6}
            loading={index < 6 ? "eager" : "lazy"}
            quality={75}
          />
        ) : project.images && project.images.length > 0 && project.images[0]?.asset?.url ? (
          <Image
            src={project.images[0].asset.url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 6}
            loading={index < 6 ? "eager" : "lazy"}
            quality={75}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">No preview available</p>
            </div>
          </div>
        )}

        {/* Overlay on hover */}
        {isHovered && hasValidUrl && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
            <a
              href={project.urlPath}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Visit Site
            </a>
          </div>
        )}
      </div>

      {/* Project Title */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">
          {project.title}
        </h3>
      </div>
    </div>
  );
}
