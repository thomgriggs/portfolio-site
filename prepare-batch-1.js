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

async function prepareFirstBatch() {
  console.log('📋 Preparing first batch of 10 mismatches...');

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

    const mismatches = [];
    
    sanityProjects.forEach((project, index) => {
      const correctImage = imageMapping[project.title];
      const currentImage = project.images && project.images.length > 0 ? 
        project.images[0].asset.originalFilename : 'No image';
      
      if (correctImage && currentImage !== correctImage) {
        mismatches.push({
          index: index + 1,
          title: project.title,
          current: currentImage,
          correct: correctImage,
          _id: project._id
        });
      }
    });
    
    console.log(`\n🎯 BATCH 1 - First 10 mismatches to fix:`);
    console.log(`Total mismatches found: ${mismatches.length}`);
    console.log(`\n📋 Projects to fix in this batch:`);
    
    const batch1 = mismatches.slice(0, 10);
    batch1.forEach((item, i) => {
      console.log(`\n${i + 1}. ${item.title} (Archive #${item.index})`);
      console.log(`   Current: ${item.current}`);
      console.log(`   Should be: ${item.correct}`);
    });
    
    console.log(`\n❓ Ready to proceed with these 10? (y/n)`);
    
    return batch1;
    
  } catch (error) {
    console.error('❌ Error:', error);
    return null;
  }
}

prepareFirstBatch();
