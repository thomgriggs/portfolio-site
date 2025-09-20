const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Sanity client configuration
const client = createClient({
  projectId: '669ljbt4',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false, // Use direct API for export
  perspective: 'published',
});

// Query for all projects
const ALL_PROJECTS = `
  *[_type == "project"] | order(featured desc, dateCreated desc) {
    _id, title, dateCreated, description, industry, featured, urlPath,
    images[] {
      _key, asset->{_ref, _type, url}
    },
    skills
  }
`;

// Query for all content types (optional)
const ALL_CONTENT = `
  *[_type in ["project", "page", "post"]] | order(_createdAt desc) {
    _type, _id, _createdAt, _updatedAt,
    ...,
    "imageUrl": images[0].asset->url
  }
`;

async function exportSanityData() {
  try {
    console.log('🔄 Fetching data from Sanity...');
    
    // Export projects
    console.log('📁 Exporting projects...');
    const projects = await client.fetch(ALL_PROJECTS);
    
    // Export all content (optional)
    console.log('📁 Exporting all content...');
    const allContent = await client.fetch(ALL_CONTENT);
    
    // Create exports directory
    const exportsDir = path.join(__dirname, 'exports');
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir);
    }
    
    // Export projects to JSON
    const projectsPath = path.join(exportsDir, 'sanity-projects-export.json');
    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
    console.log(`✅ Projects exported: ${projectsPath}`);
    console.log(`   📊 ${projects.length} projects found`);
    
    // Export all content to JSON
    const allContentPath = path.join(exportsDir, 'sanity-all-content-export.json');
    fs.writeFileSync(allContentPath, JSON.stringify(allContent, null, 2));
    console.log(`✅ All content exported: ${allContentPath}`);
    console.log(`   📊 ${allContent.length} content items found`);
    
    // Create a summary
    const summary = {
      exportDate: new Date().toISOString(),
      projectId: '669ljbt4',
      dataset: 'production',
      stats: {
        totalProjects: projects.length,
        featuredProjects: projects.filter(p => p.featured).length,
        totalContent: allContent.length,
        industries: [...new Set(projects.map(p => p.industry).filter(Boolean))],
        skills: [...new Set(projects.flatMap(p => p.skills || []))],
      },
      files: {
        projects: 'sanity-projects-export.json',
        allContent: 'sanity-all-content-export.json'
      }
    };
    
    const summaryPath = path.join(exportsDir, 'export-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`✅ Export summary: ${summaryPath}`);
    
    console.log('\n🎉 Export complete!');
    console.log(`📁 Files saved in: ${exportsDir}`);
    console.log('\n📊 Summary:');
    console.log(`   • ${summary.stats.totalProjects} projects`);
    console.log(`   • ${summary.stats.featuredProjects} featured projects`);
    console.log(`   • ${summary.stats.totalContent} total content items`);
    console.log(`   • ${summary.stats.industries.length} industries`);
    console.log(`   • ${summary.stats.skills.length} unique skills`);
    
  } catch (error) {
    console.error('❌ Export failed:', error.message);
    console.error('Full error:', error);
  }
}

// Run the export
exportSanityData();
