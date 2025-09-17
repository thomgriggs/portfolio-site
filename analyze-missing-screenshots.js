const fs = require('fs');
const path = require('path');

// Your list of missing projects
const missingProjects = [
  'Brittany & Spa Hotel Restaurant Spa',
  'Hotel Panache',
  'Hotel Donjon Vincennes',
  'Chateau Le Cagnard',
  'Hotel De Re',
  '7 Eiffel Hotel',
  'Eifel Segur',
  'KRS Hotels',
  'Residence Charles Floquet',
  'Hotel du Bois',
  'Hotel Elysees Union',
  'Folkestone Opera',
  'Hotel Washington Opera',
  'Hotel Demeures Historiques',
  'Elysees Ceramic',
  'Mythic Suites',
  'Ecrin Blanc Courchevel',
  'Bernard Loiseau',
  'Montleuri Paris',
  'Moulin Royale',
  'Bloomhouse Hotel Paris',
  'Marguery Villas',
  'Sydney Opera',
  'Montien Hotel',
  'MJ Holidays',
  'Dandy Hotel Paris',
  'Le Millie Rose Hotel Paris',
  'Vendome Opera Hotel',
  'Pine Cay',
  'Pine Cay Properties',
  'Hotel Colisee',
  'Saint James Club',
  'duO Hotel',
  'Saint James Paris',
  'Paris Art Hotel',
  'Les Domainesde Fontenille',
  '369 Hotels & Maisons',
  'Maison FL',
  'Le Mathurin Hotel & Spa',
  'Aida Hotel Spa',
  'Ballyfin',
  'Relais Bosquet Hotel',
  'Hotel De Lempereur',
  'Le M St Germain',
  'Hotel Central Saint Germain',
  'Cocoon Inn',
  'Cantu di Mare',
  'La Mirande',
  'Bristol',
  'Hotel paris Richmond',
  'Hotel Touraine Opera',
  'Le Bristol Hotel',
  'Le Versailles',
  'Cadran Hotel',
  'Ascot Paris Hotel',
  'Ile de France',
  'Riad Fes',
  'Maison Des Ambassadeurs',
  'Hotel centre Reims',
  'Hotel Les Deux Gares',
  'Auberge Du Pays Retz',
  'Hotel Hermitage',
  'Hotel Grand Parc',
  'Select Hotel',
  'St Delis',
  'Grand Hotel Des Balcons',
  'Fonscolombe',
  'Roosevelt Hotel',
  'Atmospheres Hotel Paris',
  'Chanalai Hotel and Resorts',
  'Hotel Opera Lafayette',
  'Intercontinental Doha The City',
  'Residence Acro Plage',
  'Hotel Central Saint Germain',
  'Villa Abbazia',
  'French Theory',
  'Hotel De L\'Etrier',
  'Le Jardin des Douars',
  'Alpen Valley',
  'Hotel Victor Hugo',
  'French Coco Luxury Botique Hotel',
  'Hotel Beaurepaire',
  'Hotel Bienvenue',
  'Le Comptoirdu Caviar',
  'BHF Paris',
  'Auberge Du Jeu De Paume Chantilly',
  '2L Collection',
  'Ecrin Blanc',
  'La Chambre Du Marais',
  'King Jason Paphos',
  'Hotel Arcadie',
  'Louis IVI Mare',
  'King Jason Protaras',
  'Marceau Champs-Elysees',
  'Benvengudo',
  'Tobira',
  'Ter Elst',
  'Hotel Londra Palace',
  'The Royal Apollonia',
  'Hotel Opera D\'Antin',
  'Serge Vieira',
  'Villa Des Orangers',
  'Suit Case Best Western',
  'Pas de l\'Ours',
  'La Bastide En Gascogne',
  'Hotel Maubeuge',
  'Hotel Saint Marc',
  'Chateau De Mercues',
  'Maisons Taillevent Paris',
  'Manoir de Lan Kerellec',
  'Harmony Spa Budapest',
  'Capsis Elite Resort',
  'Hotel Petit Paris',
  'Off Paris Siene',
  'Hotel X Toronto',
  'La Comtesse',
  'Hotel Exquis Paris',
  'Hotel Felicien Paris',
  'Handsome Hotel paris',
  'Hotel La Parizienne',
  'Bob Hotel Paris',
  'Hotel Crayon',
  'Hotel Crayon Rouge',
  'Legend Hotel Paris',
  'Hotel Odyssey Paris',
  'Aria Hotel Budapest',
  'Hotel Champerret Elysees',
  'Hotel Dauphine St Germain',
  'Casablanca Hotel',
  'Elysee Hotel',
  'Hotel Giraffe',
  'Duna Park Milfontes',
  'Snob Hotel Paris',
  'Villathena',
  'Malcom & Barret Hotel and Bar',
  'Vintage Hotel',
  'Villas Le Barone',
  'Library Hotel',
  'Hotel Emile',
  'Le Bellechasse Saint Germain',
  'La Maison Champs Elysees',
  'Mercure Cantania Excelsior',
  'Hotel Saintgregoire',
  'L\'Imprimerie Hotel',
  'Hotel Henry IV',
  'Hotel Clement',
  'Terra Place',
  'Duna Park Beach Club',
  'Auberge De La Source',
  'Quay Perth',
  'Dun Parque Alentejo Star Hotel',
  'Duna Park HS Milfontes Beach',
  'Duna Park Mimi',
  'Duna Park Moinho Da Asneira',
  'Duna Park Quinta Da Samoqueirinha',
  'Duna Park Unique Apartments',
  'The Suncliff Seafront Hotel by Oceana',
  'Hotel Lautrec Opera',
  'Le Petit Coq Aux Champs',
  'Ferme Saint Simeon',
  'Le Saint Hotel Paris',
  'Louis St Elias Resort',
  'Privilege Toulouse',
  'Mercure',
  'Hotel Mermoz',
  'Hotel Le Lavoisier',
  'Safari Tours',
  'The Palm Seychelles',
  'Hotel Longchamp Elysees',
  'Elegancia Hotels',
  'Hotel de Suez'
];

