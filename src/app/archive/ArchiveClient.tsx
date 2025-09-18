'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import type { Project } from '@/types/sanity';
import Link from 'next/link';
import ImprovedCardPreview from './ImprovedCardPreview';

interface ArchiveClientProps {
  projects: Project[];
}

export default function ArchiveClient({ projects }: ArchiveClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(24); // Start with 24 projects
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const itemsPerLoad = 12; // Load 12 more projects each time

  // Memoize filtered projects with optimized filtering
  const filteredProjects = useMemo(() => {
    if (!projects.length) return [];
    
    let filtered = projects;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.industry === selectedCategory);
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project => {
        const titleMatch = project.title.toLowerCase().includes(searchLower);
        const industryMatch = project.industry?.toLowerCase().includes(searchLower);
        const skillsMatch = project.skills?.some(skill => skill.toLowerCase().includes(searchLower));
        return titleMatch || industryMatch || skillsMatch;
      });
    }

    return filtered;
  }, [projects, selectedCategory, searchTerm]);

  // Get visible projects based on scroll position
  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  // Update hasMore when filtered projects change
  useEffect(() => {
    setHasMore(visibleCount < filteredProjects.length);
    setVisibleCount(24); // Reset to initial count when filters change
  }, [filteredProjects.length, selectedCategory, searchTerm, visibleCount]);

  // Memoize categories to avoid recalculating
  const categories = useMemo(() => 
    ['all', ...Array.from(new Set(projects.map(p => p.industry).filter(Boolean)))],
    [projects]
  );

  // Load more projects function
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleCount(prev => {
        const newCount = Math.min(prev + itemsPerLoad, filteredProjects.length);
        setHasMore(newCount < filteredProjects.length);
        return newCount;
      });
      setIsLoading(false);
    }, 500); // Slightly longer delay for smoother experience
  }, [isLoading, hasMore, filteredProjects.length, itemsPerLoad]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading, visibleCount]);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <main className="archive-page" id="main-content" role="main">
      <div className="archive-container">
        {/* Header */}
        <div className="archive-header">
          <Link href="/" className="archive-back-link">
            ← Back to Home
          </Link>
          <h1 className="archive-title">Project Archive</h1>
          <p className="archive-subtitle">
            A comprehensive collection of {projects.length} projects spanning over a decade of front-end development work.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="archive-filters">
          <div className="archive-search-container">
            <div className="archive-search-input-wrapper">
              <svg className="archive-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="archive-search-input"
              />
            </div>
            <div className="archive-category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => category && handleCategoryChange(category)}
                  className={`archive-category-btn ${
                    selectedCategory === category ? 'active' : ''
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count & Progress */}
        <div className="archive-results">
          <div className="archive-results-header">
            <p className="archive-results-count">
              Showing {visibleProjects.length} of {filteredProjects.length} projects
              {hasMore && (
                <span className="archive-results-hint">
                  (scroll to load more)
                </span>
              )}
            </p>
            {filteredProjects.length > 0 && (
              <div className="archive-results-percentage">
                {Math.round((visibleProjects.length / filteredProjects.length) * 100)}% loaded
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          {filteredProjects.length > 0 && (
            <div className="archive-progress-bar">
              <div 
                className="archive-progress-fill"
                style={{ width: `${(visibleProjects.length / filteredProjects.length) * 100}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {visibleProjects.length > 0 ? (
          <div className="archive-grid">
            {visibleProjects.map((project, index) => (
              <div
                key={project._id}
                className="archive-grid-item"
                style={{
                  animationDelay: `${Math.min(index * 50, 1000)}ms`,
                  animationFillMode: 'both'
                }}
              >
                <ImprovedCardPreview project={project} index={index} />
              </div>
            ))}
          </div>
        ) : (
          <div className="archive-empty">
            <div className="archive-empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
                <line x1="11" y1="8" x2="11" y2="14"/>
                <line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
            </div>
            <p className="archive-empty-text">
              No projects found matching your criteria.
            </p>
          </div>
        )}

        {/* Infinite Scroll Loading */}
        {hasMore && (
          <div ref={observerRef} className="archive-loading">
            {isLoading ? (
              <div className="archive-loading-spinner">
                <div className="archive-spinner-dots">
                  <div className="archive-spinner-dot"></div>
                  <div className="archive-spinner-dot"></div>
                  <div className="archive-spinner-dot"></div>
                </div>
                <span className="archive-loading-text">Loading more projects...</span>
              </div>
            ) : (
              <div className="archive-load-more">
                <p className="archive-load-more-text">
                  Scroll down to load more projects
                </p>
                <button
                  onClick={loadMore}
                  className="btn btn-secondary"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}

        {/* End of results */}
        {!hasMore && filteredProjects.length > 0 && (
          <div className="archive-end">
            <p className="archive-end-text">
              You&apos;ve reached the end! All {filteredProjects.length} projects are loaded.
            </p>
          </div>
        )}

        {/* Back to Work */}
        <div className="archive-cta">
          <Link href="/work" className="btn btn-primary">
            View Featured Work
          </Link>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="archive-scroll-top"
          aria-label="Scroll to top"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </main>
  );
}
