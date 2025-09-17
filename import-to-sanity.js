const { createClient } = require('@sanity/client');
const fs = require('fs');

// Sanity client configuration
const client = createClient({
  projectId: '669ljbt4',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You'll need to set this
});

// Read the projects data
const projectsData = JSON.parse(fs.readFileSync('/Users/thomasgriggs/Development/portfolio-site/projects-import.json', 'utf8'));

async function importProjects() {
  console.log(`Starting import of ${projectsData.length} projects...`);
  
  try {
    // Import projects in batches to avoid rate limits
    const batchSize = 10;
    let imported = 0;
    let errors = 0;

    for (let i = 0; i < projectsData.length; i += batchSize) {
      const batch = projectsData.slice(i, i + batchSize);
      
      console.log(`Importing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(projectsData.length / batchSize)}...`);
      
      const results = await Promise.allSettled(
        batch.map(project => 
          client.create(project).catch(error => {
            console.error(`Error importing ${project.title}:`, error.message);
            return { error: error.message, project: project.title };
          })
        )
      );

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          imported++;
          console.log(`✓ Imported: ${batch[index].title}`);
        } else {
          errors++;
          console.log(`✗ Failed: ${batch[index].title} - ${result.reason}`);
        }
      });

      // Small delay between batches
      if (i + batchSize < projectsData.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log(`\nImport complete!`);
    console.log(`✓ Successfully imported: ${imported} projects`);
    console.log(`✗ Failed: ${errors} projects`);
    
  } catch (error) {
    console.error('Import failed:', error);
  }
}

// Check if we have the required environment variable
if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN environment variable is required');
  console.log('\nTo get your API token:');
  console.log('1. Go to https://sanity.io/manage');
  console.log('2. Select your project (thomgriggs-portfolio)');
  console.log('3. Go to API > Tokens');
  console.log('4. Create a new token with "Editor" permissions');
  console.log('5. Set it as: export SANITY_API_TOKEN="your-token-here"');
  console.log('\nThen run: node import-to-sanity.js');
} else {
  importProjects();
}