// Get available screenshots
const screenshotsDir = './apps/site/public/screenshots';
const availableScreenshots = fs.readdirSync(screenshotsDir)
  .filter(file => file.endsWith('.png'))
  .map(file => file.replace('.png', ''));

console.log(`\n📊 ANALYSIS RESULTS:`);
console.log(`Missing projects listed: ${missingProjects.length}`);
console.log(`Available screenshots: ${availableScreenshots.length}`);

// Function to create filename from project name
function createFilename(projectName) {
  return projectName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special chars except spaces
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/&/g, 'and') // Replace & with 'and'
    .replace(/'/g, '') // Remove apostrophes
    .replace(/é/g, 'e') // Replace é with e
    .replace(/è/g, 'e') // Replace è with e
    .replace(/à/g, 'a') // Replace à with a
    .replace(/ç/g, 'c') // Replace ç with c
    .trim();
}

// Check for potential matches
const potentialMatches = [];
const noMatches = [];

missingProjects.forEach(project => {
  const filename = createFilename(project);
  
  // Check for exact match
  if (availableScreenshots.includes(filename)) {
    potentialMatches.push({ project, filename, match: 'exact' });
    return;
  }
  
  // Check for partial matches
  const partialMatches = availableScreenshots.filter(screenshot => 
    screenshot.includes(filename.substring(0, 10)) || 
    filename.includes(screenshot.substring(0, 10))
  );
  
  if (partialMatches.length > 0) {
    potentialMatches.push({ 
      project, 
      filename, 
      match: 'partial', 
      suggestions: partialMatches 
    });
  } else {
    noMatches.push({ project, filename });
  }
});

console.log(`\n✅ EXACT MATCHES: ${potentialMatches.filter(m => m.match === 'exact').length}`);
potentialMatches.filter(m => m.match === 'exact').forEach(match => {
  console.log(`  ${match.project} → ${match.filename}.png`);
});

console.log(`\n🔍 PARTIAL MATCHES: ${potentialMatches.filter(m => m.match === 'partial').length}`);
potentialMatches.filter(m => m.match === 'partial').forEach(match => {
  console.log(`  ${match.project} → ${match.filename}.png (suggestions: ${match.suggestions.join(', ')})`);
});

console.log(`\n❌ NO MATCHES: ${noMatches.length}`);
noMatches.slice(0, 10).forEach(match => {
  console.log(`  ${match.project} → ${match.filename}.png`);
});
if (noMatches.length > 10) {
  console.log(`  ... and ${noMatches.length - 10} more`);
}

// Save results for next step
const results = {
  exactMatches: potentialMatches.filter(m => m.match === 'exact'),
  partialMatches: potentialMatches.filter(m => m.match === 'partial'),
  noMatches: noMatches,
  availableScreenshots
};

fs.writeFileSync('./screenshot-analysis.json', JSON.stringify(results, null, 2));
console.log(`\n💾 Results saved to screenshot-analysis.json`);

