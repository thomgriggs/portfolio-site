'use client';

import Link from 'next/link';
import { useState } from 'react';
import '../photo-gallery.css';

export default function TestStPetePage() {
  const [selectedOption, setSelectedOption] = useState(1);

  const designOptions = [
    {
      id: 1,
      name: "Sunset Over Water",
      description: "Warm oranges, pinks, and purples with a gradient that mimics the sky over Tampa Bay",
      colors: "from-orange-400 via-pink-500 to-purple-600",
      vibe: "Romantic, warm, golden hour magic"
    },
    {
      id: 2,
      name: "Coastal Breeze",
      description: "Soft blues, teals, and whites with a clean, airy feel like a sea breeze",
      colors: "from-blue-300 via-teal-400 to-cyan-500",
      vibe: "Fresh, clean, relaxed coastal living"
    },
    {
      id: 3,
      name: "Golden Hour",
      description: "Rich golds, ambers, and warm yellows that capture that perfect St. Pete light",
      colors: "from-yellow-400 via-amber-500 to-orange-600",
      vibe: "Warm, inviting, that perfect golden light"
    },
    {
      id: 4,
      name: "Tropical Sunset",
      description: "Vibrant pinks, corals, and deep purples like a tropical sunset over the Gulf",
      colors: "from-pink-400 via-rose-500 to-purple-700",
      vibe: "Vibrant, tropical, sunset energy"
    },
    {
      id: 5,
      name: "Seaside Serenity",
      description: "Soft pastels with a hint of seafoam green and warm sand tones",
      colors: "from-green-200 via-teal-300 to-blue-400",
      vibe: "Peaceful, serene, beachy calm"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            St. Pete Design Options
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Capturing that perfect St. Petersburg, Florida feeling
          </p>
          <Link
            href="/photos"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Photos
          </Link>
        </div>

        {/* Design Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {designOptions.map((option) => (
            <div
              key={option.id}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                selectedOption === option.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <div className={`h-24 rounded-lg mb-4 bg-gradient-to-r ${option.colors}`}></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {option.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {option.description}
              </p>
              <p className="text-xs text-gray-500 italic">
                {option.vibe}
              </p>
            </div>
          ))}
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Preview: {designOptions[selectedOption - 1].name}
          </h2>
          
          {/* Mock Photos Page with Selected Design */}
          <div className={`min-h-screen bg-gradient-to-br ${designOptions[selectedOption - 1].colors} p-8`}>
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  Photos
                </h1>
                <p className="text-xl text-white/90 mb-6 drop-shadow-md">
                  A glimpse into my life beyond code — family, projects, and creative pursuits
                </p>
                <div className="inline-flex items-center text-white/80 hover:text-white transition-colors">
                  ← Back to Home
                </div>
              </div>

              {/* Mock Photo Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-full h-full flex items-center justify-center text-white/60">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mock Video Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-md">
                  Behind the Scenes
                </h2>
                <div className="aspect-video bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="text-white/60 text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l8-5-8-5z" />
                    </svg>
                    <p className="text-sm">Video Player</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Notes */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Implementation Notes
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Each option uses CSS gradients for smooth color transitions</li>
            <li>• Text has drop shadows for better readability over gradients</li>
            <li>• Semi-transparent overlays create depth and visual interest</li>
            <li>• Hover effects maintain the relaxed, interactive feel</li>
            <li>• Colors are inspired by actual St. Pete sunsets and coastal vibes</li>
          </ul>
        </div>
      </section>
    </main>
  );
}


