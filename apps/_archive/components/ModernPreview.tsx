'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ModernPreviewProps {
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

export default function ModernPreview({ project, index }: ModernPreviewProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Generate a screenshot URL using a service
  const getScreenshotUrl = (url: string) => {
    const encodedUrl = encodeURIComponent(url);
    return `https://api.screenshotone.com/take?access_key=demo&url=${encodedUrl}&viewport_width=1280&viewport_height=720&device_scale_factor=1&format=png&image_quality=80&block_ads=true&block_cookie_banners=true&block_trackers=true&block_banners_by_heuristics=true&delay=2&timeout=30`;
  };

  const hasValidUrl = project.urlPath && project.urlPath.startsWith('http');
  const screenshotUrl = hasValidUrl && project.urlPath ? getScreenshotUrl(project.urlPath) : null;

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:border-gray-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Modern Header with Gradient */}
      <div className="relative h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      {/* Website Preview Container */}
      <div className="relative aspect-[16/10] bg-gray-50 overflow-hidden">
        {/* Screenshot or Fallback */}
        {screenshotUrl && !imageError ? (
          <Image
            src={screenshotUrl}
            alt={`${project.title} website preview`}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
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
            className="object-cover transition-all duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 6}
            loading={index < 6 ? "eager" : "lazy"}
            quality={75}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center text-gray-400">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm font-medium">No preview</p>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Hover Actions */}
        {isHovered && hasValidUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-3">
              <a
                href={project.urlPath}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full font-medium hover:bg-white transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Visit Site
              </a>
              <button className="px-6 py-3 bg-black/20 backdrop-blur-sm text-white rounded-full font-medium hover:bg-black/30 transition-all duration-200 hover:scale-105">
                View Details
              </button>
            </div>
          </div>
        )}

        {/* URL Badge */}
        {hasValidUrl && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
            Live Site
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-gray-700 transition-colors">
          {project.title}
        </h3>
        
        {hasValidUrl && (
          <p className="text-sm text-gray-500 truncate">
            {project.urlPath?.replace(/^https?:\/\//, '')}
          </p>
        )}
      </div>
    </div>
  );
}
