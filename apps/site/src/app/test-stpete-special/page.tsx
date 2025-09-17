'use client';

import Link from 'next/link';
import { useState } from 'react';
import '../photo-gallery.css';

export default function TestStPeteSpecialPage() {
  const [selectedOption, setSelectedOption] = useState(1);

  const designOptions = [
    {
      id: 1,
      name: "Pier 60 Magic Hour",
      description: "The golden hour at the pier with warm oranges, deep purples, and that magical light that photographers dream of",
      gradient: "radial-gradient(ellipse at center, #ff6b35 0%, #f7931e 20%, #ffd23f 40%, #ff6b9d 60%, #c44569 80%, #2d3436 100%)",
      textColor: "#ffffff",
      accentColor: "#ffd23f",
      vibe: "Pure magic hour energy",
      special: "Radial gradient mimics the sun setting over water"
    },
    {
      id: 2,
      name: "Vinoy Hotel Elegance",
      description: "Sophisticated pastels with that old Florida charm and luxury waterfront living",
      gradient: "linear-gradient(45deg, #74b9ff 0%, #0984e3 25%, #00b894 50%, #00cec9 75%, #6c5ce7 100%)",
      textColor: "#2d3436",
      accentColor: "#00cec9",
      vibe: "Luxury coastal sophistication",
      special: "Diagonal gradient for dynamic energy"
    },
    {
      id: 3,
      name: "Sunken Gardens Tropical",
      description: "Rich tropical greens with warm earth tones and that lush, exotic garden feeling",
      gradient: "conic-gradient(from 180deg, #00b894 0%, #00cec9 25%, #fdcb6e 50%, #e17055 75%, #6c5ce7 100%)",
      textColor: "#ffffff",
      accentColor: "#fdcb6e",
      vibe: "Tropical paradise vibes",
      special: "Conic gradient creates a unique circular flow"
    },
    {
      id: 4,
      name: "Downtown Arts District",
      description: "Bold, creative colors that reflect the vibrant arts scene and creative energy of downtown",
      gradient: "linear-gradient(135deg, #fd79a8 0%, #fdcb6e 20%, #e17055 40%, #d63031 60%, #6c5ce7 80%, #a29bfe 100%)",
      textColor: "#ffffff",
      accentColor: "#fdcb6e",
      vibe: "Creative urban energy",
      special: "Multi-stop gradient for rich color depth"
    },
    {
      id: 5,
      name: "Gulf Coast Serenity",
      description: "Soft, calming pastels with seafoam greens and warm sand tones - pure relaxation",
      gradient: "linear-gradient(180deg, #a8e6cf 0%, #88d8c0 25%, #ffd3a5 50%, #fd9853 75%, #a8e6cf 100%)",
      textColor: "#2d3436",
      accentColor: "#fd9853",
      vibe: "Beachy zen and calm",
      special: "Vertical gradient mimics horizon line"
    },
    {
      id: 6,
      name: "St. Pete Beach Sunset",
      description: "The classic beach sunset with warm golds, coral pinks, and deep ocean blues",
      gradient: "linear-gradient(45deg, #ff7675 0%, #fd79a8 20%, #fdcb6e 40%, #e17055 60%, #d63031 80%, #6c5ce7 100%)",
      textColor: "#ffffff",
      accentColor: "#fdcb6e",
      vibe: "Classic beach sunset romance",
      special: "Warm to cool color transition"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            St. Pete Design Lab
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Advanced design concepts inspired by the heart of St. Petersburg, Florida
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/photos"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              ← Back to Photos
            </Link>
            <Link
              href="/test-stpete"
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium"
            >
              Basic Options
            </Link>
            <Link
              href="/test-stpete-advanced"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
            >
              Advanced Options
            </Link>
          </div>
        </div>

        {/* Design Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {designOptions.map((option) => (
            <div
              key={option.id}
              className={`p-8 rounded-2xl border-2 cursor-pointer transition-all duration-500 ${
                selectedOption === option.id
                  ? 'border-blue-500 bg-blue-50 shadow-2xl scale-105 ring-4 ring-blue-200'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-xl hover:scale-102'
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <div 
                className="h-40 rounded-xl mb-6 shadow-lg relative overflow-hidden"
                style={{ background: option.gradient }}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow-lg">
                  {option.name.split(' ')[0]}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {option.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {option.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-5 h-5 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: option.accentColor }}
                  ></div>
                  <span className="text-xs text-gray-500 font-medium">
                    Accent: {option.accentColor}
                  </span>
                </div>
                <p className="text-xs text-gray-500 italic">
                  {option.vibe}
                </p>
                <p className="text-xs text-blue-600 font-medium">
                  ✨ {option.special}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Full Preview Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-10 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Live Preview: {designOptions[selectedOption - 1].name}
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              {designOptions[selectedOption - 1].description}
            </p>
            <p className="text-sm text-blue-600 font-medium">
              ✨ {designOptions[selectedOption - 1].special}
            </p>
          </div>
          
          {/* Mock Photos Page with Selected Design */}
          <div 
            className="min-h-screen p-12 relative overflow-hidden"
            style={{ 
              background: designOptions[selectedOption - 1].gradient,
              color: designOptions[selectedOption - 1].textColor
            }}
          >
            {/* Animated Floating Elements */}
            <div className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-32 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-bounce"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/15 rounded-full blur-lg animate-pulse"></div>
            <div className="absolute top-1/4 right-1/3 w-20 h-20 bg-white/8 rounded-full blur-md animate-bounce"></div>
            
            <div className="max-w-6xl mx-auto relative z-10">
              {/* Header */}
              <div className="text-center mb-20">
                <h1 className="text-7xl font-bold mb-8 drop-shadow-2xl">
                  Photos
                </h1>
                <p className="text-3xl mb-10 drop-shadow-lg opacity-90 max-w-4xl mx-auto">
                  A glimpse into my life beyond code — family, projects, and creative pursuits
                </p>
                <div className="inline-flex items-center text-xl opacity-80 hover:opacity-100 transition-opacity">
                  ← Back to Home
                </div>
              </div>

              {/* Mock Photo Grid with Advanced Masonry */}
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 mb-20">
                {Array.from({ length: 24 }).map((_, i) => {
                  const heights = ['h-48', 'h-64', 'h-56', 'h-72', 'h-52', 'h-60', 'h-44'];
                  const randomHeight = heights[Math.floor(Math.random() * heights.length)];
                  
                  return (
                    <div
                      key={i}
                      className={`${randomHeight} bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-700 hover:scale-105 mb-8 break-inside-avoid group`}
                    >
                      <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                        <svg className="w-16 h-16 opacity-60 group-hover:opacity-80 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mock Video Section */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 shadow-2xl">
                <h2 className="text-4xl font-bold mb-8 drop-shadow-lg">
                  Behind the Scenes
                </h2>
                <div className="aspect-video bg-white/20 rounded-2xl flex items-center justify-center border border-white/30 relative overflow-hidden">
                  <div className="text-center">
                    <div 
                      className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center border-4 border-white/50 shadow-2xl"
                      style={{ backgroundColor: designOptions[selectedOption - 1].accentColor + '60' }}
                    >
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 5v10l8-5-8-5z" />
                      </svg>
                    </div>
                    <p className="text-2xl font-bold mb-2">Video Player</p>
                    <p className="text-lg opacity-70">Click to play</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Design Philosophy & Implementation */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-10">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Design Philosophy: St. Pete Essence
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4">🌅 Sunset Mastery</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Each design captures the unique quality of St. Pete sunsets - from the warm golden hour 
                at Pier 60 to the dramatic colors over Tampa Bay. The gradients use real color science 
                to replicate that magical light.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4">🏖️ Coastal Sophistication</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                The designs balance relaxed beach vibes with sophisticated urban energy. Think Vinoy Hotel 
                elegance meets beachside casual - that perfect St. Pete blend of luxury and comfort.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4">🎨 Creative Innovation</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Downtown's arts district inspires bold, creative approaches. These aren't just pretty 
                colors - they're carefully crafted experiences that tell the story of St. Pete's creative soul.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4">🌊 Waterfront Living</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                The proximity to water influences every design decision. Flowing gradients, transparency 
                effects, and that sense of openness reflect the waterfront lifestyle that defines St. Pete.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4">🌴 Tropical Paradise</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                From Sunken Gardens to the tropical vibes, these designs capture that lush, exotic feeling 
                that makes St. Pete feel like a tropical paradise right in Florida.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-4">✨ Magic Hour Moments</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                The most special designs capture those fleeting moments - the golden hour, the perfect 
                sunset, that magical light that photographers chase. These are the moments that make 
                St. Pete unforgettable.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


