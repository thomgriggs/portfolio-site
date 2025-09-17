const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '669ljbt4',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

async function getProjectTitles() {
  try {
    const projects = await client.fetch(`
      *[_type == "project"] | order(featured desc, dateCreated desc) {
        title
      }
    `);
    
    console.log('Project titles:');
    projects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
    });
    
    console.log(`\nTotal projects: ${projects.length}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

getProjectTitles();
