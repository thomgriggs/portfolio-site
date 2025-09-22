'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface CleanPreviewProps {
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

export default function CleanPreview({ project, index }: CleanPreviewProps) {
  const [imageError, setImageError] = useState(false);

  // Generate a screenshot URL using a service
  const getScreenshotUrl = (url: string) => {
    const encodedUrl = encodeURIComponent(url);
    return `https://api.screenshotone.com/take?access_key=demo&url=${encodedUrl}&viewport_width=1280&viewport_height=720&device_scale_factor=1&format=png&image_quality=80&block_ads=true&block_cookie_banners=true&block_trackers=true&block_banners_by_heuristics=true&delay=2&timeout=30`;
  };

  const hasValidUrl = project.urlPath && project.urlPath.startsWith('http');
  const screenshotUrl = hasValidUrl && project.urlPath ? getScreenshotUrl(project.urlPath) : null;

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
      {/* Clean Preview Container */}
      <div className="relative aspect-[16/10] bg-gray-50">
        {screenshotUrl && !imageError ? (
          <Image
            src={screenshotUrl}
            alt={`${project.title} website preview`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
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
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 6}
            loading={index < 6 ? "eager" : "lazy"}
            quality={75}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-50">
            <div className="text-center text-gray-400">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs">No preview</p>
            </div>
          </div>
        )}

        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

        {/* Visit button appears on hover */}
        {hasValidUrl && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

      {/* Clean Project Info */}
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
