import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
  projectId: '669ljbt4',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN,
});

// Load the original projects data
function loadOriginalProjects() {
  const jsonPath = path.join(__dirname, '../thomgriggs.com/_js/projects.json');
  const data = fs.readFileSync(jsonPath, 'utf8');
  return JSON.parse(data);
}

// Create mapping from project name to correct image path
function createImageMapping(originalProjects) {
  const mapping = {};
  
  originalProjects.forEach(project => {
    if (project.projectName && project.imagePath) {
      const imageName = path.basename(project.imagePath);
      mapping[project.projectName] = imageName;
    }
  });
  
  return mapping;
}

async function prepareBatch5() {
  console.log('📋 Preparing Batch 5 - Next 10 mismatches...');

  try {
    // Load original projects data
    const originalProjects = loadOriginalProjects();
    const imageMapping = createImageMapping(originalProjects);
    
    // Get current Sanity projects
    const sanityProjects = await client.fetch(`*[_type == 'project'] {
      _id, title,
      images[] {
        asset->{_ref, _type, url, originalFilename}
      }
    }`);

    // Create a lookup map for Sanity projects
    const sanityMap = {};
    sanityProjects.forEach(project => {
      sanityMap[project.title] = project;
    });

    // The correct archive order from your list
    const archiveOrder = [
      "Hotel Palombaggia",
      "Maison Heler", 
      "Optimum RV",
      "1er etage",
      "Alma Hotel",
      "Altai Courchevel",
      "Brasserie Leschenapans",
      "College Hotel",
      "Elysees Union Apartments",
      "Hostellerie Du Lys",
      "The Wall Street Inn",
      "Hotel Parc Montsouris",
      "Hotel Paris Petitlouvre",
      "Hotel Paris Printemps",
      "Hotel WYLD Saint Germain",
      "Hotel Royal St Honore",
      "Hotel Beauregard",
      "Hotel Chateaudeau",
      "Hotel de la Boetie",
      "Hotel Edouard 6",
      "Hotel Sparis Versailles",
      "Hotel Waldorf",
      "Ivi Mare Paphos",
      "Welfi Hospitality",
      "The Augustin",
      "Relais Du Moulin",
      "Paris Hotel Yllen Eiffel",
      "Odeon Hotel",
      "My Home in Paris",
      "Moulin Plaza",
      "Les Maisons de Lea",
      "Legend Beach",
      "Akan Collection",
      "Maison des Armateurs",
      "Tortiniere",
      "Hotels Demeures Historiques",
      "Les Berges de Palombaggia",
      "Maison Heler Metz",
      "thousandhillsresorthotel",
      "Pomeroy Hotel",
      "Cendyn Website",
      "Lyric Hotel Paris",
      "Chateau des Avenieres",
      "Pecora Negra",
      "Chateaula Commaraine",
      "Collection Vesper",
      "Liss Ard Estate",
      "Academie Hotel",
      "Hotel Charlemagne",
      "Grand Barrail",
      "Libert Everdon",
      "Libert Landrellec",
      "Liberte Lacanau",
      "Makass Appart Hotel",
      "Campings Liberte",
      "Hotel Paris Muguet",
      "Hotel Epoque",
      "les Cures Marines",
      "Chateau Apigne",
      "Hotel Florida Paris",
      "Hotel Norman",
      "Hotel le Doge",
      "Valdiski",
      "Malone Hotels",
      "Fourviere Hotel",
      "Hotel Pont Royal",
      "Hotel Des Dunes",
      "Ares Paris Hotel",
      "Gardinier",
      "Hotel Prieure",
      "Hotel Moliere",
      "Chateau de Riell",
      "Le Bois Joli",
      "Paris Hotel Lion",
      "St Mellion Estate",
      "Hotel Grichting",
      "Hotel Golf Chateau De Chailly",
      "Drouant",
      "Hotel Monge",
      "Hotel M Merignac",
      "Relais Christine",
      "Leto Hydra",
      "Hotel Pastel Paris",
      "Chateau de Sainte Feyre",
      "ENV Hair Studio",
      "F and S Framing",
      "Qlik",
      "Brittany & Spa Hotel Restaurant Spa",
      "Hotel Panache",
      "Hotel Donjon Vincennes",
      "Chateau Le Cagnard",
      "Hotel De Re",
      "7 Eiffel Hotel",
      "Eifel Segur",
      "KRS Hotels",
      "Residence Charles Floquet",
      "Hotel du Bois",
      "Hotel Elysees Union",
      "Folkestone Opera",
      "Hotel Washington Opera",
      "Hotel Demeures Historiques",
      "Elysees Ceramic",
      "Mythic Suites",
      "Ecrin Blanc Courchevel",
      "Bernard Loiseau",
      "Montleuri Paris",
      "Moulin Royale",
      "Bloomhouse Hotel Paris",
      "Marguery Villas",
      "Sydney Opera",
      "Montien Hotel",
      "MJ Holidays",
      "Dandy Hotel Paris",
      "Le Millie Rose Hotel Paris",
      "Vendome Opera Hotel",
      "Pine Cay",
      "Pine Cay Properties",
      "Hotel Colisee",
      "Saint James Club",
      "duO Hotel",
      "Saint James Paris",
      "Paris Art Hotel",
      "Les Domainesde Fontenille",
      "369 Hotels  & Maisons",
      "Maison FL",
      "Le Mathurin Hotel & Spa",
      "Aida Hotel Spa",
      "Ballyfin",
      "Relais Bosquet Hotel",
      "Hotel De Lempereur",
      "Le M St Germain",
      "Hotel Central Saint Germain",
      "Cocoon Inn",
      "Cantu di Mare",
      "La Mirande",
      "Bristol",
      "Hotel paris Richmond",
      "Hotel Touraine Opera",
      "Le Bristol Hotel",
      "Le Versailles",
      "Cadran Hotel",
      "Ascot Paris Hotel",
      "Ile de France",
      "Riad Fes",
      "Maison Des Ambassadeurs",
      "Hotel centre Reims",
      "Hotel Les Deux Gares",
      "Auberge Du Pays Retz",
      "Hotel Hermitage",
      "Hotel Grand Parc",
      "Select Hotel",
      "St Delis",
      "Grand Hotel Des Balcons",
      "Fonscolombe",
      "Roosevelt Hotel",
      "Atmospheres Hotel Paris",
      "Chanalai Hotel and Resorts",
      "Hotel Opera Lafayette",
      "Intercontinental Doha The City",
      "Residence Acro Plage",
      "Hotel Central Saint Germain",
      "Villa Abbazia",
      "French Theory",
      "Hotel De L'Etrier",
      "Le Jardin des Douars",
      "Alpen Valley",
      "Hotel Victor Hugo",
      "French Coco Luxury Botique Hotel",
      "Hotel Beaurepaire",
      "Hotel Bienvenue",
      "Le Comptoirdu Caviar",
      "BHF Paris",
      "Auberge Du Jeu De Paume Chantilly",
      "2L Collection",
      "Ecrin Blanc",
      "La Chambre Du Marais",
      "King Jason Paphos",
      "Hotel Arcadie",
      "Louis IVI Mare",
      "King Jason Protaras",
      "Marceau Champs-Elysees",
      "Benvengudo",
      "Tobira",
      "Ter Elst",
      "Hotel Londra Palace",
      "The Royal Apollonia",
      "Hotel Opera D'Antin",
      "Serge Vieira",
      "Villa Des Orangers",
      "Suit Case Best Western",
      "Hotel Saint Marc",
      "Chateau De Mercues",
      "Maisons Taillevent Paris",
      "Manoir de Lan Kerellec",
      "Harmony Spa Budapest",
      "Capsis Elite Resort",
      "Hotel Petit Paris",
      "Off Paris Siene",
      "Hotel X Toronto",
      "La Comtesse",
      "Hotel Exquis Paris",
      "Hotel Felicien Paris",
      "Handsome Hotel paris",
      "Hotel La Parizienne",
      "Bob Hotel Paris",
      "Hotel Crayon",
      "Hotel Crayon Rouge",
      "Legend Hotel Paris",
      "Hotel Odyssey Paris",
      "Aria Hotel Budapest",
      "Hotel Champerret Elysees",
      "Hotel Dauphine St Germain",
      "Casablanca Hotel",
      "Elysee Hotel",
      "Hotel Giraffe",
      "Duna Park Milfontes",
      "Snob Hotel Paris",
      "Villathena",
      "Malcom & Barret Hotel and Bar",
      "Vintage Hotel",
      "Villas Le Barone",
      "Library Hotel",
      "Hotel Emile",
      "Le Bellechasse Saint Germain",
      "La Maison Champs Elysees",
      "Mercure Cantania Excelsior",
      "Hotel Saintgregoire",
      "L'Imprimerie Hotel",
      "Hotel Henry IV",
      "Hotel Clement",
      "Terra Place",
      "Duna Park Beach Club",
      "Auberge De La Source",
      "Quay Perth",
      "Dun Parque Alentejo Star Hotel",
      "Duna Park HS Milfontes Beach",
      "Duna Park Mimi",
      "Duna Park Moinho Da Asneira",
      "Duna Park Quinta Da Samoqueirinha",
      "Duna Park Unique Apartments",
      "The Suncliff Seafront Hotel by Oceana",
      "Hotel Lautrec Opera",
      "Le Petit Coq Aux Champs",
      "Ferme Saint Simeon",
      "Le Saint Hotel Paris",
      "Louis St Elias Resort",
      "Privilege Toulouse",
      "Mercure",
      "Hotel Mermoz",
      "Hotel Le Lavoisier",
      "Safari Tours",
      "The Palm Seychelles",
      "Hotel Longchamp Elysees",
      "Elegancia Hotels",
      "Hotel de Suez"
    ];

    const mismatches = [];
    
    // Check each project in the correct archive order
    archiveOrder.forEach((title, index) => {
      const project = sanityMap[title];
      if (project) {
        const correctImage = imageMapping[title];
        const currentImage = project.images && project.images.length > 0 ? 
          project.images[0].asset.originalFilename : 'No image';
        
        if (correctImage && currentImage !== correctImage) {
          mismatches.push({
            archiveIndex: index + 1,
            title: title,
            current: currentImage,
            correct: correctImage,
            _id: project._id
          });
        }
      }
    });
    
    console.log(`\n🎯 BATCH 5 - Next 10 mismatches in CORRECT archive order:`);
    console.log(`Total mismatches found: ${mismatches.length}`);
    console.log(`\n📋 Projects to fix in this batch (41-50):`);
    
    const batch5 = mismatches.slice(40, 50);
    batch5.forEach((item, i) => {
      console.log(`\n${i + 1}. ${item.title} (Archive #${item.archiveIndex})`);
      console.log(`   Current: ${item.current}`);
      console.log(`   Should be: ${item.correct}`);
    });
    
    console.log(`\n❓ Ready to proceed with these 10? (y/n)`);
    
    return batch5;
    
  } catch (error) {
    console.error('❌ Error:', error);
    return null;
  }
}

prepareBatch5();
