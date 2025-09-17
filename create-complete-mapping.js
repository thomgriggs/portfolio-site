const fs = require('fs');

// Read available screenshots
const availableScreenshots = fs.readFileSync('available-screenshots.txt', 'utf8')
  .split('\n')
  .filter(name => name.trim())
  .map(name => name.replace('.png', ''));

console.log(`Found ${availableScreenshots.length} available screenshots`);

// Project titles from our earlier list
const projectTitles = [
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

// Function to find best match
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

// Create mapping
const mapping = {};
let matched = 0;
let unmatched = 0;

console.log('\nCreating mapping...\n');

for (const projectTitle of projectTitles) {
  const match = findBestMatch(projectTitle, availableScreenshots);
  if (match) {
    mapping[projectTitle] = match;
    matched++;
    console.log(`✅ ${projectTitle} → ${match}`);
  } else {
    unmatched++;
    console.log(`❌ ${projectTitle} → NO MATCH`);
  }
}

console.log(`\n📊 Results:`);
console.log(`✅ Matched: ${matched}`);
console.log(`❌ Unmatched: ${unmatched}`);
console.log(`📁 Total available: ${availableScreenshots.length}`);

// Generate the mapping object for the component
console.log('\n🔧 Generated mapping object:');
console.log('const screenshotMap = {');
for (const [project, screenshot] of Object.entries(mapping)) {
  console.log(`  '${project}': '${screenshot}',`);
}
console.log('};');

