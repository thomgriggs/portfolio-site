const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// Projects that need screenshots based on 404 errors from terminal
const missingScreenshots = [
  // From terminal 404 errors
  'Hotel Maubeuge',
  'Chateau De Mercues', 
  'Maisons Taillevent Paris',
  'Hotel Saint Marc',
  'Manoir de Lan Kerellec',
  'Capsis Elite Resort',
  'Hotel Petit Paris',
  'Hotel X Toronto',
  'Off Paris Siene',
  'Harmony Spa Budapest',
  'Bob Hotel Paris',
  'Hotel Crayon Rouge',
  'Hotel Crayon',
  'Hotel La Parizienne',
  'Handsome Hotel paris',
  'Hotel Felicien Paris',
  'Hotel Odyssey Paris',
  'Hotel Champerret Elysees',
  'Hotel Dauphine St Germain',
  'Legend Hotel Paris',
  'Casablanca Hotel',
  'Aria Hotel Budapest',
  'Malcom & Barret Hotel and Bar',
  'Vintage Hotel',
  'Duna Park Milfontes',
  'Villathena',
  'Library Hotel',
  'Elysee Hotel',
  'Hotel Giraffe',
  'Snob Hotel Paris',
  'Villas Le Barone',
  'Le Bellechasse Saint Germain',
  'Hotel Emile',
  'La Maison Champs Elysees',
  'Mercure Cantania Excelsior',
  'L\'Imprimerie Hotel',
  'Hotel Henry IV',
  'Hotel Clement',
  'Duna Park Beach Club',
  'Hotel Saintgregoire',
  'Terra Place',
  'Dun Parque Alentejo Star Hotel',
  'Auberge De La Source',
  'Quay Perth',
  'Duna Park HS Milfontes Beach',
  'Duna Park Mimi',
  'The Suncliff Seafront Hotel by Oceana',
  'Duna Park Moinho Da Asneira',
  'Duna Park Quinta Da Samoqueirinha',
  'Duna Park Unique Apartments',
  'Hotel Lautrec Opera',
  'Hotel Mermoz',
  'Louis St Elias Resort',
  'Le Petit Coq Aux Champs',
  'Mercure',
  'Ferme Saint Simeon',
  'Le Saint Hotel Paris',
  'Privilege Toulouse',
  'The Palm Seychelles',
  'Safari Tours',
  'Hotel Le Lavoisier',
  'Elegancia Hotels',
  'Hotel Longchamp Elysees',
  'Hotel de Suez'
];

// Read projects data to get URLs
const projectsData = JSON.parse(fs.readFileSync('projects-import.json', 'utf8'));

// Create a map of project names to URLs
const projectUrlMap = {};
projectsData.forEach(project => {
  if (project.urlPath && project.urlPath.startsWith('http')) {
    projectUrlMap[project.title] = project.urlPath;
  }
});

console.log(`📊 Found ${missingScreenshots.length} projects needing screenshots`);
console.log(`📊 Found ${Object.keys(projectUrlMap).length} projects with URLs`);

// Function to create filename from project name
function createFilename(projectName) {
  return projectName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Function to capture screenshot with retry logic
async function captureScreenshot(browser, projectName, url, outputPath, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`📸 Attempt ${attempt}/${retries}: Capturing ${projectName}...`);
      
      const page = await browser.newPage();
      
      // Set viewport for consistent screenshots
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      // Set longer timeout for slow sites
      await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      // Wait a bit for any dynamic content to load
      await page.waitForTimeout(3000);
      
      // Try to dismiss common popups and cookie notices
      try {
        // Common cookie/popup selectors
        const popupSelectors = [
          '[data-testid="cookie-banner"]',
          '.cookie-banner',
          '.cookie-notice',
          '.gdpr-banner',
          '.popup',
          '.modal',
          '[class*="cookie"]',
          '[class*="popup"]',
          '[class*="modal"]',
          'button[class*="accept"]',
          'button[class*="dismiss"]',
          'button[class*="close"]',
          '#cookie-accept',
          '#accept-cookies',
          '.accept-cookies',
          '.btn-accept',
          '.cookie-accept'
        ];
        
        for (const selector of popupSelectors) {
          try {
            const element = await page.$(selector);
            if (element) {
              await element.click();
              console.log(`  ✅ Dismissed popup: ${selector}`);
              await page.waitForTimeout(1000);
            }
          } catch (e) {
            // Ignore errors for individual selectors
          }
        }
      } catch (e) {
        console.log(`  ⚠️  Popup handling failed: ${e.message}`);
      }
      
      // Wait a bit more after popup handling
      await page.waitForTimeout(2000);
      
      // Take screenshot
      await page.screenshot({ 
        path: outputPath,
        fullPage: true,
        quality: 85
      });
      
      await page.close();
      
      console.log(`  ✅ Successfully captured: ${projectName}`);
      return true;
      
    } catch (error) {
      console.log(`  ❌ Attempt ${attempt} failed: ${error.message}`);
      
      if (attempt === retries) {
        console.log(`  💥 All attempts failed for ${projectName}`);
        return false;
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

// Main capture function
async function captureAllScreenshots() {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const screenshotsDir = path.join(__dirname, 'apps', 'site', 'public', 'screenshots');
  
  // Ensure screenshots directory exists
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  
  let successCount = 0;
  let failCount = 0;
  
  for (const projectName of missingScreenshots) {
    const url = projectUrlMap[projectName];
    
    if (!url) {
      console.log(`⚠️  No URL found for: ${projectName}`);
      failCount++;
      continue;
    }
    
    const filename = createFilename(projectName) + '.png';
    const outputPath = path.join(screenshotsDir, filename);
    
    // Skip if already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${projectName} (already exists)`);
      continue;
    }
    
    console.log(`\n🎯 Processing: ${projectName}`);
    console.log(`   URL: ${url}`);
    console.log(`   Output: ${filename}`);
    
    const success = await captureScreenshot(browser, projectName, url, outputPath);
    
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    
    // Add delay between captures to be gentle on servers
    console.log(`   ⏳ Waiting 3 seconds before next capture...`);
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  await browser.close();
  
  console.log(`\n📊 Capture Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📁 Screenshots saved to: ${screenshotsDir}`);
}

// Run the capture
captureAllScreenshots().catch(console.error);




