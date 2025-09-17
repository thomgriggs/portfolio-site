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

function determineIndustry(title, type, existingIndustry) {
  const titleLower = title.toLowerCase();
  const typeLower = type?.toLowerCase() || '';
  
  // If it's a hotel, make it hospitality
  if (titleLower.includes('hotel') || typeLower.includes('hotel')) {
    return 'hospitality';
  }
  
  // If it's a spa, make it spa-wellness
  if (titleLower.includes('spa') || typeLower.includes('spa')) {
    return 'spa-wellness';
  }
  
  // If it's a restaurant, make it restaurant
  if (titleLower.includes('restaurant') || typeLower.includes('restaurant')) {
    return 'restaurant';
  }
  
  // If it's e-commerce related
  if (titleLower.includes('shop') || titleLower.includes('store') || typeLower.includes('ecommerce')) {
    return 'ecommerce';
  }
  
  // If it's technology related
  if (titleLower.includes('app') || titleLower.includes('software') || typeLower.includes('technology')) {
    return 'technology';
  }
  
  // Return existing industry if it's valid, otherwise default to 'other'
  const validIndustries = ['hospitality', 'spa-wellness', 'restaurant', 'technology', 'ecommerce', 'healthcare', 'education', 'real-estate', 'travel-tourism', 'fashion', 'other'];
  if (existingIndustry && validIndustries.includes(existingIndustry)) {
    return existingIndustry;
  }
  
  return 'other';
}

function convertDateToISO(dateStr) {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  
  // Handle MMDDYYYY format (8 digits)
  if (dateStr.length === 8 && /^\d{8}$/.test(dateStr)) {
    const month = dateStr.substring(0, 2);
    const day = dateStr.substring(2, 4);
    const year = dateStr.substring(4, 8);
    return `${year}-${month}-${day}`;
  }
  
  // Handle YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  
  // Handle YYYY-M-D format (single digit month/day)
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateStr)) {
    const parts = dateStr.split('-');
    const year = parts[0];
    const month = parts[1].padStart(2, '0');
    const day = parts[2].padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Default to current date if format is not recognized
  return new Date().toISOString().split('T')[0];
}

async function migrateProjects() {
  console.log('🔍 Fetching all projects to migrate...');
  
  try {
    // Get all projects
    const projects = await client.fetch(`*[_type == "project"]`);
    console.log(`Found ${projects.length} projects to migrate`);
    
    let migrated = 0;
    let errors = 0;
    
    for (const project of projects) {
      try {
        console.log(`Migrating ${project.title}...`);
        
        // Prepare the migration data
        const migrationData = {
          // Keep existing fields that are still valid
          title: project.title,
          type: project.type,
          featured: project.featured || false,
          urlPath: project.urlPath,
          
          // Convert dateCreated to proper date format
          dateCreated: convertDateToISO(project.dateCreated),
          
          // Merge summary and description into description
          description: project.description || project.summary || 'No description available',
          
          // Determine industry based on title/type
          industry: determineIndustry(project.title, project.type, project.industry),
          
          // Convert tags to skills (keep existing tags as skills for now)
          skills: project.tags || [],
          
          // Convert single image to images array if it exists
          images: project.image ? [project.image] : []
        };
        
        // Update the project
        await client
          .patch(project._id)
          .set(migrationData)
          .commit();
        
        console.log(`✅ Migrated ${project.title}`);
        migrated++;
        
        // Add small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Error migrating ${project.title}:`, error.message);
        errors++;
      }
    }
    
    console.log('\n🎉 Migration complete!');
    console.log(`✅ Migrated: ${migrated} projects`);
    console.log(`❌ Errors: ${errors} projects`);
    
  } catch (error) {
    console.error('💥 Failed to migrate projects:', error);
  }
}

// Check if we have a token
if (!process.env.SANITY_API_READ_TOKEN && !process.env.SANITY_API_TOKEN) {
  console.log('🔑 To migrate projects, you need a Sanity API token:');
  console.log('1. Go to https://sanity.io/manage');
  console.log('2. Select your project (thomgriggs-portfolio)');
  console.log('3. Go to API > Tokens');
  console.log('4. Create a new token with "Editor" permissions');
  console.log('5. Run: export SANITY_API_TOKEN="your-token-here"');
  console.log('6. Then run: node migrate-schema.js');
} else {
  migrateProjects();
}
