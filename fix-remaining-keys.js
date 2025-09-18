const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '669ljbt4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN
});

async function fixRemainingKeys() {
  try {
    console.log('🔍 Finding projects that actually need fixing...');
    
    // Get projects with images that are missing _key properties
    const projects = await client.fetch(`
      *[_type == "project" && count(images) > 0 && !defined(images[0]._key)] {
        _id,
        title,
        images
      }[0...10]
    `);
    
    console.log(`Found ${projects.length} projects that actually need fixing`);
    
    if (projects.length === 0) {
      console.log('🎉 All projects are already fixed!');
      return;
    }
    
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
    
    console.log(`\n🎉 Fixed ${projects.length} projects`);
    console.log('Run this script again to check for more');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixRemainingKeys();




