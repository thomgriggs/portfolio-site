const fs = require('fs');

// Read the comprehensive mapping
const comprehensiveMapping = JSON.parse(fs.readFileSync('./comprehensive-screenshot-mapping.json', 'utf8'));

// Read the current ImprovedCardPreview.tsx
let content = fs.readFileSync('./apps/site/src/app/archive/ImprovedCardPreview.tsx', 'utf8');

// Create the new screenshotMap string
const screenshotMapString = `        // Comprehensive mapping of project names to actual screenshot filenames (${Object.keys(comprehensiveMapping).length} projects)
        const screenshotMap: { [key: string]: string } = ${JSON.stringify(comprehensiveMapping, null, 10).replace(/^/gm, '          ')};`;

// Find and replace the screenshotMap section
const screenshotMapRegex = /\/\/ Comprehensive mapping of project names to actual screenshot filenames.*?};/s;
const updatedContent = content.replace(screenshotMapRegex, screenshotMapString);

// Write the updated content
fs.writeFileSync('./apps/site/src/app/archive/ImprovedCardPreview.tsx', updatedContent);

console.log(`✅ Updated ImprovedCardPreview.tsx with ${Object.keys(comprehensiveMapping).length} project mappings`);






