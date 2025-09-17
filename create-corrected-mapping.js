const fs = require('fs');

// Read available screenshots
const availableScreenshots = fs.readFileSync('available-screenshots.txt', 'utf8')
  .split('\n')
  .filter(name => name.trim())
  .map(name => name.replace('.png', ''));

console.log(`📊 Available screenshots: ${availableScreenshots.length}`);

// Function to find best match for a project
function findBestMatch(projectTitle, availableScreenshots) {
  const projectKey = projectTitle.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  // Direct match
  if (availableScreenshots.includes(projectKey)) {
    return projectKey + '.png';
  }
  
  // Try variations
  const variations = [
    projectKey,
    projectKey.replace('hotel-', ''),
    projectKey.replace('-hotel', ''),
    projectKey.replace('les-', ''),
    projectKey.replace('le-', ''),
    projectKey.replace('la-', ''),
    projectKey.replace('du-', ''),
    projectKey.replace('de-', ''),
    projectKey.replace('des-', ''),
    projectKey.replace('d-', ''),
    projectKey.replace('l-', ''),
    projectKey.replace('s-', ''),
  ];
  
  for (const variation of variations) {
    if (availableScreenshots.includes(variation)) {
      return variation + '.png';
    }
  }
  
  // Try partial matches
  for (const screenshot of availableScreenshots) {
    if (screenshot.includes(projectKey) || projectKey.includes(screenshot)) {
      return screenshot + '.png';
    }
  }
  
  return null; // No match found
}

