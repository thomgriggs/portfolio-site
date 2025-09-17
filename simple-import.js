const { createClient } = require('@sanity/client');
const fs = require('fs');

// Sanity client configuration
const client = createClient({
  projectId: '669ljbt4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN,
});

// Read the projects data
const projectsData = JSON.parse(fs.readFileSync('/Users/thomasgriggs/Development/portfolio-site/projects-import.json', 'utf8'));

async function importProjects() {
  console.log(`🚀 Starting import of ${projectsData.length} projects...`);
  console.log('This will take a few minutes...\n');
  
  let imported = 0;
  let errors = 0;
  let skipped = 0;

  try {
    // Import projects one by one to avoid rate limits
    for (let i = 0; i < projectsData.length; i++) {
      const project = projectsData[i];
      
      // Show progress
      if (i % 10 === 0) {
        console.log(`Progress: ${i}/${projectsData.length} (${Math.round((i/projectsData.length)*100)}%)`);
      }
      
      try {
        // Check if project already exists
        const existing = await client.fetch(`*[_type == "project" && _id == "${project._id}"][0]`);
        
        if (existing) {
          console.log(`⚠️  Skipped: ${project.title} (already exists)`);
          skipped++;
          continue;
        }

        // Create the project
        const result = await client.create(project);
        imported++;
        
        if (i % 50 === 0) {
          console.log(`✅ Imported: ${project.title}`);
        }
        
      } catch (error) {
        errors++;
        console.error(`❌ Failed: ${project.title} - ${error.message}`);
      }

      // Small delay to avoid rate limits
      if (i % 10 === 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    console.log('\n🎉 Import complete!');
    console.log(`✅ Successfully imported: ${imported} projects`);
    console.log(`⚠️  Skipped (already exist): ${skipped} projects`);
    console.log(`❌ Failed: ${errors} projects`);
    
    if (imported > 0) {
      console.log('\n🔍 Check your Sanity Studio at http://localhost:3333');
      console.log('🔍 Check your portfolio at http://localhost:3000/work');
    }
    
  } catch (error) {
    console.error('💥 Import failed:', error);
  }
}

// Check if we have a token
if (!process.env.SANITY_API_READ_TOKEN && !process.env.SANITY_API_TOKEN) {
  console.log('🔑 To import all projects, you need a Sanity API token:');
  console.log('1. Go to https://sanity.io/manage');
  console.log('2. Select your project (thomgriggs-portfolio)');
  console.log('3. Go to API > Tokens');
  console.log('4. Create a new token with "Editor" permissions');
  console.log('5. Run: export SANITY_API_TOKEN="your-token-here"');
  console.log('6. Then run: node simple-import.js');
  console.log('\nOr continue with manual import at http://localhost:3333');
} else {
  importProjects();
}
