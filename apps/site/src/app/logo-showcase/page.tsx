'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function LogoShowcase() {
  const [selectedStyle, setSelectedStyle] = useState('all');

  const logoStyles = [
    { id: 'all', label: 'All Styles' },
    { id: 'minimalist', label: 'Minimalist' },
    { id: 'modern', label: 'Modern' },
    { id: 'creative', label: 'Creative' },
    { id: 'professional', label: 'Professional' },
    { id: 'experimental', label: 'Experimental' },
    { id: 'tech', label: 'Tech' },
    { id: 'vintage', label: 'Vintage' }
  ];

  const logos = [
    // Futura Inspired - Clean geometric sans-serif
    {
      id: 'minimal-1',
      style: 'minimalist',
      name: 'Futura Clean',
      description: 'Clean geometric sans-serif with lowercase styling',
      component: <Logo variant="minimal" size="lg" />
    },
    {
      id: 'minimal-2',
      style: 'minimalist',
      name: 'Pure Minimal',
      description: 'Pure minimal approach with dark backgrounds',
      component: <Logo variant="minimal" size="lg" />
    },
    {
      id: 'minimal-3',
      style: 'minimalist',
      name: 'Geometric Simple',
      description: 'Simple geometric shapes and clean typography',
      component: <Logo variant="minimal" size="lg" />
    },

    // Gotham Inspired - Modern humanist sans-serif
    {
      id: 'modern-1',
      style: 'modern',
      name: 'Gotham Modern',
      description: 'Modern humanist sans-serif with confident styling',
      component: <Logo variant="modern" size="lg" />
    },
    {
      id: 'modern-2',
      style: 'modern',
      name: 'Humanist Bold',
      description: 'Humanist approach with gradient backgrounds',
      component: <Logo variant="modern" size="lg" />
    },
    {
      id: 'modern-3',
      style: 'modern',
      name: 'Contemporary Modern',
      description: 'Contemporary styling with blue/pink gradients',
      component: <Logo variant="modern" size="lg" />
    },

    // Proxima Nova Inspired - Versatile sans-serif
    {
      id: 'creative-1',
      style: 'creative',
      name: 'Proxima Versatile',
      description: 'Versatile sans-serif with balanced proportions',
      component: <Logo variant="creative" size="lg" />
    },
    {
      id: 'creative-2',
      style: 'creative',
      name: 'Inter Clean',
      description: 'Clean contemporary web typography',
      component: <Logo variant="handwritten" size="lg" />
    },
    {
      id: 'creative-3',
      style: 'creative',
      name: 'Circular Rounded',
      description: 'Rounded design with friendly typography',
      component: <Logo variant="creative" size="lg" />
    },

    // Circular Inspired - Modern rounded sans-serif
    {
      id: 'professional-1',
      style: 'professional',
      name: 'Circular Pro',
      description: 'Modern rounded sans-serif for professional use',
      component: <Logo variant="professional" size="lg" />
    },
    {
      id: 'professional-2',
      style: 'professional',
      name: 'Source Sans Pro',
      description: 'Adobe\'s humanist sans-serif with technical feel',
      component: <Logo variant="tech" size="lg" />
    },
    {
      id: 'professional-3',
      style: 'professional',
      name: 'Playfair Elegant',
      description: 'Elegant serif with distinctive character',
      component: <Logo variant="elegant" size="lg" />
    },

    // Brandon Grotesque Inspired - Distinctive sans-serif
    {
      id: 'experimental-1',
      style: 'experimental',
      name: 'Brandon Bold',
      description: 'Distinctive sans-serif with bold experimentation',
      component: <Logo variant="experimental" size="lg" />
    },
    {
      id: 'experimental-2',
      style: 'experimental',
      name: 'Montserrat Geometric',
      description: 'Geometric sans-serif with personality',
      component: <Logo variant="bold" size="lg" />
    },
    {
      id: 'experimental-3',
      style: 'experimental',
      name: 'Open Sans Friendly',
      description: 'Friendly and approachable typography',
      component: <Logo variant="futuristic" size="lg" />
    }
  ];

  const filteredLogos = selectedStyle === 'all' 
    ? logos 
    : logos.filter(logo => logo.style === selectedStyle);

  return (
    <main className="logo-showcase-page">
      {/* Header */}
      <section className="logo-showcase-header">
        <div className="logo-showcase-container">
          <div className="logo-showcase-header-content">
            <div>
              <h1 className="title-1 mb-2">Logo Design Options</h1>
              <p className="subtitle">Multiple logo variations for the thomgriggs brand</p>
            </div>
            <Link 
              href="/contact" 
              className="btn btn-primary"
            >
              Choose a Logo
            </Link>
          </div>

          {/* Style Filter */}
          <div className="logo-showcase-filters">
            {logoStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`logo-filter-btn ${selectedStyle === style.id ? 'active' : ''}`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Grid */}
      <section className="logo-showcase-grid-section">
        <div className="logo-showcase-container">
          <div className="logo-showcase-grid">
            {filteredLogos.map((logo) => (
              <div key={logo.id} className="logo-showcase-card">
                <div className="logo-card-header">
                  <h3 className="title-4 mb-2">{logo.name}</h3>
                  <p className="logo-card-description">{logo.description}</p>
                </div>
                
                <div className="logo-card-preview">
                  <div className="logo-preview-bg">
                    {logo.component}
                  </div>
                </div>

                <div className="logo-card-footer">
                  <button className="btn btn-secondary">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="logo-showcase-examples">
        <div className="logo-showcase-container">
          <h2 className="title-2 mb-8 text-center">Usage Examples</h2>
          
          <div className="logo-examples-grid">
            {/* Business Card */}
            <div className="logo-showcase-card">
              <h3 className="title-5 mb-4">Business Card</h3>
              <div className="logo-example-bg">
                <div className="logo-example-content">
                  <Logo variant="modern" size="md" />
                </div>
                <p className="logo-example-text">Senior Frontend Developer</p>
                <p className="logo-example-text">thomgriggs@gmail.com</p>
              </div>
            </div>

            {/* Website Header */}
            <div className="logo-showcase-card">
              <h3 className="title-5 mb-4">Website Header</h3>
              <div className="logo-example-bg">
                <div className="logo-example-header">
                  <Logo variant="modern" size="md" />
                  <div className="logo-example-nav">
                    <span>About</span>
                    <span>Work</span>
                    <span>Contact</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="logo-showcase-card">
              <h3 className="title-5 mb-4">Social Media</h3>
              <div className="logo-example-bg">
                <div className="logo-example-content">
                  <Logo variant="modern" size="md" />
                </div>
                <p className="logo-example-text">@thomgriggs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
