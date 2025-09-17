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

// Helper function to find the actual image path
function findImagePath(imageName) {
  const imagesDir = path.join(__dirname, 'apps/site/public/images');
  
  function searchDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      
      if (fs.statSync(fullPath).isDirectory()) {
        const result = searchDirectory(fullPath);
        if (result) return result;
      } else if (item === imageName) {
        return path.relative(path.join(__dirname, 'apps/site/public/images'), fullPath);
      }
    }
    
    return null;
  }
  
  return searchDirectory(imagesDir);
}

async function uploadImageToSanity(imagePath) {
  try {
    const fullPath = path.join(__dirname, 'apps/site/public/images', imagePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`❌ Image not found: ${fullPath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const filename = path.basename(imagePath);
    
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
    });
    
    return asset;
  } catch (error) {
    console.error(`❌ Error uploading ${imagePath}:`, error);
    return null;
  }
}

async function updateProjectWithImage(projectId, asset) {
  try {
    const result = await client
      .patch(projectId)
      .set({
        'images': [{
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        }]
      })
      .commit();
    
    return result;
  } catch (error) {
    console.error(`❌ Error updating project ${projectId}:`, error);
    return null;
  }
}

async function processBatch4() {
  console.log('🔧 Processing Batch 4 - Next 10 mismatches...');

  const batch4 = [
    { title: "Hotel Londra Palace", correct: "londrapalace.jpeg", archiveIndex: 185 },
    { title: "The Royal Apollonia", correct: "royalapollonia.jpeg", archiveIndex: 186 },
    { title: "Hotel Opera D'Antin", correct: "operadantin.jpeg", archiveIndex: 187 },
    { title: "Villa Des Orangers", correct: "villadesorangers.jpeg", archiveIndex: 189 },
    { title: "Suit Case Best Western", correct: "suitcase.jpeg", archiveIndex: 190 },
    { title: "Hotel Saint Marc", correct: "hotelsaintmarc.jpeg", archiveIndex: 194 },
    { title: "Manoir de Lan Kerellec", correct: "manoirdelankerellec.jpeg", archiveIndex: 197 },
    { title: "Hotel Petit Paris", correct: "petitparis.jpeg", archiveIndex: 200 },
    { title: "Malcom & Barret Hotel and Bar", correct: "malcombarret.jpeg", archiveIndex: 222 },
    { title: "Villas Le Barone", correct: "villaslebarone.jpeg", archiveIndex: 224 }
  ];

  let processed = 0;
  let updated = 0;
  let failed = 0;

  for (const project of batch4) {
    processed++;
    console.log(`\n📋 Processing ${processed}/10: ${project.title} (Archive #${project.archiveIndex})`);
    
    // Find the correct image path
    const imagePath = findImagePath(project.correct);
    
    if (!imagePath) {
      console.log(`❌ Image file not found: ${project.correct}`);
      failed++;
      continue;
    }
    
    console.log(`   🎯 Found image: ${imagePath}`);
    
    // Upload the correct image
    const asset = await uploadImageToSanity(imagePath);
    
    if (asset) {
      // Get the project ID - escape single quotes in project titles
      const escapedTitle = project.title.replace(/'/g, "\\'");
      const projects = await client.fetch(`*[_type == 'project' && title == '${escapedTitle}'] { _id }`);
      
      if (projects.length > 0) {
        // Update the project with the correct image
        await updateProjectWithImage(projects[0]._id, asset);
        console.log(`   ✅ Updated with: ${asset.originalFilename}`);
        updated++;
      } else {
        console.log(`   ❌ Project not found in Sanity`);
        failed++;
      }
    } else {
      console.log(`   ❌ Failed to upload image`);
      failed++;
    }
    
    // Measured pause between each project
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(`\n🎉 Batch 4 Complete!`);
  console.log(`   Processed: ${processed}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Failed: ${failed}`);
}

processBatch4();
