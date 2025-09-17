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

async function processBatch3() {
  console.log('🔧 Processing Batch 3 - Next 10 mismatches...');

  const batch3 = [
    { title: "Hotel M Merignac", correct: "hotelm-merignac.webp", archiveIndex: 80 },
    { title: "Relais Christine", correct: "relaischristine.jpeg", archiveIndex: 81 },
    { title: "Leto Hydra", correct: "letohydra.webp", archiveIndex: 82 },
    { title: "Residence Charles Floquet", correct: "charlesfloquet.jpeg", archiveIndex: 96 },
    { title: "Hotel du Bois", correct: "dubois.jpeg", archiveIndex: 97 },
    { title: "Pine Cay", correct: "pinecay.jpeg", archiveIndex: 116 },
    { title: "Saint James Paris", correct: "saintjamesparis.jpeg", archiveIndex: 121 },
    { title: "Paris Art Hotel", correct: "parisarthotel.jpeg", archiveIndex: 122 },
    { title: "Les Domainesde Fontenille", correct: "lesdomainesdefontenille.jpeg", archiveIndex: 123 },
    { title: "Le M St Germain", correct: "lem.jpeg", archiveIndex: 131 }
  ];

  let processed = 0;
  let updated = 0;
  let failed = 0;

  for (const project of batch3) {
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
      // Get the project ID
      const projects = await client.fetch(`*[_type == 'project' && title == '${project.title}'] { _id }`);
      
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

  console.log(`\n🎉 Batch 3 Complete!`);
  console.log(`   Processed: ${processed}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Failed: ${failed}`);
}

processBatch3();
