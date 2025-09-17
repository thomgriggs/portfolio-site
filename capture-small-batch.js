const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// Final batch of 3 projects
const smallBatch = [
  'Hotel Palombaggia',
  'Hotel Florida Paris',
  'Chateau de Sainte Feyre'
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

console.log(`📊 Processing small batch of ${smallBatch.length} projects`);

// Function to create filename from project name
function createFilename(projectName) {
  return projectName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Function to capture screenshot with retry logic
async function captureScreenshot(browser, projectName, url, outputPath) {
  try {
    console.log(`📸 Capturing ${projectName}...`);
    
    const page = await browser.newPage();
    
    // Set viewport for consistent screenshots
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Set longer timeout for slow sites
    await page.goto(url, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Wait for content to load
    await page.waitForTimeout(5000);
    
    // Try to dismiss common popups and cookie notices
    try {
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
            await page.waitForTimeout(2000);
          }
        } catch (e) {
          // Ignore errors for individual selectors
        }
      }
    } catch (e) {
      console.log(`  ⚠️  Popup handling failed: ${e.message}`);
    }
    
    // Wait a bit more after popup handling
    await page.waitForTimeout(3000);
    
    // Take screenshot
    await page.screenshot({ 
      path: outputPath,
      fullPage: true
    });
    
    await page.close();
    
    console.log(`  ✅ Successfully captured: ${projectName}`);
    return true;
    
  } catch (error) {
    console.log(`  ❌ Failed to capture ${projectName}: ${error.message}`);
    return false;
  }
}

// Main capture function
async function captureSmallBatch() {
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
  
  for (const projectName of smallBatch) {
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
    
    // Add delay between captures
    console.log(`   ⏳ Waiting 5 seconds before next capture...`);
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  
  await browser.close();
  
  console.log(`\n📊 Small Batch Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📁 Screenshots saved to: ${screenshotsDir}`);
}

// Run the capture
captureSmallBatch().catch(console.error);