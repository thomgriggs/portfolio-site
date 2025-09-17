'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TestStPeteLogoPage() {
  const [selectedOption, setSelectedOption] = useState(1);

  const designOptions = [
    {
      id: 1,
      name: "Warm Neutral + Blue",
      description: "Warm beiges and grays with your signature blue highlights",
      background: "linear-gradient(135deg, #fefce8 0%, #fef3c7 30%, #f3f4f6 70%, #e5e7eb 100%)",
      textColor: "#374151",
      accentColor: "#3b82f6",
      highlightColor: "#1d4ed8"
    },
    {
      id: 2,
      name: "Pearl Gray + Blue", 
      description: "Soft grays and whites with blue accent highlights",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 70%, #cbd5e1 100%)",
      textColor: "#374151",
      accentColor: "#3b82f6",
      highlightColor: "#1e40af"
    },
    {
      id: 3,
      name: "Warm + Logo Colors",
      description: "Warm neutrals with your full logo color palette as highlights",
      background: "linear-gradient(135deg, #fefce8 0%, #fef3c7 30%, #f3f4f6 70%, #e5e7eb 100%)",
      textColor: "#374151",
      accentColor: "#3b82f6",
      highlightColor: "#059669"
    },
    {
      id: 4,
      name: "Pearl + Logo Colors",
      description: "Pearl grays with your brand colors as accent highlights",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 70%, #cbd5e1 100%)",
      textColor: "#374151",
      accentColor: "#3b82f6",
      highlightColor: "#dc2626"
    },
    {
      id: 5,
      name: "Warm + Blue Gradient",
      description: "Warm base with subtle blue gradient highlights",
      background: "linear-gradient(135deg, #fefce8 0%, #fef3c7 30%, #f0f9ff 70%, #e0f2fe 100%)",
      textColor: "#374151",
      accentColor: "#0ea5e9",
      highlightColor: "#0284c7"
    },
    {
      id: 6,
      name: "Pearl + Blue Gradient",
      description: "Pearl base with gentle blue gradient highlights",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 30%, #f0f9ff 70%, #e0f2fe 100%)",
      textColor: "#374151",
      accentColor: "#0ea5e9",
      highlightColor: "#0284c7"
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
    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.15)'
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
        <p style={subtitleStyle}>Warm neutrals and pearl grays with your logo colors as highlights</p>
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
              {/* Blue highlight accent */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '4px',
                background: `linear-gradient(90deg, ${option.accentColor} 0%, ${option.highlightColor} 100%)`
              }}></div>
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
              {/* Blue accent dot */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: option.accentColor,
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}></div>
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
          {/* Blue highlight elements */}
          <div style={{
            position: 'absolute',
            top: '4rem',
            right: '4rem',
            width: '6rem',
            height: '6rem',
            background: `radial-gradient(circle, ${designOptions[selectedOption - 1].accentColor}20 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(20px)'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '6rem',
            left: '4rem',
            width: '4rem',
            height: '4rem',
            background: `radial-gradient(circle, ${designOptions[selectedOption - 1].highlightColor}15 0%, transparent 70%)`,
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
                letterSpacing: '-0.025em',
                background: `linear-gradient(135deg, ${designOptions[selectedOption - 1].textColor} 0%, ${designOptions[selectedOption - 1].accentColor} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
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
                transition: 'opacity 0.2s ease',
                color: designOptions[selectedOption - 1].accentColor,
                fontWeight: '500'
              }}>
                ← Back to Home
              </div>
            </div>

            {/* Photo Grid with Blue Highlights */}
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
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Blue highlight on hover */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    height: '3px',
                    background: `linear-gradient(90deg, ${designOptions[selectedOption - 1].accentColor} 0%, ${designOptions[selectedOption - 1].highlightColor} 100%)`,
                    transform: 'translateY(-100%)',
                    transition: 'transform 0.3s ease'
                  }}></div>
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

            {/* Video Section with Blue Accents */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              borderRadius: '1rem',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Blue accent border */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '4px',
                background: `linear-gradient(90deg, ${designOptions[selectedOption - 1].accentColor} 0%, ${designOptions[selectedOption - 1].highlightColor} 100%)`
              }}></div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: designOptions[selectedOption - 1].accentColor
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
                    border: `3px solid ${designOptions[selectedOption - 1].accentColor}`,
                    backgroundColor: designOptions[selectedOption - 1].accentColor + '20',
                    boxShadow: `0 4px 12px ${designOptions[selectedOption - 1].accentColor}40`
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