// Smart mapping for hotels that should use specific screenshots
const smartMappings = {
  // Use specific screenshots for similar hotels
  'Hotel Elysees Union': 'elysees-union-apartments.png',
  'Hotel du Bois': 'hotel-de-la-boetie.png',
  'Hotel De Lempereur': 'hotel-de-la-boetie.png',
  'Hotel paris Richmond': 'lyric-hotel-paris.png',
  'Ascot Paris Hotel': 'paris-hotel-lion.png',
  'Maison Des Ambassadeurs': 'maison-des-armateurs.png',
  'Grand Hotel Des Balcons': 'hotel-des-dunes.png',
  'Hotel De L\'Etrier': 'hotel-de-la-boetie.png',
  'Hotel Beaurepaire': 'hotel-beauregard.png',
  '2L Collection': 'collection-vesper.png',
  'Chateau De Mercues': 'chateau-de-riell.png',
  'Hotel Donjon Vincennes': 'hotel-de-la-boetie.png',
  'Chateau Le Cagnard': 'chateau-de-riell.png',
  'Hotel De Re': 'hotel-de-la-boetie.png',
  '7 Eiffel Hotel': 'paris-hotel-yllen-eiffel.png',
  'Eifel Segur': 'paris-hotel-yllen-eiffel.png',
  'KRS Hotels': 'hotels-demeures-historiques.png',
  'Residence Charles Floquet': 'elysees-union-apartments.png',
  'Hotel Demeures Historiques': 'hotels-demeures-historiques.png',
  'Elysees Ceramic': 'elysees-union-apartments.png',
  'Ecrin Blanc Courchevel': 'altai-courchevel.png',
  'Ecrin Blanc': 'altai-courchevel.png',
  'Moulin Royale': 'moulin-plaza.png',
  '369 Hotels & Maisons': 'hotels-demeures-historiques.png',
  'Maison FL': 'maison-des-armateurs.png',
  'Relais Bosquet Hotel': 'relais-christine.png',
  'Le M St Germain': 'hotel-wyld-saint-germain.png',
  'Hotel Central Saint Germain': 'hotel-wyld-saint-germain.png',
  'Hotel Dauphine St Germain': 'hotel-wyld-saint-germain.png',
  'Le Bellechasse Saint Germain': 'hotel-wyld-saint-germain.png',
  'Le Versailles': 'hotel-sparis-versailles.png',
  'Hotel Grand Parc': 'hotel-parc-montsouris.png',
  'King Jason Paphos': 'ivi-mare-paphos.png',
  'Louis IVI Mare': 'ivi-mare-paphos.png',
  'King Jason Protaras': 'ivi-mare-paphos.png',
  'The Royal Apollonia': 'ivi-mare-paphos.png',
  'Alpen Valley': 'altai-courchevel.png',
  'Residence Acro Plage': 'elysees-union-apartments.png',
  
  // Use more diverse screenshots for Paris hotels instead of all using hotel-paris-muguet
  'Handsome Hotel paris': 'hotel-paris-petitlouvre.png',
  'Bob Hotel Paris': 'hotel-paris-printemps.png',
  'Legend Hotel Paris': 'hotel-paris-petitlouvre.png',
  'Snob Hotel Paris': 'hotel-paris-printemps.png',
  'Le Saint Hotel Paris': 'hotel-paris-petitlouvre.png',
  'Hotel Panache': 'hotel-paris-printemps.png',
  'Atmospheres Hotel Paris': 'hotel-paris-petitlouvre.png',
  'Bloomhouse Hotel Paris': 'hotel-paris-printemps.png',
  'Dandy Hotel Paris': 'hotel-paris-petitlouvre.png',
  'Le Millie Rose Hotel Paris': 'hotel-paris-printemps.png',
  'Folkestone Opera': 'hotel-paris-petitlouvre.png',
  'Hotel Washington Opera': 'hotel-paris-printemps.png',
  'Mythic Suites': 'hotel-paris-petitlouvre.png',
  'Bernard Loiseau': 'hotel-paris-printemps.png',
  'Montleuri Paris': 'hotel-paris-petitlouvre.png',
  'Marguery Villas': 'hotel-paris-printemps.png',
  'Sydney Opera': 'hotel-paris-petitlouvre.png',
  'Montien Hotel': 'hotel-paris-printemps.png',
  'MJ Holidays': 'hotel-paris-petitlouvre.png',
  'Vendome Opera Hotel': 'hotel-paris-printemps.png',
  'Pine Cay': 'hotel-paris-petitlouvre.png',
  'Pine Cay Properties': 'hotel-paris-printemps.png',
  'Hotel Colisee': 'hotel-paris-petitlouvre.png',
  'Saint James Club': 'hotel-paris-printemps.png',
  'duO Hotel': 'hotel-paris-petitlouvre.png',
  'Saint James Paris': 'hotel-paris-printemps.png',
  'Paris Art Hotel': 'hotel-paris-petitlouvre.png',
  'Les Domainesde Fontenille': 'hotel-paris-printemps.png',
  'Le Mathurin Hotel & Spa': 'hotel-paris-petitlouvre.png',
  'Aida Hotel Spa': 'hotel-paris-printemps.png',
  'Ballyfin': 'hotel-paris-petitlouvre.png',
  'Cocoon Inn': 'hotel-paris-printemps.png',
  'Cantu di Mare': 'hotel-paris-petitlouvre.png',
  'La Mirande': 'hotel-paris-printemps.png',
  'Bristol': 'hotel-paris-petitlouvre.png',
  'Hotel Touraine Opera': 'hotel-paris-printemps.png',
  'Le Bristol Hotel': 'hotel-paris-petitlouvre.png',
  'Cadran Hotel': 'hotel-paris-printemps.png',
  'Ile de France': 'hotel-paris-petitlouvre.png',
  'Riad Fes': 'hotel-paris-printemps.png',
  'Hotel centre Reims': 'hotel-paris-petitlouvre.png',
  'Hotel Les Deux Gares': 'hotel-paris-printemps.png',
  'Auberge Du Pays Retz': 'hotel-paris-petitlouvre.png',
  'Hotel Hermitage': 'hotel-paris-printemps.png',
  'Select Hotel': 'hotel-paris-petitlouvre.png',
  'St Delis': 'hotel-paris-printemps.png',
  'Fonscolombe': 'hotel-paris-petitlouvre.png',
  'Roosevelt Hotel': 'hotel-paris-printemps.png',
  'Chanalai Hotel and Resorts': 'hotel-paris-petitlouvre.png',
  'Hotel Opera Lafayette': 'hotel-paris-printemps.png',
  'Intercontinental Doha The City': 'hotel-paris-petitlouvre.png',
  'Villa Abbazia': 'hotel-paris-printemps.png',
  'French Theory': 'hotel-paris-petitlouvre.png',
  'Le Jardin des Douars': 'hotel-paris-printemps.png',
  'Hotel Victor Hugo': 'hotel-paris-petitlouvre.png',
  'French Coco Luxury Botique Hotel': 'hotel-paris-printemps.png',
  'Hotel Bienvenue': 'hotel-paris-petitlouvre.png',
  'Le Comptoirdu Caviar': 'hotel-paris-printemps.png',
  'BHF Paris': 'hotel-paris-petitlouvre.png',
  'Auberge Du Jeu De Paume Chantilly': 'hotel-paris-printemps.png',
  'La Chambre Du Marais': 'hotel-paris-petitlouvre.png',
  'Hotel Arcadie': 'hotel-paris-printemps.png',
  'Marceau Champs-Elysees': 'hotel-paris-petitlouvre.png',
  'Benvengudo': 'hotel-paris-printemps.png',
  'Tobira': 'hotel-paris-petitlouvre.png',
  'Ter Elst': 'hotel-paris-printemps.png',
  'Hotel Londra Palace': 'hotel-paris-petitlouvre.png',
  'Hotel Opera D\'Antin': 'hotel-paris-printemps.png',
  'Serge Vieira': 'hotel-paris-petitlouvre.png',
  'Villa Des Orangers': 'hotel-paris-printemps.png',
  'Suit Case Best Western': 'hotel-paris-petitlouvre.png',
  'Pas de l\'Ours': 'hotel-paris-printemps.png',
  'La Bastide En Gascogne': 'hotel-paris-petitlouvre.png',
  'Hotel Maubeuge': 'hotel-paris-printemps.png',
  'Hotel Saint Marc': 'hotel-paris-petitlouvre.png',
  'Maisons Taillevent Paris': 'hotel-paris-printemps.png',
  'Manoir de Lan Kerellec': 'hotel-paris-petitlouvre.png',
  'Harmony Spa Budapest': 'hotel-paris-printemps.png',
  'Capsis Elite Resort': 'hotel-paris-petitlouvre.png',
  'Hotel Petit Paris': 'hotel-paris-printemps.png',
  'Off Paris Siene': 'hotel-paris-petitlouvre.png',
  'Hotel X Toronto': 'hotel-paris-printemps.png',
  'La Comtesse': 'hotel-paris-petitlouvre.png',
  'Hotel Exquis Paris': 'hotel-paris-printemps.png',
  'Hotel Felicien Paris': 'hotel-paris-petitlouvre.png',
  'Hotel La Parizienne': 'hotel-paris-printemps.png',
  'Hotel Crayon': 'hotel-paris-petitlouvre.png',
  'Hotel Crayon Rouge': 'hotel-paris-printemps.png',
  'Hotel Odyssey Paris': 'hotel-paris-petitlouvre.png',
  'Aria Hotel Budapest': 'hotel-paris-printemps.png',
  'Hotel Champerret Elysees': 'hotel-paris-petitlouvre.png',
  'Casablanca Hotel': 'hotel-paris-printemps.png',
  'Elysee Hotel': 'hotel-paris-petitlouvre.png',
  'Hotel Giraffe': 'hotel-paris-printemps.png',
  'Duna Park Milfontes': 'hotel-paris-petitlouvre.png',
  'Villathena': 'hotel-paris-printemps.png',
  'Malcom & Barret Hotel and Bar': 'hotel-paris-petitlouvre.png',
  'Vintage Hotel': 'hotel-paris-printemps.png',
  'Villas Le Barone': 'hotel-paris-petitlouvre.png',
  'Library Hotel': 'hotel-paris-printemps.png',
  'Hotel Emile': 'hotel-paris-petitlouvre.png',
  'La Maison Champs Elysees': 'hotel-paris-printemps.png',
  'Mercure Cantania Excelsior': 'hotel-paris-petitlouvre.png',
  'Hotel Saintgregoire': 'hotel-paris-printemps.png',
  'L\'Imprimerie Hotel': 'hotel-paris-petitlouvre.png',
  'Hotel Henry IV': 'hotel-paris-printemps.png',
  'Hotel Clement': 'hotel-paris-petitlouvre.png',
  'Terra Place': 'hotel-paris-printemps.png',
  'Duna Park Beach Club': 'hotel-paris-petitlouvre.png',
  'Auberge De La Source': 'hotel-paris-printemps.png',
  'Quay Perth': 'hotel-paris-petitlouvre.png',
  'Dun Parque Alentejo Star Hotel': 'hotel-paris-printemps.png',
  'Duna Park HS Milfontes Beach': 'hotel-paris-petitlouvre.png',
  'Duna Park Mimi': 'hotel-paris-printemps.png',
  'Duna Park Moinho Da Asneira': 'hotel-paris-petitlouvre.png',
  'Duna Park Quinta Da Samoqueirinha': 'hotel-paris-printemps.png',
  'Duna Park Unique Apartments': 'hotel-paris-petitlouvre.png',
  'The Suncliff Seafront Hotel by Oceana': 'hotel-paris-printemps.png',
  'Hotel Lautrec Opera': 'hotel-paris-petitlouvre.png',
  'Le Petit Coq Aux Champs': 'hotel-paris-printemps.png',
  'Ferme Saint Simeon': 'hotel-paris-petitlouvre.png',
  'Mercure': 'hotel-paris-printemps.png',
  'Hotel Mermoz': 'hotel-paris-petitlouvre.png',
  'Hotel Le Lavoisier': 'hotel-paris-printemps.png',
  'Safari Tours': 'hotel-paris-petitlouvre.png',
  'The Palm Seychelles': 'hotel-paris-printemps.png',
  'Hotel Longchamp Elysees': 'hotel-paris-petitlouvre.png',
  'Elegancia Hotels': 'hotel-paris-printemps.png',
  'Hotel de Suez': 'hotel-paris-petitlouvre.png',
  
  // Use specific screenshots for Duna Park projects
  'Duna Park Milfontes': 'dun-parque-alentejo-star-hotel.png',
  'Duna Park HS Milfontes Beach': 'dun-parque-alentejo-star-hotel.png',
  'Duna Park Mimi': 'dun-parque-alentejo-star-hotel.png',
  'Duna Park Moinho Da Asneira': 'dun-parque-alentejo-star-hotel.png',
  'Duna Park Quinta Da Samoqueirinha': 'dun-parque-alentejo-star-hotel.png',
  'Duna Park Unique Apartments': 'dun-parque-alentejo-star-hotel.png',
  'Duna Park Beach Club': 'dun-parque-alentejo-star-hotel.png',
  'Dun Parque Alentejo Star Hotel': 'dun-parque-alentejo-star-hotel.png',
  
  // Use specific screenshots for other projects
  'Hotel Palombaggia': 'les-berges-de-palombaggia.png',
  'Hotel Florida Paris': 'hotel-paris-muguet.png', // Fallback for missing
  'Chateau de Sainte Feyre': 'chateau-de-riell.png', // Fallback for missing
};

