'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TestStPeteMellowPage() {
  const [selectedOption, setSelectedOption] = useState(1);

  const designOptions = [
    {
      id: 1,
      name: "Soft Dawn",
      description: "Gentle morning light with soft pinks and warm grays",
      background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 30%, #f3e8ff 70%, #f1f5f9 100%)",
      textColor: "#374151",
      accentColor: "#d8b4fe"
    },
    {
      id: 2,
      name: "Misty Morning", 
      description: "Soft blues and grays like a gentle morning fog",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 30%, #f1f5f9 70%, #f8fafc 100%)",
      textColor: "#475569",
      accentColor: "#7dd3fc"
    },
    {
      id: 3,
      name: "Warm Sand",
      description: "Soft beiges and warm creams like peaceful beach sand",
      background: "linear-gradient(135deg, #fefce8 0%, #fef3c7 30%, #fef7ed 70%, #fffbeb 100%)",
      textColor: "#6b7280",
      accentColor: "#fbbf24"
    },
    {
      id: 4,
      name: "Gentle Sage",
      description: "Soft greens and sage tones for a calming, natural feel",
      background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 30%, #f0f9ff 70%, #f8fafc 100%)",
      textColor: "#374151",
      accentColor: "#86efac"
    },
    {
      id: 5,
      name: "Lavender Mist",
      description: "Soft purples and lilacs for a peaceful, dreamy atmosphere",
      background: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 30%, #fdf2f8 70%, #fef7ed 100%)",
      textColor: "#4b5563",
      accentColor: "#c4b5fd"
    },
    {
      id: 6,
      name: "Pearl Gray",
      description: "Soft grays and whites like gentle clouds on a calm day",
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 70%, #cbd5e1 100%)",
      textColor: "#374151",
      accentColor: "#94a3b8"
    }
  ];

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#fafafa',
    padding: '3rem 1.5rem'
  };

  const headerStyle = {
    textAlign: 'center' as const,
    marginBottom: '3rem',
    maxWidth: '1200px',
    margin: '0 auto 3rem auto'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '300',
    color: '#4b5563',
    marginBottom: '1rem',
    letterSpacing: '-0.025em'
  };

  const subtitleStyle = {
    fontSize: '1.125rem',
    color: '#6b7280',
    marginBottom: '2rem',
    fontWeight: '300'
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
    padding: '2rem',
    borderRadius: '1.5rem',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
  };

  const selectedCardStyle = {
    ...cardStyle,
    borderColor: '#a78bfa',
    backgroundColor: '#faf5ff',
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 40px rgba(167, 139, 250, 0.15)'
  };

  const previewStyle = {
    backgroundColor: 'white',
    borderRadius: '1.5rem',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    marginTop: '2rem'
  };

  const previewHeaderStyle = {
    padding: '2.5rem',
    borderBottom: '1px solid #f1f5f9',
    background: 'linear-gradient(90deg, #fafafa 0%, #f0f9ff 100%)'
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Peaceful St. Pete Designs</h1>
        <p style={subtitleStyle}>Gentle, mellow designs inspired by the calm side of St. Petersburg</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link 
            href="/photos"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#8b5cf6',
              color: 'white',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              fontWeight: '400',
              transition: 'all 0.3s ease',
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
                height: '180px',
                borderRadius: '1rem',
                marginBottom: '1.5rem',
                background: option.background,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div style={{
                position: 'absolute',
                inset: '0',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                color: option.textColor,
                fontWeight: '500',
                fontSize: '1.125rem',
                textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
              }}>
                {option.name}
              </div>
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.75rem'
            }}>
              {option.name}
            </h3>
            <p style={{
              color: '#6b7280',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              lineHeight: '1.6',
              fontWeight: '300'
            }}>
              {option.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div 
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: '2px solid #e5e7eb',
                  backgroundColor: option.accentColor,
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              ></div>
              <span style={{
                fontSize: '0.85rem',
                color: '#6b7280',
                fontWeight: '400'
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
            fontSize: '1.75rem',
            fontWeight: '400',
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            Live Preview: {designOptions[selectedOption - 1].name}
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            fontWeight: '300'
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
          {/* Gentle floating elements */}
          <div style={{
            position: 'absolute',
            top: '4rem',
            right: '4rem',
            width: '6rem',
            height: '6rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(30px)'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '6rem',
            left: '4rem',
            width: '4rem',
            height: '4rem',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '50%',
            filter: 'blur(20px)'
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
                fontSize: '3rem',
                fontWeight: '300',
                marginBottom: '1.5rem',
                letterSpacing: '-0.025em'
              }}>
                Photos
              </h1>
              <p style={{
                fontSize: '1.25rem',
                marginBottom: '2rem',
                opacity: 0.8,
                maxWidth: '40rem',
                margin: '0 auto 2rem auto',
                fontWeight: '300',
                lineHeight: '1.6'
              }}>
                A gentle glimpse into my life beyond code — family, projects, and peaceful moments
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '1rem',
                opacity: 0.7,
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
                fontWeight: '300'
              }}>
                ← Back to Home
              </div>
            </div>

            {/* Soft Photo Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.25rem',
              marginBottom: '4rem'
            }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: '1',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '1rem',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div style={{
                    fontSize: '2rem',
                    opacity: 0.6
                  }}>
                    🌸
                  </div>
                </div>
              ))}
            </div>

            {/* Gentle Video Section */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(12px)',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '400',
                marginBottom: '1.5rem',
                letterSpacing: '-0.025em'
              }}>
                Behind the Scenes
              </h2>
              <div style={{
                aspectRatio: '16/9',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)'
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
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    backgroundColor: designOptions[selectedOption - 1].accentColor + '40',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                  }}>
                    ▶️
                  </div>
                  <p style={{
                    fontSize: '1.25rem',
                    fontWeight: '400',
                    marginBottom: '0.5rem',
                    opacity: 0.9
                  }}>
                    Video Player
                  </p>
                  <p style={{
                    fontSize: '0.95rem',
                    opacity: 0.7,
                    fontWeight: '300'
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


