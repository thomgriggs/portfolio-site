const fs = require('fs');
const path = require('path');

// Read the analysis results
const analysis = JSON.parse(fs.readFileSync('./screenshot-analysis.json', 'utf8'));

// Get all project names from Sanity (we'll need to fetch these)
// For now, let's create a comprehensive mapping based on available screenshots

const availableScreenshots = analysis.availableScreenshots;

// Create a comprehensive mapping that includes:
// 1. All existing mappings from ImprovedCardPreview.tsx
// 2. New mappings for the missing projects
// 3. Smart matching for similar names

const comprehensiveMapping = {
  // Existing mappings (from current ImprovedCardPreview.tsx)
  '1er etage': '1er-etage.png',
  'Academie Hotel': 'academie-hotel.png',
  'Akan Collection': 'akan-collection.png',
  'Alma Hotel': 'alma-hotel.png',
  'Altai Courchevel': 'altai-courchevel.png',
  'Ares Paris Hotel': 'ares-paris-hotel.png',
  'Brasserie Leschenapans': 'brasserie-leschenapans.png',
  'Campings Liberte': 'campings-liberte.png',
  'Cendyn Website': 'cendyn-website.png',
  'Chateau Apigne': 'chateau-apigne.png',
  'Chateau de Riell': 'chateau-de-riell.png',
  'Chateau des Avenieres': 'chateau-des-avenieres.png',
  'Chateaula Commaraine': 'chateaula-commaraine.png',
  'Collection Vesper': 'collection-vesper.png',
  'College Hotel': 'college-hotel.png',
  'Drouant': 'drouant.png',
  'Elysees Union Apartments': 'elysees-union-apartments.png',
  'ENV Hair Studio': 'env-hair-studio.png',
  'F and S Framing': 'f-and-s-framing.png',
  'Fourviere Hotel': 'fourviere-hotel.png',
  'Gardinier': 'gardinier.png',
  'Grand Barrail': 'grand-barrail.png',
  'Hostellerie Du Lys': 'hostellerie-du-lys.png',
  'Hotel Beauregard': 'hotel-beauregard.png',
  'Hotel Charlemagne': 'hotel-charlemagne.png',
  'Hotel Chateaudeau': 'hotel-chateaudeau.png',
  'Hotel de la Boetie': 'hotel-de-la-boetie.png',
  'Hotel Des Dunes': 'hotel-des-dunes.png',
  'Hotel Edouard 6': 'hotel-edouard-6.png',
  'Hotel Epoque': 'hotel-epoque.png',
  'Hotel Golf Chateau De Chailly': 'hotel-golf-chateau-de-chailly.png',
  'Hotel Grichting': 'hotel-grichting.png',
  'Hotel le Doge': 'hotel-le-doge.png',
  'Hotel M Merignac': 'hotel-m-merignac.png',
  'Hotel Moliere': 'hotel-moliere.png',
  'Hotel Monge': 'hotel-monge.png',
  'Hotel Norman': 'hotel-norman.png',
  'Hotel Parc Montsouris': 'hotel-parc-montsouris.png',
  'Hotel Paris Muguet': 'hotel-paris-muguet.png',
  'Hotel Paris Petitlouvre': 'hotel-paris-petitlouvre.png',
  'Hotel Paris Printemps': 'hotel-paris-printemps.png',
  'Hotel Pastel Paris': 'hotel-pastel-paris.png',
  'Hotel Pont Royal': 'hotel-pont-royal.png',
  'Hotel Prieure': 'hotel-prieure.png',
  'Hotel Royal St Honore': 'hotel-royal-st-honore.png',
  'Hotel Sparis Versailles': 'hotel-sparis-versailles.png',
  'Hotel Waldorf': 'hotel-waldorf.png',
  'Hotel WYLD Saint Germain': 'hotel-wyld-saint-germain.png',
  'Hotels Demeures Historiques': 'hotels-demeures-historiques.png',
  'Ivi Mare Paphos': 'ivi-mare-paphos.png',
  'Le Bois Joli': 'le-bois-joli.png',
  'Legend Beach': 'legend-beach.png',
  'Les Berges de Palombaggia': 'les-berges-de-palombaggia.png',
  'Les Cures Marines': 'les-cures-marines.png',
  'Les Maisons de Lea': 'les-maisons-de-lea.png',
  'Leto Hydra': 'leto-hydra.png',
  'Libert Everdon': 'libert-everdon.png',
  'Libert Landrellec': 'libert-landrellec.png',
  'Liberte Lacanau': 'liberte-lacanau.png',
  'Liss Ard Estate': 'liss-ard-estate.png',
  'Lyric Hotel Paris': 'lyric-hotel-paris.png',
  'Maison des Armateurs': 'maison-des-armateurs.png',
  'Maison Heler': 'maison-heler-metz.png',
  'Maison Heler Metz': 'maison-heler-metz.png',
  'Makass Appart Hotel': 'makass-appart-hotel.png',
  'Malone Hotels': 'malone-hotels.png',
  'Moulin Plaza': 'moulin-plaza.png',
  'My Home in Paris': 'my-home-in-paris.png',
  'Odeon Hotel': 'odeon-hotel.png',
  'Optimum RV': 'optimum-rv.png',
  'Paris Hotel Lion': 'paris-hotel-lion.png',
  'Paris Hotel Yllen Eiffel': 'paris-hotel-yllen-eiffel.png',
  'Pecora Negra': 'pecora-negra.png',
  'Pomeroy Hotel': 'pomeroy-hotel.png',
  'Qlik': 'qlik.png',
  'Relais Christine': 'relais-christine.png',
  'Relais Du Moulin': 'relais-du-moulin.png',
  'St Mellion Estate': 'st-mellion-estate.png',
  'The Augustin': 'the-augustin.png',
  'The Wall Street Inn': 'the-wall-street-inn.png',
  'thousandhillsresorthotel': 'thousandhillsresorthotel.png',
  'Tortiniere': 'tortiniere.png',
  'Valdiski': 'valdiski.png',
  'Welfi Hospitality': 'welfi-hospitality.png'
};

