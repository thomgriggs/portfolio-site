const { createClient } = require('@sanity/client');

// Create Sanity client
const client = createClient({
  projectId: '669ljbt4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01'
});

async function checkScreenshots() {
  try {
    console.log('🔍 Querying Sanity for projects...');
    
    // Query all projects
    const projects = await client.fetch(`
      *[_type == "project"] {
        _id,
        title,
        urlPath,
        screenshot {
          asset-> {
            url,
            metadata {
              dimensions
            }
          }
        }
      }
    `);
    
    console.log(`📊 Total projects in Sanity: ${projects.length}`);
    
    let withScreenshots = 0;
    let withoutScreenshots = 0;
    const missingProjects = [];
    
    projects.forEach(project => {
      if (project.screenshot && project.screenshot.asset) {
        withScreenshots++;
      } else {
        withoutScreenshots++;
        missingProjects.push({
          title: project.title,
          url: project.urlPath,
          id: project._id
        });
      }
    });
    
    console.log(`✅ Projects with screenshots: ${withScreenshots}`);
    console.log(`❌ Projects without screenshots: ${withoutScreenshots}`);
    console.log(`📈 Coverage: ${Math.round((withScreenshots / projects.length) * 100)}%`);
    
    console.log('\n📋 First 10 projects missing screenshots:');
    missingProjects.slice(0, 10).forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
      console.log(`   URL: ${project.url || 'No URL'}`);
      console.log(`   ID: ${project.id}`);
      console.log('');
    });
    
    if (missingProjects.length > 10) {
      console.log(`... and ${missingProjects.length - 10} more projects missing screenshots`);
    }
    
  } catch (error) {
    console.error('❌ Error querying Sanity:', error.message);
  }
}

checkScreenshots();
