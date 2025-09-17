const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '669ljbt4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
});

async function fixMissingKeys() {
  try {
    console.log('🔍 Finding projects with missing keys...');
    
    // Get projects with images that might have missing keys
    const projects = await client.fetch(`
      *[_type == "project" && count(images) > 0] {
        _id,
        title,
        images
      }[0...50]
    `);
    
    console.log(`Found ${projects.length} projects to check`);
    
    for (const project of projects) {
      console.log(`\n🔧 Fixing: ${project.title}`);
      
      // Add _key to each image if missing
      const fixedImages = project.images.map((image, index) => ({
        ...image,
        _key: image._key || `image-${index}-${Date.now()}`
      }));
      
      // Update the project
      await client
        .patch(project._id)
        .set({ images: fixedImages })
        .commit();
      
      console.log(`  ✅ Fixed ${fixedImages.length} images`);
    }
    
    console.log('\n🎉 Fixed missing keys for first 5 projects');
    console.log('Run this script again to fix more projects');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixMissingKeys();
