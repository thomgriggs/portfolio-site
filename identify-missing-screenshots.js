const fs = require('fs');

// Read available screenshots
const availableScreenshots = fs.readFileSync('available-screenshots.txt', 'utf8')
  .split('\n')
  .filter(name => name.trim())
  .map(name => name.replace('.png', ''));

console.log(`📊 Available screenshots: ${availableScreenshots.length}`);

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

// Analyze projects
const projectsWithScreenshots = [];
const projectsWithoutScreenshots = [];

console.log('\n🔍 Analyzing projects...\n');

for (const projectTitle of projectTitles) {
  const match = findBestMatch(projectTitle, availableScreenshots);
  if (match) {
    projectsWithScreenshots.push({ title: projectTitle, screenshot: match });
  } else {
    projectsWithoutScreenshots.push(projectTitle);
  }
}

console.log(`✅ Projects with screenshots: ${projectsWithScreenshots.length}`);
console.log(`❌ Projects without screenshots: ${projectsWithoutScreenshots.length}`);

console.log('\n📋 Projects needing screenshots:');
projectsWithoutScreenshots.forEach((project, index) => {
  console.log(`${index + 1}. ${project}`);
});

console.log('\n🎯 Priority projects for screenshot capture:');
const priorityProjects = projectsWithoutScreenshots.slice(0, 10);
priorityProjects.forEach((project, index) => {
  console.log(`${index + 1}. ${project}`);
});

console.log(`\n📊 Summary:`);
console.log(`- Total projects: ${projectTitles.length}`);
console.log(`- With screenshots: ${projectsWithScreenshots.length} (${Math.round(projectsWithScreenshots.length / projectTitles.length * 100)}%)`);
console.log(`- Without screenshots: ${projectsWithoutScreenshots.length} (${Math.round(projectsWithoutScreenshots.length / projectTitles.length * 100)}%)`);
console.log(`- Available screenshots: ${availableScreenshots.length}`);

