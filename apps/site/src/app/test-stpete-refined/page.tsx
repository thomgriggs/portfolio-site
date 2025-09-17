'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TestStPeteRefinedPage() {
  const [selectedOption, setSelectedOption] = useState(1);

  const designOptions = [
    {
      id: 1,
      name: "Pearl + Sharp B&W", 
      description: "Pearl grays with crisp black and white highlights",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 70%, #cbd5e1 100%)",
      textColor: "#111827",
      accentColor: "#000000",
      highlightColor: "#ffffff",
      textStyle: "sans"
    },
    {
      id: 2,
      name: "Warm + Typography Focus",
      description: "Warm base with balanced typography hierarchy",
      background: "linear-gradient(135deg, #fefce8 0%, #fef3c7 30%, #f3f4f6 70%, #e5e7eb 100%)",
      textColor: "#1f2937",
      accentColor: "#000000",
      highlightColor: "#ffffff",
      textStyle: "display"
    },
    {
      id: 3,
      name: "Warm + High Contrast",
      description: "Warm base with high contrast black/white elements",
      background: "linear-gradient(135deg, #fefce8 0%, #fef3c7 30%, #f3f4f6 70%, #e5e7eb 100%)",
      textColor: "#000000",
      accentColor: "#000000",
      highlightColor: "#ffffff",
      textStyle: "sans"
    },
    {
      id: 4,
      name: "Pearl + High Contrast",
      description: "Pearl base with bold black/white contrast",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 70%, #cbd5e1 100%)",
      textColor: "#000000",
      accentColor: "#000000",
      highlightColor: "#ffffff",
      textStyle: "serif"
    },
    {
      id: 5,
      name: "Warm + Display Typography",
      description: "Warm base with sophisticated display font",
      background: "linear-gradient(135deg, #fefce8 0%, #fef3c7 30%, #f3f4f6 70%, #e5e7eb 100%)",
      textColor: "#1f2937",
      accentColor: "#000000",
      highlightColor: "#ffffff",
      textStyle: "display-refined"
    },
    {
      id: 6,
      name: "Pearl + Display Typography",
      description: "Pearl grays with elegant display font",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 70%, #cbd5e1 100%)",
      textColor: "#1f2937",
      accentColor: "#000000",
      highlightColor: "#ffffff",
      textStyle: "display-refined"
    }
  ];

  const getTypographyStyle = (textStyle: string) => {
    switch (textStyle) {
      case 'serif':
        return { 
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontWeight: '400'
        };
      case 'sans':
        return { 
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontWeight: '400'
        };
      case 'display':
        return { 
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
          fontWeight: '500' // Balanced weight, not too bold
        };
      case 'display-refined':
        return { 
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
          fontWeight: '300', // Lighter for elegance
          letterSpacing: '0.025em' // Slightly spaced for sophistication
        };
      default:
        return { fontFamily: 'inherit' };
    }
  };

  const getTitleWeight = (textStyle: string) => {
    switch (textStyle) {
      case 'serif':
        return '600';
      case 'sans':
        return '500';
      case 'display':
        return '600';
      case 'display-refined':
        return '400';
      default:
        return '600';
    }
  };

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
    borderColor: '#000000',
    backgroundColor: '#f8fafc',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
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
    background: 'linear-gradient(90deg, #f8fafc 0%, #ffffff 100%)'
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Refined St. Pete Designs</h1>
        <p style={subtitleStyle}>Balanced typography with sharp black/white accents - refined selection</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link 
            href="/photos"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#000000',
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
              {/* Sharp black accent bar */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '4px',
                backgroundColor: option.accentColor
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
                fontSize: '1rem',
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
                ...getTypographyStyle(option.textStyle),
                fontWeight: getTitleWeight(option.textStyle)
              }}>
                {option.name}
              </div>
              {/* Black accent dot */}
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
              marginBottom: '0.5rem',
              color: '#111827',
              ...getTypographyStyle(option.textStyle),
              fontWeight: getTitleWeight(option.textStyle)
            }}>
              {option.name}
            </h3>
            <p style={{
              color: '#6b7280',
              marginBottom: '1rem',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              ...getTypographyStyle(option.textStyle)
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
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                ...getTypographyStyle(option.textStyle)
              }}>
                {option.textStyle === 'display-refined' ? 'display' : option.textStyle}
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
            marginBottom: '0.5rem',
            color: '#111827',
            ...getTypographyStyle(designOptions[selectedOption - 1].textStyle),
            fontWeight: getTitleWeight(designOptions[selectedOption - 1].textStyle)
          }}>
            Live Preview: {designOptions[selectedOption - 1].name}
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            ...getTypographyStyle(designOptions[selectedOption - 1].textStyle)
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
          {/* Black highlight elements */}
          <div style={{
            position: 'absolute',
            top: '4rem',
            right: '4rem',
            width: '6rem',
            height: '6rem',
            background: `radial-gradient(circle, ${designOptions[selectedOption - 1].accentColor}10 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(20px)'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '6rem',
            left: '4rem',
            width: '4rem',
            height: '4rem',
            background: `radial-gradient(circle, ${designOptions[selectedOption - 1].accentColor}15 0%, transparent 70%)`,
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
                marginBottom: '1.5rem',
                letterSpacing: '-0.025em',
                color: designOptions[selectedOption - 1].textColor,
                ...getTypographyStyle(designOptions[selectedOption - 1].textStyle),
                fontWeight: getTitleWeight(designOptions[selectedOption - 1].textStyle)
              }}>
                Photos
              </h1>
              <p style={{
                fontSize: '1.25rem',
                marginBottom: '2rem',
                opacity: 0.9,
                maxWidth: '42rem',
                margin: '0 auto 2rem auto',
                lineHeight: '1.6',
                ...getTypographyStyle(designOptions[selectedOption - 1].textStyle)
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
                ...getTypographyStyle(designOptions[selectedOption - 1].textStyle),
                fontWeight: '500'
              }}>
                ← Back to Home
              </div>
            </div>

            {/* Photo Grid with Black Highlights */}
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
                  {/* Black highlight on hover */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    height: '3px',
                    backgroundColor: designOptions[selectedOption - 1].accentColor,
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

            {/* Video Section with Black Accents */}
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
              {/* Black accent border */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '4px',
                backgroundColor: designOptions[selectedOption - 1].accentColor
              }}></div>
              <h2 style={{
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
                color: designOptions[selectedOption - 1].textColor,
                ...getTypographyStyle(designOptions[selectedOption - 1].textStyle),
                fontWeight: getTitleWeight(designOptions[selectedOption - 1].textStyle)
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
                    marginBottom: '0.5rem',
                    ...getTypographyStyle(designOptions[selectedOption - 1].textStyle),
                    fontWeight: getTitleWeight(designOptions[selectedOption - 1].textStyle)
                  }}>
                    Video Player
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    opacity: 0.8,
                    ...getTypographyStyle(designOptions[selectedOption - 1].textStyle)
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


