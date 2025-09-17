const { createClient } = require('@sanity/client');

// Sanity client configuration
const client = createClient({
  projectId: '669ljbt4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-01-01',
});

// Test with just a few projects first
const testProjects = [
  {
    _type: 'project',
    _id: 'project-test-1',
    title: 'Auberge Du Jeu De Paume Chantilly',
    categoryName: 'Spotlight',
    urlPath: 'https://aubergedujeudepaumechantilly.fr/',
    imagePath: '/images/spotlight-projects/aubergedujeudepaume.jpeg',
    tags: ['Hotel', 'Restaurant', 'Spa'],
    dateCreated: '06042019',
    description: 'Luxury hotel website with restaurant and spa sections',
    featured: true,
    type: 'Website',
    industry: 'Hospitality',
    year: 2019
  },
  {
    _type: 'project',
    _id: 'project-test-2',
    title: 'Bernard Loiseau',
    categoryName: 'Spotlight',
    urlPath: 'https://bernard-loiseau.com/',
    imagePath: '/images/spotlight-projects/bernardloiseau.jpeg',
    tags: ['Hotel', 'Restaurant', 'Spa'],
    dateCreated: '11302021',
    description: 'Michelin-starred restaurant and hotel website',
    featured: true,
    type: 'Website',
    industry: 'Hospitality',
    year: 2021
  },
  {
    _type: 'project',
    _id: 'project-test-3',
    title: 'BHF Paris',
    categoryName: 'Spotlight',
    urlPath: 'https://bhfparis.com/',
    imagePath: '/images/spotlight-projects/bhfparis.jpeg',
    tags: ['Hotel', 'Restaurant', 'Spa'],
    dateCreated: '07012019',
    description: 'Boutique hotel in Paris with modern design',
    featured: true,
    type: 'Website',
    industry: 'Hospitality',
    year: 2019
  }
];

async function testImport() {
  console.log('Testing import with 3 sample projects...');
  
  try {
    for (const project of testProjects) {
      try {
        const result = await client.create(project);
        console.log(`✓ Successfully imported: ${project.title}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚠ Project already exists: ${project.title}`);
        } else {
          console.error(`✗ Failed to import ${project.title}:`, error.message);
        }
      }
    }
    
    console.log('\nTest import complete! Check your Sanity Studio at http://localhost:3333');
  } catch (error) {
    console.error('Test import failed:', error);
  }
}

testImport();