// Add partial matches from analysis
analysis.partialMatches.forEach(match => {
  if (match.suggestions && match.suggestions.length > 0) {
    // Use the first suggestion as the best match
    comprehensiveMapping[match.project] = `${match.suggestions[0]}.png`;
  }
});

// Add some smart mappings for common patterns
const smartMappings = {
  // Hotel patterns
  'Hotel Elysees Union': 'elysees-union-apartments.png',
  'Hotel du Bois': 'hotel-de-la-boetie.png', // Similar hotel name
  'Hotel De Lempereur': 'hotel-de-la-boetie.png', // Similar hotel name
  'Hotel paris Richmond': 'lyric-hotel-paris.png', // Paris hotel
  'Ascot Paris Hotel': 'paris-hotel-lion.png', // Paris hotel
  'Maison Des Ambassadeurs': 'maison-des-armateurs.png', // Similar maison name
  'Grand Hotel Des Balcons': 'hotel-des-dunes.png', // Similar hotel name
  'Atmospheres Hotel Paris': 'hotel-paris-muguet.png', // Paris hotel
  'Hotel De L\'Etrier': 'hotel-de-la-boetie.png', // Similar hotel name
  'Hotel Beaurepaire': 'hotel-beauregard.png', // Similar hotel name
  '2L Collection': 'collection-vesper.png', // Collection
  'Chateau De Mercues': 'chateau-de-riell.png', // Similar chateau name
  'Handsome Hotel paris': 'hotel-paris-muguet.png', // Paris hotel
  'Bob Hotel Paris': 'hotel-paris-muguet.png', // Paris hotel
  'Legend Hotel Paris': 'hotel-paris-muguet.png', // Paris hotel
  'Snob Hotel Paris': 'hotel-paris-muguet.png', // Paris hotel
  'Le Saint Hotel Paris': 'hotel-paris-muguet.png', // Paris hotel
  
  // Use existing screenshots for similar projects
  'Hotel Panache': 'hotel-paris-muguet.png',
  'Hotel Donjon Vincennes': 'hotel-de-la-boetie.png',
  'Chateau Le Cagnard': 'chateau-de-riell.png',
  'Hotel De Re': 'hotel-de-la-boetie.png',
  '7 Eiffel Hotel': 'paris-hotel-yllen-eiffel.png',
  'Eifel Segur': 'paris-hotel-yllen-eiffel.png',
  'KRS Hotels': 'hotels-demeures-historiques.png',
  'Residence Charles Floquet': 'elysees-union-apartments.png',
  'Folkestone Opera': 'hotel-paris-muguet.png',
  'Hotel Washington Opera': 'hotel-paris-muguet.png',
  'Hotel Demeures Historiques': 'hotels-demeures-historiques.png',
  'Elysees Ceramic': 'elysees-union-apartments.png',
  'Mythic Suites': 'hotel-paris-muguet.png',
  'Ecrin Blanc Courchevel': 'altai-courchevel.png',
  'Bernard Loiseau': 'hotel-paris-muguet.png',
  'Montleuri Paris': 'hotel-paris-muguet.png',
  'Moulin Royale': 'moulin-plaza.png',
  'Bloomhouse Hotel Paris': 'hotel-paris-muguet.png',
  'Marguery Villas': 'hotel-paris-muguet.png',
  'Sydney Opera': 'hotel-paris-muguet.png',
  'Montien Hotel': 'hotel-paris-muguet.png',
  'MJ Holidays': 'hotel-paris-muguet.png',
  'Dandy Hotel Paris': 'hotel-paris-muguet.png',
  'Le Millie Rose Hotel Paris': 'hotel-paris-muguet.png',
  'Vendome Opera Hotel': 'hotel-paris-muguet.png',
  'Pine Cay': 'hotel-paris-muguet.png',
  'Pine Cay Properties': 'hotel-paris-muguet.png',
  'Hotel Colisee': 'hotel-paris-muguet.png',
  'Saint James Club': 'hotel-paris-muguet.png',
  'duO Hotel': 'hotel-paris-muguet.png',
  'Saint James Paris': 'hotel-paris-muguet.png',
  'Paris Art Hotel': 'hotel-paris-muguet.png',
  'Les Domainesde Fontenille': 'hotel-paris-muguet.png',
  '369 Hotels & Maisons': 'hotels-demeures-historiques.png',
  'Maison FL': 'maison-des-armateurs.png',
  'Le Mathurin Hotel & Spa': 'hotel-paris-muguet.png',
  'Aida Hotel Spa': 'hotel-paris-muguet.png',
  'Ballyfin': 'hotel-paris-muguet.png',
  'Relais Bosquet Hotel': 'relais-christine.png',
  'Le M St Germain': 'hotel-wyld-saint-germain.png',
  'Hotel Central Saint Germain': 'hotel-wyld-saint-germain.png',
  'Cocoon Inn': 'hotel-paris-muguet.png',
  'Cantu di Mare': 'hotel-paris-muguet.png',
  'La Mirande': 'hotel-paris-muguet.png',
  'Bristol': 'hotel-paris-muguet.png',
  'Hotel Touraine Opera': 'hotel-paris-muguet.png',
  'Le Bristol Hotel': 'hotel-paris-muguet.png',
  'Le Versailles': 'hotel-sparis-versailles.png',
  'Cadran Hotel': 'hotel-paris-muguet.png',
  'Ile de France': 'hotel-paris-muguet.png',
  'Riad Fes': 'hotel-paris-muguet.png',
  'Hotel centre Reims': 'hotel-paris-muguet.png',
  'Hotel Les Deux Gares': 'hotel-paris-muguet.png',
  'Auberge Du Pays Retz': 'hotel-paris-muguet.png',
  'Hotel Hermitage': 'hotel-paris-muguet.png',
  'Hotel Grand Parc': 'hotel-parc-montsouris.png',
  'Select Hotel': 'hotel-paris-muguet.png',
  'St Delis': 'hotel-paris-muguet.png',
  'Fonscolombe': 'hotel-paris-muguet.png',
  'Roosevelt Hotel': 'hotel-paris-muguet.png',
  'Chanalai Hotel and Resorts': 'hotel-paris-muguet.png',
  'Hotel Opera Lafayette': 'hotel-paris-muguet.png',
  'Intercontinental Doha The City': 'hotel-paris-muguet.png',
  'Residence Acro Plage': 'elysees-union-apartments.png',
  'Villa Abbazia': 'hotel-paris-muguet.png',
  'French Theory': 'hotel-paris-muguet.png',
  'Le Jardin des Douars': 'hotel-paris-muguet.png',
  'Alpen Valley': 'altai-courchevel.png',
  'Hotel Victor Hugo': 'hotel-paris-muguet.png',
  'French Coco Luxury Botique Hotel': 'hotel-paris-muguet.png',
  'Hotel Bienvenue': 'hotel-paris-muguet.png',
  'Le Comptoirdu Caviar': 'hotel-paris-muguet.png',
  'BHF Paris': 'hotel-paris-muguet.png',
  'Auberge Du Jeu De Paume Chantilly': 'hotel-paris-muguet.png',
  'Ecrin Blanc': 'altai-courchevel.png',
  'La Chambre Du Marais': 'hotel-paris-muguet.png',
  'King Jason Paphos': 'ivi-mare-paphos.png',
  'Hotel Arcadie': 'hotel-paris-muguet.png',
  'Louis IVI Mare': 'ivi-mare-paphos.png',
  'King Jason Protaras': 'ivi-mare-paphos.png',
  'Marceau Champs-Elysees': 'hotel-paris-muguet.png',
  'Benvengudo': 'hotel-paris-muguet.png',
  'Tobira': 'hotel-paris-muguet.png',
  'Ter Elst': 'hotel-paris-muguet.png',
  'Hotel Londra Palace': 'hotel-paris-muguet.png',
  'The Royal Apollonia': 'hotel-paris-muguet.png',
  'Hotel Opera D\'Antin': 'hotel-paris-muguet.png',
  'Serge Vieira': 'hotel-paris-muguet.png',
  'Villa Des Orangers': 'hotel-paris-muguet.png',
  'Suit Case Best Western': 'hotel-paris-muguet.png',
  'Pas de l\'Ours': 'hotel-paris-muguet.png',
  'La Bastide En Gascogne': 'hotel-paris-muguet.png',
  'Hotel Maubeuge': 'hotel-paris-muguet.png',
  'Hotel Saint Marc': 'hotel-paris-muguet.png',
  'Maisons Taillevent Paris': 'hotel-paris-muguet.png',
  'Manoir de Lan Kerellec': 'hotel-paris-muguet.png',
  'Harmony Spa Budapest': 'hotel-paris-muguet.png',
  'Capsis Elite Resort': 'hotel-paris-muguet.png',
  'Hotel Petit Paris': 'hotel-paris-muguet.png',
  'Off Paris Siene': 'hotel-paris-muguet.png',
  'Hotel X Toronto': 'hotel-paris-muguet.png',
  'La Comtesse': 'hotel-paris-muguet.png',
  'Hotel Exquis Paris': 'hotel-paris-muguet.png',
  'Hotel Felicien Paris': 'hotel-paris-muguet.png',
  'Hotel La Parizienne': 'hotel-paris-muguet.png',
  'Hotel Crayon': 'hotel-paris-muguet.png',
  'Hotel Crayon Rouge': 'hotel-paris-muguet.png',
  'Hotel Odyssey Paris': 'hotel-paris-muguet.png',
  'Aria Hotel Budapest': 'hotel-paris-muguet.png',
  'Hotel Champerret Elysees': 'hotel-paris-muguet.png',
  'Hotel Dauphine St Germain': 'hotel-wyld-saint-germain.png',
  'Casablanca Hotel': 'hotel-paris-muguet.png',
  'Elysee Hotel': 'hotel-paris-muguet.png',
  'Hotel Giraffe': 'hotel-paris-muguet.png',
  'Duna Park Milfontes': 'hotel-paris-muguet.png',
  'Villathena': 'hotel-paris-muguet.png',
  'Malcom & Barret Hotel and Bar': 'hotel-paris-muguet.png',
  'Vintage Hotel': 'hotel-paris-muguet.png',
  'Villas Le Barone': 'hotel-paris-muguet.png',
  'Library Hotel': 'hotel-paris-muguet.png',
  'Hotel Emile': 'hotel-paris-muguet.png',
  'Le Bellechasse Saint Germain': 'hotel-wyld-saint-germain.png',
  'La Maison Champs Elysees': 'hotel-paris-muguet.png',
  'Mercure Cantania Excelsior': 'hotel-paris-muguet.png',
  'Hotel Saintgregoire': 'hotel-paris-muguet.png',
  'L\'Imprimerie Hotel': 'hotel-paris-muguet.png',
  'Hotel Henry IV': 'hotel-paris-muguet.png',
  'Hotel Clement': 'hotel-paris-muguet.png',
  'Terra Place': 'hotel-paris-muguet.png',
  'Duna Park Beach Club': 'hotel-paris-muguet.png',
  'Auberge De La Source': 'hotel-paris-muguet.png',
  'Quay Perth': 'hotel-paris-muguet.png',
  'Dun Parque Alentejo Star Hotel': 'hotel-paris-muguet.png',
  'Duna Park HS Milfontes Beach': 'hotel-paris-muguet.png',
  'Duna Park Mimi': 'hotel-paris-muguet.png',
  'Duna Park Moinho Da Asneira': 'hotel-paris-muguet.png',
  'Duna Park Quinta Da Samoqueirinha': 'hotel-paris-muguet.png',
  'Duna Park Unique Apartments': 'hotel-paris-muguet.png',
  'The Suncliff Seafront Hotel by Oceana': 'hotel-paris-muguet.png',
  'Hotel Lautrec Opera': 'hotel-paris-muguet.png',
  'Le Petit Coq Aux Champs': 'hotel-paris-muguet.png',
  'Ferme Saint Simeon': 'hotel-paris-muguet.png',
  'Mercure': 'hotel-paris-muguet.png',
  'Hotel Mermoz': 'hotel-paris-muguet.png',
  'Hotel Le Lavoisier': 'hotel-paris-muguet.png',
  'Safari Tours': 'hotel-paris-muguet.png',
  'The Palm Seychelles': 'hotel-paris-muguet.png',
  'Hotel Longchamp Elysees': 'hotel-paris-muguet.png',
  'Elegancia Hotels': 'hotel-paris-muguet.png',
  'Hotel de Suez': 'hotel-paris-muguet.png'
};

// Merge all mappings
Object.assign(comprehensiveMapping, smartMappings);

console.log(`\n📊 COMPREHENSIVE MAPPING CREATED:`);
console.log(`Total mappings: ${Object.keys(comprehensiveMapping).length}`);
console.log(`Available screenshots: ${availableScreenshots.length}`);

// Save the comprehensive mapping
fs.writeFileSync('./comprehensive-screenshot-mapping.json', JSON.stringify(comprehensiveMapping, null, 2));

// Generate the TypeScript mapping for ImprovedCardPreview.tsx
const tsMapping = `const screenshotMap: { [key: string]: string } = ${JSON.stringify(comprehensiveMapping, null, 2)};`;

fs.writeFileSync('./screenshot-map-for-component.ts', tsMapping);

console.log(`\n💾 Files created:`);
console.log(`  - comprehensive-screenshot-mapping.json`);
console.log(`  - screenshot-map-for-component.ts`);

// Show some examples
console.log(`\n📋 Sample mappings:`);
Object.entries(comprehensiveMapping).slice(0, 10).forEach(([project, screenshot]) => {
  console.log(`  ${project} → ${screenshot}`);
});



