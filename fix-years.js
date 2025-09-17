const { createClient } = require('@sanity/client');

// Sanity client configuration
const client = createClient({
  projectId: '669ljbt4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN,
});

async function fixYears() {
  console.log('🔍 Fetching all projects to fix years...');
  
  try {
    // Get all projects
    const projects = await client.fetch(`*[_type == "project"]`);
    console.log(`Found ${projects.length} projects`);
    
    let fixed = 0;
    let errors = 0;
    
    for (const project of projects) {
      try {
        // Check if we have a dateCreated field
        if (project.dateCreated && typeof project.dateCreated === 'string') {
          const dateStr = project.dateCreated;
          
          // Check if it's in MMDDYYYY format (8 digits)
          if (dateStr.length === 8 && /^\d{8}$/.test(dateStr)) {
            const year = parseInt(dateStr.substring(4, 8));
            const month = parseInt(dateStr.substring(0, 2));
            const day = parseInt(dateStr.substring(2, 4));
            
            // Validate the year is reasonable (2014-2025)
            if (year >= 2014 && year <= 2025) {
              // Only update if the current year is wrong
              if (project.year !== year) {
                console.log(`Fixing ${project.title}: ${project.year} → ${year} (from ${dateStr})`);
                
                await client
                  .patch(project._id)
                  .set({ year: year })
                  .commit();
                
                fixed++;
              } else {
                console.log(`✓ ${project.title}: year already correct (${year})`);
              }
            } else {
              console.log(`⚠️  ${project.title}: year ${year} out of range, skipping`);
            }
          } else {
            console.log(`⚠️  ${project.title}: dateCreated format not recognized: ${dateStr}`);
          }
        } else {
          console.log(`⚠️  ${project.title}: no dateCreated field`);
        }
      } catch (error) {
        console.error(`❌ Error fixing ${project.title}:`, error.message);
        errors++;
      }
    }
    
    console.log('\n🎉 Year fixing complete!');
    console.log(`✅ Fixed: ${fixed} projects`);
    console.log(`❌ Errors: ${errors} projects`);
    
  } catch (error) {
    console.error('💥 Failed to fix years:', error);
  }
}

// Check if we have a token
if (!process.env.SANITY_API_READ_TOKEN && !process.env.SANITY_API_TOKEN) {
  console.log('🔑 To fix years, you need a Sanity API token:');
  console.log('1. Go to https://sanity.io/manage');
  console.log('2. Select your project (thomgriggs-portfolio)');
  console.log('3. Go to API > Tokens');
  console.log('4. Create a new token with "Editor" permissions');
  console.log('5. Run: export SANITY_API_TOKEN="your-token-here"');
  console.log('6. Then run: node fix-years.js');
} else {
  fixYears();
}
