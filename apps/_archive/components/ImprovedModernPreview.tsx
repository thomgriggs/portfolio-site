'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImprovedModernPreviewProps {
  project: {
    _id: string;
    title: string;
    urlPath?: string;
    description?: string;
    industry?: string;
    skills?: string[];
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

export default function ImprovedModernPreview({ project, index }: ImprovedModernPreviewProps) {
  const [isHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const hasValidUrl = project.urlPath && project.urlPath.startsWith('http');

  // Generate a consistent website mockup based on project type
  const getMockupStyle = () => {
    const title = project.title.toLowerCase();
    
    // Different mockup styles based on project type
    if (title.includes('hotel') || title.includes('resort')) {
      return {
        primaryColor: 'from-amber-400 to-orange-500',
        secondaryColor: 'bg-amber-50',
        accentColor: 'bg-amber-100',
        textColor: 'text-amber-800'
      };
    } else if (title.includes('restaurant') || title.includes('cafe')) {
      return {
        primaryColor: 'from-red-400 to-pink-500',
        secondaryColor: 'bg-red-50',
        accentColor: 'bg-red-100',
        textColor: 'text-red-800'
      };
    } else if (title.includes('spa') || title.includes('wellness')) {
      return {
        primaryColor: 'from-green-400 to-emerald-500',
        secondaryColor: 'bg-green-50',
        accentColor: 'bg-green-100',
        textColor: 'text-green-800'
      };
    } else {
      return {
        primaryColor: 'from-blue-400 to-indigo-500',
        secondaryColor: 'bg-blue-50',
        accentColor: 'bg-blue-100',
        textColor: 'text-blue-800'
      };
    }
  };

  const mockupStyle = getMockupStyle();

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:scale-[1.03] hover:border-gray-300">
      {/* Modern Header with Dynamic Gradient */}
      <div className={`relative h-2 bg-gradient-to-r ${mockupStyle.primaryColor}`}></div>
      
      {/* Website Preview Container */}
      <div className="relative aspect-[16/10] bg-gray-50 overflow-hidden">
        {/* Custom Website Mockup */}
        <div className="absolute inset-0 p-4">
          {/* Browser Header */}
          <div className="h-6 bg-gray-200 rounded-t-lg mb-3 flex items-center px-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex-1 mx-3 h-3 bg-white rounded-sm"></div>
          </div>

          {/* Website Content */}
          <div className="bg-white rounded-b-lg h-full p-4">
            {/* Navigation */}
            <div className="flex space-x-3 mb-4">
              <div className={`h-3 ${mockupStyle.accentColor} rounded w-16`}></div>
              <div className={`h-3 ${mockupStyle.accentColor} rounded w-20`}></div>
              <div className={`h-3 ${mockupStyle.accentColor} rounded w-14`}></div>
              <div className={`h-3 ${mockupStyle.accentColor} rounded w-18`}></div>
            </div>

            {/* Hero Section */}
            <div className="mb-4">
              <div className={`h-4 ${mockupStyle.accentColor} rounded mb-2 w-3/4`}></div>
              <div className={`h-3 ${mockupStyle.accentColor} rounded w-1/2`}></div>
            </div>

            {/* Content Blocks */}
            <div className="space-y-2 mb-4">
              <div className={`h-2 ${mockupStyle.accentColor} rounded`}></div>
              <div className={`h-2 ${mockupStyle.accentColor} rounded w-5/6`}></div>
              <div className={`h-2 ${mockupStyle.accentColor} rounded w-4/5`}></div>
            </div>

            {/* Image Placeholder */}
            <div className={`w-20 h-16 ${mockupStyle.accentColor} rounded float-right`}></div>

            {/* Overlay with project image if available */}
            {project.images && project.images.length > 0 && project.images[0]?.asset?.url && (
              <div className="absolute inset-0 opacity-10">
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
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Hover Actions */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex space-x-3">
              {hasValidUrl && (
                <a
                  href={project.urlPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full font-medium hover:bg-white transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Visit Site
                </a>
              )}
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="px-6 py-3 bg-black/20 backdrop-blur-sm text-white rounded-full font-medium hover:bg-black/30 transition-all duration-200 hover:scale-105"
              >
                {showDetails ? 'Hide Details' : 'View Details'}
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
          <p className="text-sm text-gray-500 truncate mb-2">
            {project.urlPath?.replace(/^https?:\/\//, '')}
          </p>
        )}

        {/* Details Panel */}
        {showDetails && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            {project.description && (
              <p className="text-sm text-gray-600 mb-3">{project.description}</p>
            )}
            
            {project.industry && (
              <div className="mb-3">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Industry</span>
                <p className="text-sm text-gray-700">{project.industry}</p>
              </div>
            )}

            {project.skills && project.skills.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Skills</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.skills.slice(0, 4).map((skill, index) => (
                    <span
                      key={skill || index}
                      className="px-2 py-1 bg-white text-gray-600 rounded text-xs border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 4 && (
                    <span className="px-2 py-1 bg-white text-gray-600 rounded text-xs border border-gray-200">
                      +{project.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
