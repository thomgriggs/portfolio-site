'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TestStPeteCleanPage() {
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

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            St. Pete Design Options
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Beautiful, finished designs inspired by St. Petersburg, Florida
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/photos"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              ← Back to Photos
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Refresh Preview
            </button>
          </div>
        </div>

        {/* Design Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {designOptions.map((option) => (
            <div
              key={option.id}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                selectedOption === option.id
                  ? 'border-blue-500 bg-blue-50 shadow-xl scale-105'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <div 
                className="h-40 rounded-xl mb-6 shadow-lg relative overflow-hidden"
                style={{ background: option.background }}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold text-lg drop-shadow-lg">
                  {option.name}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {option.name}
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {option.description}
              </p>
              <div className="flex items-center gap-3">
                <div 
                  className="w-5 h-5 rounded-full border-2 border-gray-300 shadow-sm"
                  style={{ backgroundColor: option.accentColor }}
                ></div>
                <span className="text-sm text-gray-500 font-medium">
                  {option.accentColor}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Full Preview Section */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Live Preview: {designOptions[selectedOption - 1].name}
            </h2>
            <p className="text-lg text-gray-600">
              {designOptions[selectedOption - 1].description}
            </p>
          </div>
          
          {/* Mock Photos Page with Selected Design */}
          <div 
            className="min-h-screen p-12 relative"
            style={{ 
              background: designOptions[selectedOption - 1].background,
              color: designOptions[selectedOption - 1].textColor
            }}
          >
            {/* Subtle floating elements for depth */}
            <div className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-32 left-20 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
            
            <div className="max-w-5xl mx-auto relative z-10">
              {/* Header */}
              <div className="text-center mb-20">
                <h1 className="text-6xl font-bold mb-8 drop-shadow-lg">
                  Photos
                </h1>
                <p className="text-2xl mb-10 drop-shadow-md opacity-90 max-w-3xl mx-auto">
                  A glimpse into my life beyond code — family, projects, and creative pursuits
                </p>
                <div className="inline-flex items-center text-xl opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                  ← Back to Home
                </div>
              </div>

              {/* Photo Grid with Masonry Effect */}
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 mb-20">
                {Array.from({ length: 20 }).map((_, i) => {
                  // Use a consistent pattern instead of random heights
                  const heights = ['h-48', 'h-64', 'h-56', 'h-72', 'h-52', 'h-60', 'h-48', 'h-64', 'h-56', 'h-72', 'h-52', 'h-60', 'h-48', 'h-64', 'h-56', 'h-72', 'h-52', 'h-60', 'h-48', 'h-64'];
                  const height = heights[i % heights.length];
                  
                  return (
                    <div
                      key={i}
                      className={`${height} bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-500 hover:scale-105 mb-6 break-inside-avoid group`}
                    >
                      <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                        <svg className="w-12 h-12 opacity-60 group-hover:opacity-80 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Video Section */}
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-10 border border-white/25 shadow-2xl">
                <h2 className="text-3xl font-bold mb-8 drop-shadow-lg">
                  Behind the Scenes
                </h2>
                <div className="aspect-video bg-white/25 rounded-xl flex items-center justify-center border border-white/30 relative overflow-hidden">
                  <div className="text-center">
                    <div 
                      className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center border-4 border-white/50 shadow-2xl"
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

        {/* Implementation Notes */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Ready to Implement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">🎨 Design Features</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Beautiful gradient backgrounds inspired by St. Pete</li>
                <li>• Masonry photo grid with hover effects</li>
                <li>• Full-screen video section with custom styling</li>
                <li>• Responsive design that works on all devices</li>
                <li>• Subtle animations and transitions</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">🚀 Next Steps</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Choose your favorite design option</li>
                <li>• Apply the gradient to your photos page</li>
                <li>• Update the photo grid with real images</li>
                <li>• Customize colors and spacing as needed</li>
                <li>• Test on different devices and browsers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
