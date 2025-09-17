// This script can be run in the Sanity Studio console
// Go to http://localhost:3333 and open the browser console (F12)
// Then paste and run this code

const projectsData = [
  // This is a sample of your projects - the full data is in projects-import.json
  {
    _type: 'project',
    _id: 'project-1',
    title: 'Auberge Du Jeu De Paume Chantilly',
    categoryName: 'Spotlight',
    urlPath: 'https://aubergedujeudepaumechantilly.fr/',
    imagePath: '/images/spotlight-projects/aubergedujeudepaume.jpeg',
    tags: ['Hotel', 'Restaurant', 'Spa'],
    dateCreated: '06042019',
    description: 'Description',
    featured: true,
    type: 'Website',
    industry: 'Hospitality',
    year: 2019
  },
  {
    _type: 'project',
    _id: 'project-2',
    title: 'Bernard Loiseau',
    categoryName: 'Spotlight',
    urlPath: 'https://bernard-loiseau.com/',
    imagePath: '/images/spotlight-projects/bernardloiseau.jpeg',
    tags: ['Hotel', 'Restaurant', 'Spa'],
    dateCreated: '11302021',
    description: 'Description',
    featured: true,
    type: 'Website',
    industry: 'Hospitality',
    year: 2021
  }
  // ... more projects would go here
];

// Function to import projects
async function importProjects() {
  console.log('Starting import...');
  
  try {
    // Import each project
    for (const project of projectsData) {
      try {
        const result = await client.create(project);
        console.log(`✓ Imported: ${project.title}`);
      } catch (error) {
        console.error(`✗ Failed to import ${project.title}:`, error.message);
      }
    }
    
    console.log('Import complete!');
  } catch (error) {
    console.error('Import failed:', error);
  }
}

// Run the import
importProjects();