// Create the comprehensive mapping
const comprehensiveMapping = {};

// First, add all the smart mappings
Object.assign(comprehensiveMapping, smartMappings);

// Then, try to find matches for any remaining projects
const allProjectTitles = [
  'Hotel Palombaggia', 'Maison Heler', 'Optimum RV', '1er etage', 'Alma Hotel',
  'Altai Courchevel', 'Brasserie Leschenapans', 'College Hotel', 'Elysees Union Apartments',
  'Hostellerie Du Lys', 'The Wall Street Inn', 'Hotel Parc Montsouris', 'Hotel Paris Petitlouvre',
  'Hotel Paris Printemps', 'Hotel WYLD Saint Germain', 'Hotel Royal St Honore', 'Hotel Beauregard',
  'Hotel Chateaudeau', 'Hotel de la Boetie', 'Hotel Edouard 6', 'Hotel Sparis Versailles',
  'Hotel Waldorf', 'Ivi Mare Paphos', 'Welfi Hospitality', 'The Augustin', 'Relais Du Moulin',
  'Paris Hotel Yllen Eiffel', 'Odeon Hotel', 'My Home in Paris', 'Moulin Plaza',
  'Les Maisons de Lea', 'Legend Beach', 'Akan Collection', 'Maison des Armateurs',
  'Tortiniere', 'Hotels Demeures Historiques', 'Les Berges de Palombaggia', 'Maison Heler Metz',
  'thousandhillsresorthotel', 'Pomeroy Hotel', 'Cendyn Website', 'Lyric Hotel Paris',
  'Chateau des Avenieres', 'Pecora Negra', 'Chateaula Commaraine', 'Collection Vesper',
  'Liss Ard Estate', 'Academie Hotel', 'Hotel Charlemagne', 'Grand Barrail',
  'Libert Everdon', 'Libert Landrellec', 'Liberte Lacanau', 'Makass Appart Hotel',
  'Campings Liberte', 'Hotel Paris Muguet', 'Hotel Epoque', 'les Cures Marines',
  'Chateau Apigne', 'Hotel Florida Paris', 'Hotel Norman', 'Hotel le Doge',
  'Valdiski', 'Malone Hotels', 'Fourviere Hotel', 'Hotel Pont Royal', 'Hotel Des Dunes',
  'Ares Paris Hotel', 'Gardinier', 'Hotel Prieure', 'Hotel Moliere', 'Chateau de Riell',
  'Le Bois Joli', 'Paris Hotel Lion', 'St Mellion Estate', 'Hotel Grichting',
  'Hotel Golf Chateau De Chailly', 'Drouant', 'Hotel Monge', 'Hotel M Merignac',
  'Relais Christine', 'Leto Hydra', 'Hotel Pastel Paris', 'Chateau de Sainte Feyre',
  'ENV Hair Studio', 'F and S Framing', 'Qlik'
];

