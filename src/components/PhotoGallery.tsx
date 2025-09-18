'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import '../app/photo-gallery.css';

interface Photo {
  id: string;
  src: string;
  alt: string;
  category: string;
  title?: string;
  tags?: string[];
  width: number;
  height: number;
}

interface PhotoGalleryProps {
  photos: Photo[];
  categories: string[];
  tags?: string[];
}

export default function PhotoGallery({ photos, categories, tags = [] }: PhotoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredPhotos = photos.filter(photo => {
    const categoryMatch = selectedCategory === 'all' || photo.category === selectedCategory;
    const tagMatch = selectedTag === 'all' || (photo.tags && photo.tags.includes(selectedTag));
    return categoryMatch && tagMatch;
  });

  // Calculate aspect ratio for dynamic grid
  const getAspectRatio = (width: number, height: number) => {
    return width / height;
  };

  // Get grid column span based on aspect ratio
  const getColumnSpan = (aspectRatio: number) => {
    if (aspectRatio > 1.5) return 'wide'; // Wide images
    if (aspectRatio < 0.7) return 'tall'; // Tall images
    return 'col-span-1'; // Square-ish images
  };

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
        setSelectedPhoto(filteredPhotos[prevIndex] || null);
        setCurrentPhotoIndex(prevIndex);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
        const nextIndex = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
        setSelectedPhoto(filteredPhotos[nextIndex] || null);
        setCurrentPhotoIndex(nextIndex);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, filteredPhotos]);

  const openLightbox = (photo: Photo) => {
    const index = filteredPhotos.findIndex(p => p.id === photo.id);
    setSelectedPhoto(photo);
    setCurrentPhotoIndex(index);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentPhotoIndex > 0 ? currentPhotoIndex - 1 : filteredPhotos.length - 1)
      : (currentPhotoIndex < filteredPhotos.length - 1 ? currentPhotoIndex + 1 : 0);
    
    setSelectedPhoto(filteredPhotos[newIndex] || null);
    setCurrentPhotoIndex(newIndex);
  };

  return (
    <div className="photo-gallery">
      {/* Category Filter */}
      <div className="category-filters">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`category-filter ${
            selectedCategory === 'all' ? 'active' : ''
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`category-filter ${
              selectedCategory === category ? 'active' : ''
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Tag Filter */}
      {tags.length > 0 && (
        <div className="tag-filters">
          <button
            onClick={() => setSelectedTag('all')}
            className={`tag-filter ${
              selectedTag === 'all' ? 'active' : ''
            }`}
          >
            All Tags
          </button>
          {tags.slice(0, 10).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`tag-filter ${
                selectedTag === tag ? 'active' : ''
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Dynamic Masonry Grid */}
      <div 
        ref={gridRef}
        className="masonry-grid"
      >
        {/* Video item - insert after first few photos */}
        <div className="photo-item video-item">
          <div className="video-container">
            <video
              className="video-element"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/videos/video.mp4" type="video/mp4" />
              <source src="/videos/video.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <div className="video-overlay">
              <div className="video-heading">
                <h3 className="video-title-overlay">Behind the Scenes</h3>
                <p className="video-subtitle-overlay">A glimpse into my creative process</p>
              </div>
            </div>
          </div>
        </div>
        
        {filteredPhotos.map((photo) => {
          const aspectRatio = getAspectRatio(photo.width, photo.height);
          const columnSpan = getColumnSpan(aspectRatio);
          
          return (
            <div
              key={photo.id}
              className={`photo-item ${columnSpan}`}
              onClick={() => openLightbox(photo)}
            >
              <div className="photo-container">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="photo-image"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="photo-overlay">
                  <div className="photo-overlay-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                <div className="photo-info">
                  <h3 className="photo-title">{photo.title || photo.alt}</h3>
                  <p className="photo-category">{photo.category}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="lightbox-modal"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="lightbox-container">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="lightbox-close"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Arrows */}
            {filteredPhotos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox('prev');
                  }}
                  className="lightbox-nav prev"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox('next');
                  }}
                  className="lightbox-nav next"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Main Image */}
            <div onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                width={selectedPhoto.width}
                height={selectedPhoto.height}
                className="lightbox-image"
                priority
              />
            </div>

            {/* Image Info */}
            <div className="lightbox-info">
              <div className="lightbox-info-content">
                <h3 className="lightbox-title">{selectedPhoto.title || selectedPhoto.alt}</h3>
                <p className="lightbox-category">{selectedPhoto.category}</p>
                {filteredPhotos.length > 1 && (
                  <p className="lightbox-counter">
                    {currentPhotoIndex + 1} of {filteredPhotos.length}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
