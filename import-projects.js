const fs = require('fs');
const path = require('path');

// Read the projects.json file
const projectsData = JSON.parse(fs.readFileSync('/Users/thomasgriggs/Development/thomgriggs.com/_js/projects.json', 'utf8'));

// Convert to Sanity format
const sanityProjects = projectsData.map((project, index) => ({
  _type: 'project',
  _id: `project-${project.id}`,
  title: project.projectName,
  categoryName: project.categoryName,
  urlPath: project.urlPath,
  imagePath: project.imagePath,
  tags: project.tags || [],
  dateCreated: project.dateCreated,
  description: project.projectDescription,
  featured: project.categoryName === 'Spotlight',
  type: 'Website',
  industry: project.tags?.includes('Hotel') ? 'Hospitality' : 
           project.tags?.includes('Restaurant') ? 'Restaurant' : 
           project.tags?.includes('Spa') ? 'Wellness' : 'Other',
  year: project.dateCreated ? parseInt(project.dateCreated.substring(0, 4)) : new Date().getFullYear()
}));

// Write to a file that can be imported into Sanity
fs.writeFileSync(
  '/Users/thomasgriggs/Development/portfolio-site/projects-import.json', 
  JSON.stringify(sanityProjects, null, 2)
);

console.log(`Converted ${sanityProjects.length} projects to Sanity format`);
console.log('File saved as projects-import.json');
console.log('\nCategories found:');
const categories = [...new Set(sanityProjects.map(p => p.categoryName))];
categories.forEach(cat => {
  const count = sanityProjects.filter(p => p.categoryName === cat).length;
  console.log(`- ${cat}: ${count} projects`);
});
