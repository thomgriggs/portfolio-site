const { createClient } = require('@sanity/client');

// Sanity client configuration
const client = createClient({
  projectId: '669ljbt4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-01-01',
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN,
});

function extractYearFromDate(dateStr) {
  if (!dateStr) return null;
  
  // Handle MMDDYYYY format (8 digits)
  if (dateStr.length === 8 && /^\d{8}$/.test(dateStr)) {
    const year = parseInt(dateStr.substring(4, 8));
    if (year >= 2014 && year <= 2025) {
      return year;
    }
  }
  
  // Handle YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const year = parseInt(dateStr.substring(0, 4));
    if (year >= 2014 && year <= 2025) {
      return year;
    }
  }
  
  // Handle YYYY-M-D format (single digit month/day)
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateStr)) {
    const year = parseInt(dateStr.substring(0, 4));
    if (year >= 2014 && year <= 2025) {
      return year;
    }
  }
  
  return null;
}

async function fixRemainingYears() {
  console.log('🔍 Fetching projects that still need year fixes...');
  
  try {
    // Get projects where year is still wrong (not in 2014-2025 range)
    const projects = await client.fetch(`*[_type == "project" && (year < 2014 || year > 2025)]`);
    console.log(`Found ${projects.length} projects with incorrect years`);
    
    let fixed = 0;
    let errors = 0;
    let skipped = 0;
    
    for (const project of projects) {
      try {
        const correctYear = extractYearFromDate(project.dateCreated);
        
        if (correctYear) {
          console.log(`Fixing ${project.title}: ${project.year} → ${correctYear} (from ${project.dateCreated})`);
          
          await client
            .patch(project._id)
            .set({ year: correctYear })
            .commit();
          
          fixed++;
          
          // Add small delay to avoid rate limits
          await new Promise(resolve => setTimeout(resolve, 100));
        } else {
          console.log(`⚠️  ${project.title}: cannot extract year from ${project.dateCreated}`);
          skipped++;
        }
      } catch (error) {
        console.error(`❌ Error fixing ${project.title}:`, error.message);
        errors++;
      }
    }
    
    console.log('\n🎉 Year fixing complete!');
    console.log(`✅ Fixed: ${fixed} projects`);
    console.log(`⚠️  Skipped: ${skipped} projects`);
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
  console.log('6. Then run: node fix-years-v2.js');
} else {
  fixRemainingYears();
}
