const fs = require('fs');

// Read available screenshots
const availableScreenshots = fs.readFileSync('available_screenshots.txt', 'utf8')
  .trim()
  .split('\n')
  .filter(name => name.length > 0);

console.log(`Found ${availableScreenshots.length} available screenshots`);

// Create a comprehensive mapping
const createMapping = () => {
  const mapping = {};
  
  // Direct name mappings (exact matches)
  const directMappings = {
    '1er etage': '1er-etage',
    'Academie Hotel': 'academie-hotel',
    'Akan Collection': 'akan-collection',
    'Alma Hotel': 'alma-hotel',
    'Altai Courchevel': 'altai-courchevel',
    'Ares Paris Hotel': 'ares-paris-hotel',
    'Brasserie Leschenapans': 'brasserie-leschenapans',
    'Campings Liberte': 'campings-liberte',
    'Cendyn Website': 'cendyn-website',
    'Chateau Apigne': 'chateau-apigne',
    'Chateau de Riell': 'chateau-de-riell',
    'Chateau des Avenieres': 'chateau-des-avenieres',
    'Chateaula Commaraine': 'chateaula-commaraine',
    'Collection Vesper': 'collection-vesper',
    'College Hotel': 'college-hotel',
    'Drouant': 'drouant',
    'Elysees Union Apartments': 'elysees-union-apartments',
    'ENV Hair Studio': 'env-hair-studio',
    'F and S Framing': 'f-and-s-framing',
    'Fourviere Hotel': 'fourviere-hotel',
    'Gardinier': 'gardinier',
    'Grand Barrail': 'grand-barrail',
    'Hostellerie Du Lys': 'hostellerie-du-lys',
    'Hotel Beauregard': 'hotel-beauregard',
    'Hotel Charlemagne': 'hotel-charlemagne',
    'Hotel Chateaudeau': 'hotel-chateaudeau',
    'Hotel de la Boetie': 'hotel-de-la-boetie',
    'Hotel Des Dunes': 'hotel-des-dunes',
    'Hotel Edouard 6': 'hotel-edouard-6',
    'Hotel Epoque': 'hotel-epoque',
    'Hotel Golf Chateau De Chailly': 'hotel-golf-chateau-de-chailly',
    'Hotel Grichting': 'hotel-grichting',
    'Hotel le Doge': 'hotel-le-doge',
    'Hotel M Merignac': 'hotel-m-merignac',
    'Hotel Moliere': 'hotel-moliere',
    'Hotel Monge': 'hotel-monge',
    'Hotel Norman': 'hotel-norman',
    'Hotel Parc Montsouris': 'hotel-parc-montsouris',
    'Hotel Paris Muguet': 'hotel-paris-muguet',
    'Hotel Paris Petitlouvre': 'hotel-paris-petitlouvre',
    'Hotel Paris Printemps': 'hotel-paris-printemps',
    'Hotel Pastel Paris': 'hotel-pastel-paris',
    'Hotel Pont Royal': 'hotel-pont-royal',
    'Hotel Prieure': 'hotel-prieure',
    'Hotel Royal St Honore': 'hotel-royal-st-honore',
    'Hotel Sparis Versailles': 'hotel-sparis-versailles',
    'Hotel Waldorf': 'hotel-waldorf',
    'Hotel WYLD Saint Germain': 'hotel-wyld-saint-germain',
    'Hotels Demeures Historiques': 'hotels-demeures-historiques',
    'Ivi Mare Paphos': 'ivi-mare-paphos',
    'Le Bois Joli': 'le-bois-joli',
    'Legend Beach': 'legend-beach',
    'Les Berges de Palombaggia': 'les-berges-de-palombaggia',
    'Les Cures Marines': 'les-cures-marines',
    'Les Maisons de Lea': 'les-maisons-de-lea',
    'Leto Hydra': 'leto-hydra',
    'Libert Everdon': 'libert-everdon',
    'Libert Landrellec': 'libert-landrellec',
    'Liberte Lacanau': 'liberte-lacanau',
    'Liss Ard Estate': 'liss-ard-estate',
    'Lyric Hotel Paris': 'lyric-hotel-paris',
    'Maison des Armateurs': 'maison-des-armateurs',
    'Maison Heler': 'maison-heler-metz',
    'Maison Heler Metz': 'maison-heler-metz',
    'Makass Appart Hotel': 'makass-appart-hotel',
    'Malone Hotels': 'malone-hotels',
    'Moulin Plaza': 'moulin-plaza',
    'My Home in Paris': 'my-home-in-paris',
    'Odeon Hotel': 'odeon-hotel',
    'Optimum RV': 'optimum-rv',
    'Paris Hotel Lion': 'paris-hotel-lion',
    'Paris Hotel Yllen Eiffel': 'paris-hotel-yllen-eiffel',
    'Pecora Negra': 'pecora-negra',
    'Pomeroy Hotel': 'pomeroy-hotel',
    'Qlik': 'qlik',
    'Relais Christine': 'relais-christine',
    'Relais Du Moulin': 'relais-du-moulin',
    'St Mellion Estate': 'st-mellion-estate',
    'The Augustin': 'the-augustin',
    'The Wall Street Inn': 'the-wall-street-inn',
    'thousandhillsresorthotel': 'thousandhillsresorthotel',
    'Tortiniere': 'tortiniere',
    'Valdiski': 'valdiski',
    'Welfi Hospitality': 'welfi-hospitality'
  };

  // Add direct mappings
  Object.entries(directMappings).forEach(([projectName, screenshotName]) => {
    if (availableScreenshots.includes(screenshotName)) {
      mapping[projectName] = screenshotName;
    }
  });

  // Fuzzy matching for remaining projects
  const remainingScreenshots = availableScreenshots.filter(screenshot => 
    !Object.values(mapping).includes(screenshot)
  );

  console.log(`\nDirect mappings: ${Object.keys(mapping).length}`);
  console.log(`Remaining screenshots: ${remainingScreenshots.length}`);

  // Try to match remaining screenshots with common patterns
  remainingScreenshots.forEach(screenshot => {
    // Convert screenshot name to potential project name
    const potentialProjectName = screenshot
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    
    // Add if it looks like a reasonable match
    if (potentialProjectName.length > 3) {
      mapping[potentialProjectName] = screenshot;
    }
  });

  return mapping;
};

const mapping = createMapping();

console.log(`\nTotal mappings created: ${Object.keys(mapping).length}`);

// Generate the mapping object for the component
const generateMappingCode = () => {
  let code = 'const screenshotMap: { [key: string]: string } = {\n';
  
  Object.entries(mapping).forEach(([projectName, screenshotName]) => {
    code += `  '${projectName}': '${screenshotName}.png',\n`;
  });
  
  code += '};';
  
  return code;
};

const mappingCode = generateMappingCode();

// Write to file
fs.writeFileSync('complete_screenshot_mapping.js', mappingCode);

console.log('\n✅ Complete mapping generated!');
console.log('📁 Saved to: complete_screenshot_mapping.js');
console.log(`\n📊 Summary:`);
console.log(`- Total screenshots available: ${availableScreenshots.length}`);
console.log(`- Mappings created: ${Object.keys(mapping).length}`);
console.log(`- Coverage: ${Math.round((Object.keys(mapping).length / availableScreenshots.length) * 100)}%`);

// Show some examples
console.log('\n🔍 Sample mappings:');
Object.entries(mapping).slice(0, 10).forEach(([project, screenshot]) => {
  console.log(`  "${project}" → "${screenshot}.png"`);
});

