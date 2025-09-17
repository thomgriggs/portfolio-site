'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TestStPeteSimplePage() {
  const [selectedOption, setSelectedOption] = useState(1);

  const designOptions = [
    {
      id: 1,
      name: "Sunset Glow",
      description: "Warm golden hour tones that capture St. Pete's famous sunsets",
      background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 30%, #f59e0b 70%, #d97706 100%)",
      textColor: "#1f2937",
      accentColor: "#f59e0b"
    },
    {
      id: 2,
      name: "Coastal Breeze", 
      description: "Fresh blues and teals like a clear day over Tampa Bay",
      background: "linear-gradient(135deg, #dbeafe 0%, #93c5fd 30%, #3b82f6 70%, #1d4ed8 100%)",
      textColor: "#ffffff",
      accentColor: "#3b82f6"
    },
    {
      id: 3,
      name: "Warm Sand",
      description: "Neutral beach tones with that relaxed coastal feeling",
      background: "linear-gradient(135deg, #fef7ed 0%, #fed7aa 30%, #fb923c 70%, #ea580c 100%)",
      textColor: "#1f2937",
      accentColor: "#fb923c"
    },
    {
      id: 4,
      name: "Ocean Depths",
      description: "Deep blues like the Gulf waters at sunset",
      background: "linear-gradient(135deg, #e0f2fe 0%, #0891b2 30%, #0e7490 70%, #155e75 100%)",
      textColor: "#ffffff",
      accentColor: "#0891b2"
    },
    {
      id: 5,
      name: "Pier 60 Magic",
      description: "The iconic pier sunset with oranges, pinks, and purples",
      background: "linear-gradient(135deg, #fef3c7 0%, #fbbf24 20%, #f59e0b 40%, #ef4444 60%, #ec4899 80%, #8b5cf6 100%)",
      textColor: "#ffffff",
      accentColor: "#f59e0b"
    },
    {
      id: 6,
      name: "Vinoy Elegance",
      description: "Sophisticated pastels with that luxury waterfront vibe",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 30%, #cbd5e1 70%, #94a3b8 100%)",
      textColor: "#1e293b",
      accentColor: "#64748b"
    }
  ];

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '3rem 1.5rem'
  };

  const headerStyle = {
    textAlign: 'center' as const,
    marginBottom: '3rem',
    maxWidth: '1200px',
    margin: '0 auto 3rem auto'
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '1rem'
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    color: '#6b7280',
    marginBottom: '2rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem',
    maxWidth: '1200px',
    margin: '0 auto 4rem auto'
  };

  const cardStyle = {
    padding: '1.5rem',
    borderRadius: '1rem',
    border: '2px solid #e5e7eb',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const selectedCardStyle = {
    ...cardStyle,
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
    transform: 'scale(1.05)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
  };

  const previewStyle = {
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    marginTop: '2rem'
  };

  const previewHeaderStyle = {
    padding: '2rem',
    borderBottom: '1px solid #e5e7eb',
    background: 'linear-gradient(90deg, #f9fafb 0%, #dbeafe 100%)'
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>St. Pete Design Options</h1>
        <p style={subtitleStyle}>Beautiful, finished designs inspired by St. Petersburg, Florida</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link 
            href="/photos"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2563eb',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'background-color 0.2s ease'
            }}
          >
            ← Back to Photos
          </Link>
        </div>
      </div>

      {/* Design Options Grid */}
      <div style={gridStyle}>
        {designOptions.map((option) => (
          <div
            key={option.id}
            style={selectedOption === option.id ? selectedCardStyle : cardStyle}
            onClick={() => setSelectedOption(option.id)}
          >
            <div 
              style={{
                height: '160px',
                borderRadius: '0.75rem',
                marginBottom: '1.5rem',
                background: option.background,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                position: 'absolute',
                inset: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
              }}>
                {option.name}
              </div>
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '0.75rem'
            }}>
              {option.name}
            </h3>
            <p style={{
              color: '#6b7280',
              marginBottom: '1rem',
              fontSize: '0.875rem',
              lineHeight: '1.5'
            }}>
              {option.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div 
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: '2px solid #d1d5db',
                  backgroundColor: option.accentColor
                }}
              ></div>
              <span style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                {option.accentColor}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Preview Section */}
      <div style={previewStyle}>
        <div style={previewHeaderStyle}>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '0.5rem'
          }}>
            Live Preview: {designOptions[selectedOption - 1].name}
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280'
          }}>
            {designOptions[selectedOption - 1].description}
          </p>
        </div>
        
        {/* Mock Photos Page with Selected Design */}
        <div 
          style={{
            minHeight: '100vh',
            padding: '3rem',
            background: designOptions[selectedOption - 1].background,
            color: designOptions[selectedOption - 1].textColor,
            position: 'relative'
          }}
        >
          {/* Floating elements for depth */}
          <div style={{
            position: 'absolute',
            top: '5rem',
            right: '5rem',
            width: '8rem',
            height: '8rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '8rem',
            left: '5rem',
            width: '6rem',
            height: '6rem',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '50%',
            filter: 'blur(30px)'
          }}></div>
          
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 10
          }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h1 style={{
                fontSize: '3.75rem',
                fontWeight: 'bold',
                marginBottom: '2rem',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
              }}>
                Photos
              </h1>
              <p style={{
                fontSize: '1.5rem',
                marginBottom: '2.5rem',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                opacity: 0.9,
                maxWidth: '48rem',
                margin: '0 auto 2.5rem auto'
              }}>
                A glimpse into my life beyond code — family, projects, and creative pursuits
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '1.25rem',
                opacity: 0.8,
                cursor: 'pointer',
                transition: 'opacity 0.2s ease'
              }}>
                ← Back to Home
              </div>
            </div>

            {/* Simple Photo Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '5rem'
            }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: '1',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.75rem',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    opacity: 0.6,
                    color: 'currentColor'
                  }}>
                    📷
                  </div>
                </div>
              ))}
            </div>

            {/* Video Section */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              borderRadius: '1rem',
              padding: '2.5rem',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
            }}>
              <h2 style={{
                fontSize: '1.875rem',
                fontWeight: 'bold',
                marginBottom: '2rem',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
              }}>
                Behind the Scenes
              </h2>
              <div style={{
                aspectRatio: '16/9',
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '5rem',
                    height: '5rem',
                    margin: '0 auto 1.5rem auto',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '4px solid rgba(255, 255, 255, 0.5)',
                    backgroundColor: designOptions[selectedOption - 1].accentColor + '60',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                  }}>
                    ▶️
                  </div>
                  <p style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    Video Player
                  </p>
                  <p style={{
                    fontSize: '1.125rem',
                    opacity: 0.7
                  }}>
                    Click to play
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


