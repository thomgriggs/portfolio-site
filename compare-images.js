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
      // Extract just the filename from the path
      const imageName = path.basename(project.imagePath);
      mapping[project.projectName] = imageName;
    }
  });
  
  return mapping;
}

async function compareImages() {
  console.log('🔍 Comparing JSON file to current Sanity images...');

  try {
    // Load original projects data
    const originalProjects = loadOriginalProjects();
    const imageMapping = createImageMapping(originalProjects);
    
    // Get current Sanity projects in archive order
    const sanityProjects = await client.fetch(`*[_type == 'project'] | order(title asc) {
      _id, title,
      images[] {
        asset->{_ref, _type, url, originalFilename}
      }
    }`);

    console.log(`\n📊 COMPARISON RESULTS:`);
    console.log(`   JSON projects: ${Object.keys(imageMapping).length}`);
    console.log(`   Sanity projects: ${sanityProjects.length}`);
    
    const mismatches = [];
    const matches = [];
    const notFound = [];
    
    sanityProjects.forEach((project, index) => {
      const correctImage = imageMapping[project.title];
      const currentImage = project.images && project.images.length > 0 ? 
        project.images[0].asset.originalFilename : 'No image';
      
      if (!correctImage) {
        notFound.push({
          index: index + 1,
          title: project.title,
          current: currentImage,
          correct: 'Not in JSON'
        });
      } else if (currentImage !== correctImage) {
        mismatches.push({
          index: index + 1,
          title: project.title,
          current: currentImage,
          correct: correctImage
        });
      } else {
        matches.push({
          index: index + 1,
          title: project.title,
          image: currentImage
        });
      }
    });
    
    console.log(`\n✅ MATCHES: ${matches.length}`);
    console.log(`❌ MISMATCHES: ${mismatches.length}`);
    console.log(`❓ NOT FOUND IN JSON: ${notFound.length}`);
    
    console.log(`\n📋 MISMATCHES (first 20):`);
    mismatches.slice(0, 20).forEach(item => {
      console.log(`${item.index}. ${item.title}`);
      console.log(`   Current: ${item.current}`);
      console.log(`   Should be: ${item.correct}`);
      console.log('');
    });
    
    if (mismatches.length > 20) {
      console.log(`... and ${mismatches.length - 20} more mismatches`);
    }
    
    return {
      mismatches,
      matches,
      notFound,
      total: sanityProjects.length
    };
    
  } catch (error) {
    console.error('❌ Error:', error);
    return null;
  }
}

compareImages();
