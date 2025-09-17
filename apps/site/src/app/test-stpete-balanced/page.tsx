'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TestStPeteBalancedPage() {
  const [selectedOption, setSelectedOption] = useState(1);

  const designOptions = [
    {
      id: 1,
      name: "Soft Sunset",
      description: "Gentle warm tones inspired by St. Pete's golden hour",
      background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 30%, #fbbf24 70%, #f59e0b 100%)",
      textColor: "#374151",
      accentColor: "#f59e0b"
    },
    {
      id: 2,
      name: "Coastal Calm", 
      description: "Soft blues and grays like a peaceful day on the water",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 30%, #7dd3fc 70%, #0ea5e9 100%)",
      textColor: "#1e293b",
      accentColor: "#0ea5e9"
    },
    {
      id: 3,
      name: "Warm Neutral",
      description: "Soft beiges and warm grays for a sophisticated, calm feel",
      background: "linear-gradient(135deg, #fefce8 0%, #fef3c7 30%, #f3f4f6 70%, #e5e7eb 100%)",
      textColor: "#374151",
      accentColor: "#6b7280"
    },
    {
      id: 4,
      name: "Gentle Sage",
      description: "Soft greens and sage tones for a natural, peaceful atmosphere",
      background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 30%, #bbf7d0 70%, #86efac 100%)",
      textColor: "#1f2937",
      accentColor: "#22c55e"
    },
    {
      id: 5,
      name: "Soft Lavender",
      description: "Gentle purples and lilacs for a calm, modern feel",
      background: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 30%, #e9d5ff 70%, #c084fc 100%)",
      textColor: "#374151",
      accentColor: "#a855f7"
    },
    {
      id: 6,
      name: "Pearl Gray",
      description: "Soft grays and whites for a clean, sophisticated look",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 70%, #cbd5e1 100%)",
      textColor: "#374151",
      accentColor: "#64748b"
    }
  ];

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '3rem 1.5rem'
  };

  const headerStyle = {
    textAlign: 'center' as const,
    marginBottom: '3rem',
    maxWidth: '1200px',
    margin: '0 auto 3rem auto'
  };

  const titleStyle = {
    fontSize: '2.75rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '1rem',
    letterSpacing: '-0.025em'
  };

  const subtitleStyle = {
    fontSize: '1.125rem',
    color: '#6b7280',
    marginBottom: '2rem',
    fontWeight: '400'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem',
    maxWidth: '1200px',
    margin: '0 auto 4rem auto'
  };

  const cardStyle = {
    padding: '1.5rem',
    borderRadius: '1rem',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const selectedCardStyle = {
    ...cardStyle,
    borderColor: '#3b82f6',
    backgroundColor: '#f8fafc',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
  };

  const previewStyle = {
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    marginTop: '2rem'
  };

  const previewHeaderStyle = {
    padding: '2rem',
    borderBottom: '1px solid #e5e7eb',
    background: 'linear-gradient(90deg, #f8fafc 0%, #f0f9ff 100%)'
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>St. Pete Design Options</h1>
        <p style={subtitleStyle}>Peaceful designs inspired by St. Petersburg, Florida</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link 
            href="/photos"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              fontSize: '0.95rem'
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
                marginBottom: '1.25rem',
                background: option.background,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                position: 'absolute',
                inset: '0',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                color: option.textColor,
                fontWeight: '600',
                fontSize: '1rem',
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
              }}>
                {option.name}
              </div>
            </div>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '0.5rem'
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div 
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: '2px solid #e5e7eb',
                  backgroundColor: option.accentColor
                }}
              ></div>
              <span style={{
                fontSize: '0.8rem',
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
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '0.5rem'
          }}>
            Live Preview: {designOptions[selectedOption - 1].name}
          </h2>
          <p style={{
            fontSize: '1rem',
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
          {/* Subtle floating elements */}
          <div style={{
            position: 'absolute',
            top: '5rem',
            right: '5rem',
            width: '6rem',
            height: '6rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(20px)'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '8rem',
            left: '5rem',
            width: '4rem',
            height: '4rem',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '50%',
            filter: 'blur(15px)'
          }}></div>
          
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 10
          }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                letterSpacing: '-0.025em'
              }}>
                Photos
              </h1>
              <p style={{
                fontSize: '1.25rem',
                marginBottom: '2rem',
                opacity: 0.9,
                maxWidth: '42rem',
                margin: '0 auto 2rem auto',
                lineHeight: '1.6'
              }}>
                A glimpse into my life beyond code — family, projects, and creative pursuits
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '1rem',
                opacity: 0.8,
                cursor: 'pointer',
                transition: 'opacity 0.2s ease'
              }}>
                ← Back to Home
              </div>
            </div>

            {/* Photo Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '4rem'
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
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    opacity: 0.7,
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
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem'
              }}>
                Behind the Scenes
              </h2>
              <div style={{
                aspectRatio: '16/9',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
                    width: '4rem',
                    height: '4rem',
                    margin: '0 auto 1rem auto',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid rgba(255, 255, 255, 0.4)',
                    backgroundColor: designOptions[selectedOption - 1].accentColor + '60',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                  }}>
                    ▶️
                  </div>
                  <p style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem'
                  }}>
                    Video Player
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    opacity: 0.8
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


