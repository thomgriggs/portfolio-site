'use client';

import Link from 'next/link';
import { useState } from 'react';
import '../photo-gallery.css';

export default function TestStPeteAdvancedPage() {
  const [selectedOption, setSelectedOption] = useState(1);

  const designOptions = [
    {
      id: 1,
      name: "Pier 60 Sunset",
      description: "The iconic pier sunset with deep oranges, coral pinks, and that perfect golden hour glow",
      gradient: "linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #ffd23f 50%, #ff6b9d 75%, #c44569 100%)",
      textColor: "#ffffff",
      accentColor: "#ffd23f",
      vibe: "Iconic St. Pete pier energy"
    },
    {
      id: 2,
      name: "Tampa Bay Breeze",
      description: "Soft coastal blues with hints of seafoam and that fresh salt air feeling",
      gradient: "linear-gradient(135deg, #74b9ff 0%, #0984e3 25%, #00b894 50%, #00cec9 75%, #6c5ce7 100%)",
      textColor: "#ffffff",
      accentColor: "#00cec9",
      vibe: "Fresh coastal living"
    },
    {
      id: 3,
      name: "Vinoy Park Golden Hour",
      description: "Warm golds and ambers with that perfect late afternoon light over the water",
      gradient: "linear-gradient(135deg, #fdcb6e 0%, #e17055 25%, #d63031 50%, #e84393 75%, #6c5ce7 100%)",
      textColor: "#ffffff",
      accentColor: "#fdcb6e",
      vibe: "Luxury waterfront vibes"
    },
    {
      id: 4,
      name: "Gulf Coast Serenity",
      description: "Soft pastels with seafoam greens and warm sand tones - pure relaxation",
      gradient: "linear-gradient(135deg, #a8e6cf 0%, #88d8c0 25%, #ffd3a5 50%, #fd9853 75%, #a8e6cf 100%)",
      textColor: "#2d3436",
      accentColor: "#fd9853",
      vibe: "Beachy calm and zen"
    },
    {
      id: 5,
      name: "Downtown St. Pete Energy",
      description: "Vibrant urban colors with that creative, artistic energy of downtown",
      gradient: "linear-gradient(135deg, #fd79a8 0%, #fdcb6e 25%, #e17055 50%, #d63031 75%, #6c5ce7 100%)",
      textColor: "#ffffff",
      accentColor: "#fdcb6e",
      vibe: "Creative urban energy"
    },
    {
      id: 6,
      name: "Sunken Gardens Magic",
      description: "Rich tropical greens with warm earth tones and that lush garden feeling",
      gradient: "linear-gradient(135deg, #00b894 0%, #00cec9 25%, #fdcb6e 50%, #e17055 75%, #6c5ce7 100%)",
      textColor: "#ffffff",
      accentColor: "#fdcb6e",
      vibe: "Tropical garden paradise"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            St. Pete Design Studio
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Capturing the essence of St. Petersburg, Florida through design
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/photos"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Photos
            </Link>
            <Link
              href="/test-stpete"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Basic Options
            </Link>
          </div>
        </div>

        {/* Design Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {designOptions.map((option) => (
            <div
              key={option.id}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                selectedOption === option.id
                  ? 'border-blue-500 bg-blue-50 shadow-xl scale-105'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <div 
                className="h-32 rounded-lg mb-4 shadow-lg"
                style={{ background: option.gradient }}
              ></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {option.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {option.description}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <div 
                  className="w-4 h-4 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: option.accentColor }}
                ></div>
                <span className="text-xs text-gray-500">
                  Accent: {option.accentColor}
                </span>
              </div>
              <p className="text-xs text-gray-500 italic font-medium">
                {option.vibe}
              </p>
            </div>
          ))}
        </div>

        {/* Full Preview Section */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Live Preview: {designOptions[selectedOption - 1].name}
            </h2>
            <p className="text-gray-600">
              {designOptions[selectedOption - 1].description}
            </p>
          </div>
          
          {/* Mock Photos Page with Selected Design */}
          <div 
            className="min-h-screen p-8 relative overflow-hidden"
            style={{ 
              background: designOptions[selectedOption - 1].gradient,
              color: designOptions[selectedOption - 1].textColor
            }}
          >
            {/* Floating Elements for Depth */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
            <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-white/15 rounded-full blur-md"></div>
            
            <div className="max-w-5xl mx-auto relative z-10">
              {/* Header */}
              <div className="text-center mb-16">
                <h1 className="text-6xl font-bold mb-6 drop-shadow-2xl">
                  Photos
                </h1>
                <p className="text-2xl mb-8 drop-shadow-lg opacity-90">
                  A glimpse into my life beyond code — family, projects, and creative pursuits
                </p>
                <div className="inline-flex items-center text-lg opacity-80 hover:opacity-100 transition-opacity">
                  ← Back to Home
                </div>
              </div>

              {/* Mock Photo Grid with Masonry Effect */}
              <div className="columns-2 md:columns-3 lg:columns-4 gap-6 mb-16">
                {Array.from({ length: 20 }).map((_, i) => {
                  const heights = ['h-48', 'h-64', 'h-56', 'h-72', 'h-52'];
                  const randomHeight = heights[Math.floor(Math.random() * heights.length)];
                  
                  return (
                    <div
                      key={i}
                      className={`${randomHeight} bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-500 hover:scale-105 mb-6 break-inside-avoid`}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-12 h-12 opacity-60" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mock Video Section */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 drop-shadow-lg">
                  Behind the Scenes
                </h2>
                <div className="aspect-video bg-white/20 rounded-xl flex items-center justify-center border border-white/30">
                  <div className="text-center">
                    <div 
                      className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center border-4 border-white/50"
                      style={{ backgroundColor: designOptions[selectedOption - 1].accentColor + '40' }}
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 5v10l8-5-8-5z" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium">Video Player</p>
                    <p className="text-sm opacity-70">Click to play</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Design Philosophy */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Design Philosophy: St. Pete Vibes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">🌅 Sunset Inspiration</h4>
              <p className="text-gray-700 text-sm">
                Each design draws from the incredible sunsets over Tampa Bay, capturing those warm oranges, 
                pinks, and purples that make St. Pete famous. The gradients mimic the sky's natural color transitions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">🏖️ Coastal Relaxation</h4>
              <p className="text-gray-700 text-sm">
                The relaxed, laid-back energy of St. Pete is reflected in soft transitions, gentle curves, 
                and that easy-going feeling that makes you want to slow down and enjoy the moment.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">🎨 Creative Energy</h4>
              <p className="text-gray-700 text-sm">
                Downtown St. Pete's vibrant arts scene inspires bold color combinations and creative layouts 
                that feel both sophisticated and approachable.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">🌊 Waterfront Living</h4>
              <p className="text-gray-700 text-sm">
                The proximity to water influences the design with flowing gradients, transparency effects, 
                and that sense of openness and space that comes with waterfront living.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


