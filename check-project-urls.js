const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '669ljbt4',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

async function checkProjectUrls() {
  try {
    const projects = await client.fetch(`
      *[_type == "project" && title in ["Hotel Palombaggia", "Hotel Florida Paris", "Chateau de Sainte Feyre"]] {
        title, urlPath
      }
    `);
    
    console.log('🔍 Checking project URLs:');
    projects.forEach(project => {
      console.log(`${project.title}: ${project.urlPath || 'No URL'}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

checkProjectUrls();