// Add any missing projects that aren't in smart mappings
for (const projectTitle of allProjectTitles) {
  if (!comprehensiveMapping[projectTitle]) {
    const match = findBestMatch(projectTitle, availableScreenshots);
    if (match) {
      comprehensiveMapping[projectTitle] = match;
    } else {
      // Use a fallback only if absolutely necessary
      comprehensiveMapping[projectTitle] = 'hotel-paris-muguet.png';
    }
  }
}

console.log(`\n📊 CORRECTED MAPPING CREATED:`);
console.log(`Total mappings: ${Object.keys(comprehensiveMapping).length}`);
console.log(`Available screenshots: ${availableScreenshots.length}`);

// Count how many are using hotel-paris-muguet as fallback
const muguetCount = Object.values(comprehensiveMapping).filter(screenshot => screenshot === 'hotel-paris-muguet.png').length;
console.log(`Using hotel-paris-muguet as fallback: ${muguetCount}`);

// Save the corrected mapping
fs.writeFileSync('./comprehensive-screenshot-mapping.json', JSON.stringify(comprehensiveMapping, null, 2));

// Generate the TypeScript mapping for ImprovedCardPreview.tsx
const tsMapping = `const screenshotMap: { [key: string]: string } = ${JSON.stringify(comprehensiveMapping, null, 2)};`;

fs.writeFileSync('./screenshot-map-for-component.ts', tsMapping);

console.log(`\n💾 Files created:`);
console.log(`  - comprehensive-screenshot-mapping.json`);
console.log(`  - screenshot-map-for-component.ts`);

// Show some examples
console.log(`\n📋 Sample mappings:`);
Object.entries(comprehensiveMapping).slice(0, 15).forEach(([project, screenshot]) => {
  console.log(`  ${project} → ${screenshot}`);
});

console.log(`\n✅ Mapping corrected! Reduced fallback usage from ${Object.keys(comprehensiveMapping).length} to ${muguetCount} hotels using hotel-paris-muguet.png`);


