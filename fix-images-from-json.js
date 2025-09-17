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

async function fixImagesFromOriginalData() {
  console.log('🔧 Fixing images using original thomgriggs.com data...');

  try {
    // Load original projects data
    const originalProjects = loadOriginalProjects();
    console.log(`📁 Loaded ${originalProjects.length} original projects`);
    
    // Create image mapping
    const imageMapping = createImageMapping(originalProjects);
    console.log(`📋 Created mapping for ${Object.keys(imageMapping).length} projects`);
    
    // Get current Sanity projects
    const sanityProjects = await client.fetch(`*[_type == 'project'] | order(title asc) {
      _id, title,
      images[] {
        asset->{_ref, _type, url, originalFilename}
      }
    }`);

    console.log(`📋 Found ${sanityProjects.length} Sanity projects`);

    let processed = 0;
    let updated = 0;
    let skipped = 0;
    let notFound = 0;

    // Process in small batches
    const batchSize = 10;
    const totalBatches = Math.ceil(sanityProjects.length / batchSize);
    
    for (let batch = 0; batch < totalBatches; batch++) {
      const startIndex = batch * batchSize;
      const endIndex = Math.min(startIndex + batchSize, sanityProjects.length);
      const batchProjects = sanityProjects.slice(startIndex, endIndex);
      
      console.log(`\n🔄 Processing batch ${batch + 1}/${totalBatches} (projects ${startIndex + 1}-${endIndex})`);
      
      for (const project of batchProjects) {
        processed++;
        
        // Check if we have the correct image mapping
        const correctImageName = imageMapping[project.title];
        
        if (!correctImageName) {
          console.log(`⏭️  No mapping found for: ${project.title}`);
          notFound++;
          continue;
        }
        
        // Check current image
        const currentImage = project.images && project.images.length > 0 ? 
          project.images[0].asset.originalFilename : null;
        
        if (currentImage === correctImageName) {
          console.log(`✅ ${project.title}: Already correct (${currentImage})`);
          skipped++;
          continue;
        }
        
        console.log(`📋 Fixing ${project.title}: ${currentImage || 'No image'} → ${correctImageName}`);
        
        // Find the correct image path
        const imagePath = findImagePath(correctImageName);
        
        if (!imagePath) {
          console.log(`❌ Image file not found: ${correctImageName}`);
          notFound++;
          continue;
        }
        
        // Upload the correct image
        const asset = await uploadImageToSanity(imagePath);
        
        if (asset) {
          // Update the project with the correct image
          await updateProjectWithImage(project._id, asset);
          console.log(`   ✅ Updated with: ${asset.originalFilename}`);
          updated++;
        } else {
          console.log(`   ❌ Failed to upload image`);
        }
        
        // Measured pause between each project
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Longer pause between batches
      if (batch < totalBatches - 1) {
        console.log(`⏳ Waiting 2 seconds before next batch...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    console.log(`\n🎉 Finished fixing images from original data!`);
    console.log(`   Processed: ${processed}`);
    console.log(`   Updated: ${updated}`);
    console.log(`   Skipped: ${skipped}`);
    console.log(`   Not found: ${notFound}`);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

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

fixImagesFromOriginalData();
