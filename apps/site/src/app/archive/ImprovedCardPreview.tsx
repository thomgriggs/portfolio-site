'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImprovedCardPreviewProps {
  project: {
    _id: string;
    title: string;
    urlPath?: string;
    description?: string;
    industry?: string;
    skills?: string[];
    images?: Array<{
      _key: string;
      asset: {
        _ref: string;
        _type: 'reference';
        url: string;
      };
    }>;
  };
  index: number;
}

const ImprovedCardPreview = React.memo(function ImprovedCardPreview({ project, index }: ImprovedCardPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasValidUrl = project.urlPath && project.urlPath.startsWith('http');

  // Use Sanity images (now with fixed keys)
  const getScreenshotPath = (projectName: string) => {
    // If project has images from Sanity, use the first one
    if (project.images && project.images.length > 0) {
      return project.images[0]?.asset?.url;
    }
    
    // Try WebP first, then fallback to PNG
    const webpPath = `/captured-screenshots/${projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.webp`;
    
    // Check if WebP exists, otherwise use PNG
    return webpPath;
    
    // Conservative mapping - only use screenshots that actually exist
    const screenshotMap: { [key: string]: string } = {
      // Direct matches with existing screenshots
                    "1er etage": "1er-etage.png",
                    "Academie Hotel": "academie-hotel.png",
                    "Akan Collection": "akan-collection.png",
                    "Alma Hotel": "alma-hotel.png",
                    "Altai Courchevel": "altai-courchevel.png",
                    "Ares Paris Hotel": "ares-paris-hotel.png",
                    "Brasserie Leschenapans": "brasserie-leschenapans.png",
                    "Campings Liberte": "campings-liberte.png",
                    "Cendyn Website": "cendyn-website.png",
                    "Chateau Apigne": "chateau-apigne.png",
                    "Chateau de Riell": "chateau-de-riell.png",
                    "Chateau des Avenieres": "chateau-des-avenieres.png",
                    "Chateaula Commaraine": "chateaula-commaraine.png",
                    "Collection Vesper": "collection-vesper.png",
                    "College Hotel": "college-hotel.png",
                    "Drouant": "drouant.png",
                    "Elysees Union Apartments": "elysees-union-apartments.png",
                    "ENV Hair Studio": "env-hair-studio.png",
                    "F and S Framing": "f-and-s-framing.png",
                    "Fourviere Hotel": "fourviere-hotel.png",
                    "Gardinier": "gardinier.png",
                    "Grand Barrail": "grand-barrail.png",
                    "Hostellerie Du Lys": "hostellerie-du-lys.png",
                    "Hotel Beauregard": "hotel-beauregard.png",
                    "Hotel Charlemagne": "hotel-charlemagne.png",
                    "Hotel Chateaudeau": "hotel-chateaudeau.png",
                    "Hotel de la Boetie": "hotel-de-la-boetie.png",
                    "Hotel Des Dunes": "hotel-des-dunes.png",
                    "Hotel Edouard 6": "hotel-edouard-6.png",
                    "Hotel Epoque": "hotel-epoque.png",
                    "Hotel Golf Chateau De Chailly": "hotel-golf-chateau-de-chailly.png",
                    "Hotel Grichting": "hotel-grichting.png",
                    "Hotel le Doge": "hotel-le-doge.png",
                    "Hotel M Merignac": "hotel-m-merignac.png",
                    "Hotel Moliere": "hotel-moliere.png",
                    "Hotel Monge": "hotel-monge.png",
                    "Hotel Norman": "hotel-norman.png",
                    "Hotel Parc Montsouris": "hotel-parc-montsouris.png",
                    "Hotel Paris Muguet": "hotel-paris-muguet.png",
                    "Hotel Paris Petitlouvre": "hotel-paris-petitlouvre.png",
                    "Hotel Paris Printemps": "hotel-paris-printemps.png",
                    "Hotel Pastel Paris": "hotel-pastel-paris.png",
                    "Hotel Pont Royal": "hotel-pont-royal.png",
                    "Hotel Prieure": "hotel-prieure.png",
                    "Hotel Royal St Honore": "hotel-royal-st-honore.png",
                    "Hotel Sparis Versailles": "hotel-sparis-versailles.png",
                    "Hotel Waldorf": "hotel-waldorf.png",
                    "Hotel WYLD Saint Germain": "hotel-wyld-saint-germain.png",
                    "Hotels Demeures Historiques": "hotels-demeures-historiques.png",
                    "Ivi Mare Paphos": "ivi-mare-paphos.png",
                    "Le Bois Joli": "le-bois-joli.png",
                    "Legend Beach": "legend-beach.png",
                    "Les Berges de Palombaggia": "les-berges-de-palombaggia.png",
                    "Les Cures Marines": "les-cures-marines.png",
                    "Les Maisons de Lea": "les-maisons-de-lea.png",
                    "Leto Hydra": "leto-hydra.png",
                    "Libert Everdon": "libert-everdon.png",
                    "Libert Landrellec": "libert-landrellec.png",
                    "Liberte Lacanau": "liberte-lacanau.png",
                    "Liss Ard Estate": "liss-ard-estate.png",
                    "Lyric Hotel Paris": "lyric-hotel-paris.png",
                    "Maison des Armateurs": "maison-des-armateurs.png",
                    "Maison Heler": "maison-heler-metz.png",
                    "Maison Heler Metz": "maison-heler-metz.png",
                    "Makass Appart Hotel": "makass-appart-hotel.png",
                    "Malone Hotels": "malone-hotels.png",
                    "Moulin Plaza": "moulin-plaza.png",
                    "My Home in Paris": "my-home-in-paris.png",
                    "Odeon Hotel": "odeon-hotel.png",
                    "Optimum RV": "optimum-rv.png",
                    "Paris Hotel Lion": "paris-hotel-lion.png",
                    "Paris Hotel Yllen Eiffel": "paris-hotel-yllen-eiffel.png",
                    "Pecora Negra": "pecora-negra.png",
                    "Pomeroy Hotel": "pomeroy-hotel.png",
                    "Qlik": "qlik.png",
                    "Relais Christine": "relais-christine.png",
                    "Relais Du Moulin": "relais-du-moulin.png",
                    "St Mellion Estate": "st-mellion-estate.png",
                    "The Augustin": "the-augustin.png",
                    "The Wall Street Inn": "the-wall-street-inn.png",
                    "thousandhillsresorthotel": "thousandhillsresorthotel.png",
                    "Tortiniere": "tortiniere.png",
                    "Valdiski": "valdiski.png",
                    "Welfi Hospitality": "welfi-hospitality.png",
      
      // Hotel Palombaggia should use its specific screenshot
      "Hotel Palombaggia": "les-berges-de-palombaggia.png",
      
      // Newly captured screenshots
      "Hotel Maubeuge": "hotel-maubeuge.png",
      "Chateau De Mercues": "chateau-de-mercues.png",
      "Maisons Taillevent Paris": "maisons-taillevent-paris.png",
      "Hotel Saint Marc": "hotel-saint-marc.png",
      "Manoir de Lan Kerellec": "manoir-de-lan-kerellec.png",
      "Hotel Petit Paris": "hotel-petit-paris.png",
      "Hotel X Toronto": "hotel-x-toronto.png",
      "Harmony Spa Budapest": "harmony-spa-budapest.png",
      "Bob Hotel Paris": "bob-hotel-paris.png",
      "Hotel Crayon Rouge": "hotel-crayon-rouge.png",
      "Hotel La Parizienne": "hotel-la-parizienne.png",
      "Handsome Hotel paris": "handsome-hotel-paris.png",
      "Hotel Felicien Paris": "hotel-felicien-paris.png",
      "Hotel Champerret Elysees": "hotel-champerret-elysees.png",
      "Hotel Dauphine St Germain": "hotel-dauphine-st-germain.png",
      "Legend Hotel Paris": "legend-hotel-paris.png",
      "Casablanca Hotel": "casablanca-hotel.png",
      "Aria Hotel Budapest": "aria-hotel-budapest.png",
      "Hotel Giraffe": "hotel-giraffe.png",
      "Library Hotel": "library-hotel.png",
      "Villathena": "villathena.png",
      "Snob Hotel Paris": "snob-hotel-paris.png",
      "Vintage Hotel": "vintage-hotel.png",
      "Villas Le Barone": "villas-le-barone.png",
      "La Maison Champs Elysees": "la-maison-champs-elysees.png",
      "Le Bellechasse Saint Germain": "le-bellechasse-saint-germain.png",
      "Hotel Emile": "hotel-emile.png",
      "Terra Place": "terra-place.png",
      "Duna Park Beach Club": "duna-park-beach-club.png",
      "Hotel Saintgregoire": "hotel-saintgregoire.png",
      "Hotel Henry IV": "hotel-henry-iv.png",
      "Auberge De La Source": "auberge-de-la-source.png",
      "Dun Parque Alentejo Star Hotel": "dun-parque-alentejo-star-hotel.png",
      "Quay Perth": "quay-perth.png",
      "Hotel Lautrec Opera": "hotel-lautrec-opera.png",
      "Duna Park Moinho Da Asneira": "duna-park-moinho-da-asneira.png",
      "Duna Park Quinta Da Samoqueirinha": "duna-park-quinta-da-samoqueirinha.png",
      "Hotel Mermoz": "hotel-mermoz.png",
      "Mercure": "mercure.png",
      "Louis St Elias Resort": "louis-st-elias-resort.png",
      "Ferme Saint Simeon": "ferme-saint-simeon.png",
      "Le Petit Coq Aux Champs": "le-petit-coq-aux-champs.png",
      "Le Saint Hotel Paris": "le-saint-hotel-paris.png",
      "Privilege Toulouse": "privilege-toulouse.png",
      "The Palm Seychelles": "the-palm-seychelles.png",
      "Safari Tours": "safari-tours.png",
      "Elegancia Hotels": "elegancia-hotels.png",
      "Hotel Longchamp Elysees": "hotel-longchamp-elysees.png",
      "Villa Abbazia": "villa-abbazia.png",
      "Hotel Central Saint Germain": "hotel-central-saint-germain.png",
      "French Coco Luxury Botique Hotel": "french-coco-luxury-botique-hotel.png",
      "Hotel Victor Hugo": "hotel-victor-hugo.png",
      "BHF Paris": "bhf-paris.png",
      "Auberge Du Jeu De Paume Chantilly": "auberge-du-jeu-de-paume-chantilly.png",
      "Hotel Beaurepaire": "hotel-beaurepaire.png",
      "2L Collection": "2l-collection.png",
      "King Jason Protaras": "king-jason-protaras.png",
      "Hotel Arcadie": "hotel-arcadie.png",
      "La Chambre Du Marais": "la-chambre-du-marais.png",
      "King Jason Paphos": "king-jason-paphos.png",
      "Ter Elst": "ter-elst.png",
      "Tobira": "tobira.png",
      "Benvengudo": "benvengudo.png",
      "Villa Des Orangers": "villa-des-orangers.png",
      "Serge Vieira": "serge-vieira.png",
      "The Royal Apollonia": "the-royal-apollonia.png",
      "Suit Case Best Western": "suit-case-best-western.png",
      "La Bastide En Gascogne": "la-bastide-en-gascogne.png",
      "Hotel Exquis Paris": "hotel-exquis-paris.png",
      "La Comtesse": "la-comtesse.png",
      "Hotel Crayon": "hotel-crayon.png",
      "Malcom & Barret Hotel and Bar": "malcom-barret-hotel-and-bar.png",
      "Duna Park Milfontes": "duna-park-milfontes.png",
      "Duna Park Mimi": "duna-park-mimi.png",
      "Hotel Bienvenue": "hotel-bienvenue.png",
    "Hotel Florida Paris": "hotel-florida-paris.png"
          };

    // Check if we have a direct mapping
    if (screenshotMap[projectName]) {
      return `/screenshots/${screenshotMap[projectName]}`;
    }

    // Fallback to the original logic for unmapped projects
    const name = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    return `/screenshots/${name}.png`;
  };

  const screenshotPath = getScreenshotPath(project.title);

  // Function to get available screenshots for projects with multiple pages
  const getAvailableScreenshots = (projectTitle: string) => {
    if (projectTitle === 'Hotel Palombaggia') {
      return [
        'les-berges-de-palombaggia.png',
        'les-berges-de-palombaggia-homepage.png',
        'les-berges-de-palombaggia-rooms.png',
        'les-berges-de-palombaggia-restaurant.png',
        'les-berges-de-palombaggia-spa.png'
      ];
    } else if (projectTitle === 'Maison Heler') {
      return [
        'maison-heler-metz.png',
        'maison-heler-metz-homepage.png',
        'maison-heler-metz-rooms.png',
        'maison-heler-metz-restaurant.png',
        'maison-heler-metz-spa.png'
      ];
    }
    return [];
  };
  
  // Check if we have multiple screenshots for this project
  const hasMultipleScreenshots = project.title === 'Hotel Palombaggia' || project.title === 'Maison Heler';
  const availableScreenshots = hasMultipleScreenshots ? getAvailableScreenshots(project.title) : [];

  // Get industry color with coastal sunset palette
  const getIndustryColor = (industry?: string) => {
    switch (industry?.toLowerCase()) {
      case 'hospitality':
      case 'hotel':
      case 'resort':
        return 'bg-gradient-to-r from-orange-400 to-pink-500';
      case 'restaurant':
      case 'cafe':
        return 'bg-gradient-to-r from-red-400 to-orange-500';
      case 'spa':
      case 'wellness':
        return 'bg-gradient-to-r from-teal-400 to-cyan-500';
      case 'automotive':
        return 'bg-gradient-to-r from-blue-400 to-indigo-500';
      case 'finance':
        return 'bg-gradient-to-r from-purple-400 to-pink-500';
      default:
        return 'bg-gradient-to-r from-slate-400 to-gray-500';
    }
  };

  const industryColorClass = getIndustryColor(project.industry);

  return (
    <article 
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-labelledby={`project-title-${project._id}`}
    >
      {/* Browser Frame - Integrated into card */}
      <div className="browser-frame">
        <div className="browser-header">
          {/* Browser Controls */}
          <div className="browser-controls">
            <div className="browser-dot browser-dot--red"></div>
            <div className="browser-dot browser-dot--yellow"></div>
            <div className="browser-dot browser-dot--green"></div>
          </div>
          
          {/* Address Bar */}
          {hasValidUrl && (
            <div className="address-bar">
              {project.urlPath?.replace(/^https?:\/\//, '')}
            </div>
          )}
        </div>
      </div>

      {/* Website Preview Container */}
      <div className="project-preview">
        {/* Try to show real screenshot first */}
        {screenshotPath && !imageError ? (
          <div className="relative w-full h-full">
              <Image
              src={screenshotPath}
              alt={`Screenshot of ${project.title} website showing the homepage design and layout`}
              fill
              className="archive-card-image"
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={index < 6}
              loading={index < 6 ? "eager" : "lazy"}
              quality={75}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            
            {/* Slider Navigation for multiple screenshots */}
            {hasMultipleScreenshots && availableScreenshots.length > 1 && (
              <div className="absolute bottom-2 right-2 flex space-x-1">
                {availableScreenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentImageIndex === idx ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`View screenshot ${idx + 1} of ${availableScreenshots.length}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Fallback to clean mockup */
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center text-gray-400">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm font-medium">Screenshot Coming Soon</p>
              <p className="text-xs text-gray-500 mt-1">Preview not available</p>
            </div>
          </div>
        )}

        {/* Clean hover overlay - no fuzzy effect */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/10 flex items-center justify-center">
            <div className="flex space-x-3">
              {hasValidUrl && (
                <a
                  href={project.urlPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-slate-900 rounded-md text-sm font-medium shadow-lg hover:bg-slate-50 transition-colors border border-slate-200"
                >
                  Visit Site
                </a>
              )}
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="px-4 py-2 bg-gradient-to-r from-slate-800 to-gray-800 text-white rounded-md text-sm font-medium hover:from-slate-700 hover:to-gray-700 transition-colors shadow-lg"
                aria-expanded={showDetails}
                aria-controls={`project-details-${project._id}`}
              >
                {showDetails ? 'Less Info' : 'More Info'}
              </button>
            </div>
          </div>
        )}

        {/* Status badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {!imageError ? (
            <div className="px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs rounded-full font-medium shadow-sm">
              Live Preview
            </div>
          ) : (
            <div className="px-2 py-1 bg-gradient-to-r from-slate-500 to-gray-600 text-white text-xs rounded-full font-medium shadow-sm">
              Preview Pending
            </div>
          )}
          {hasMultipleScreenshots && availableScreenshots.length > 1 && (
            <div className="px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs rounded-full font-medium shadow-sm">
              {availableScreenshots.length} Pages
            </div>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="project-info">
        <h3 className="project-title" id={`project-title-${project._id}`}>
          {project.title}
        </h3>
        
        {project.industry && (
          <div className="mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${industryColorClass} shadow-sm`}>
              {project.industry}
            </span>
          </div>
        )}

        {/* Details Panel - Fixed height to prevent shifting */}
        <div 
          id={`project-details-${project._id}`}
          className={`transition-all duration-300 overflow-hidden ${showDetails ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          aria-hidden={!showDetails}
        >
          <div className="pt-4 border-t border-gray-100">
            {project.description && (
              <div className="mb-3">
                <p className="project-description">{project.description}</p>
                {project.urlPath && (
                  <div className="mt-2 text-xs text-slate-500">
                    <span className="inline-flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live website available
                    </span>
                  </div>
                )}
              </div>
            )}

            {project.skills && project.skills.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <svg className="w-3 h-3 mr-1 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Technologies</span>
                </div>
                <div className="project-tags">
                  {project.skills.slice(0, 4).map((skill, index) => (
                    <span
                      key={skill || index}
                      className="project-tag"
                    >
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 4 && (
                    <span className="project-tag">
                      +{project.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Toggle Details Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-4 w-full py-2.5 text-sm font-medium rounded-lg transition-all duration-200
            bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 hover:from-slate-200 hover:to-gray-200
            border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md"
          aria-expanded={showDetails}
          aria-controls={`project-details-${project._id}`}
        >
          <span className="flex items-center justify-center">
            {showDetails ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Show Less
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                View Details
              </>
            )}
          </span>
        </button>
      </div>
    </article>
  );
});

export default ImprovedCardPreview;
