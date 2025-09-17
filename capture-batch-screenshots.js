const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// Read projects data
const projectsData = JSON.parse(fs.readFileSync('projects-import.json', 'utf8'));
const availableScreenshots = fs.readFileSync('available-screenshots.txt', 'utf8')
  .split('\n')
  .filter(name => name.trim());

// Find projects that need screenshots
const projectsNeedingScreenshots = projectsData.filter(project => {
  if (!project.title || !project.urlPath || !project.urlPath.startsWith('http')) {
    return false;
  }
  
  const expectedFilename = project.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.png';
  return !availableScreenshots.includes(expectedFilename);
});

console.log(`📊 Found ${projectsNeedingScreenshots.length} projects needing screenshots`);

// Process in batches of 10
const batchSize = 10;
const batches = [];
for (let i = 0; i < projectsNeedingScreenshots.length; i += batchSize) {
  batches.push(projectsNeedingScreenshots.slice(i, i + batchSize));
}

console.log(`📦 Created ${batches.length} batches of ${batchSize} projects each`);

// Function to create filename from project name
function createFilename(projectName) {
  return projectName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Function to capture screenshot
async function captureScreenshot(browser, project, outputPath) {
  try {
    console.log(`📸 Capturing ${project.title}...`);
    
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    await page.goto(project.urlPath, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    await page.waitForTimeout(3000);
    
    // Dismiss popups
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
            await page.waitForTimeout(1000);
          }
        } catch (e) {
          // Ignore errors
        }
      }
    } catch (e) {
      // Ignore popup errors
    }
    
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: outputPath,
      fullPage: true
    });
    
    await page.close();
    console.log(`  ✅ Success: ${project.title}`);
    return true;
    
  } catch (error) {
    console.log(`  ❌ Failed: ${project.title} - ${error.message}`);
    return false;
  }
}

// Process first batch
async function processFirstBatch() {
  if (batches.length === 0) {
    console.log('No batches to process');
    return;
  }
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const screenshotsDir = path.join(__dirname, 'apps', 'site', 'public', 'screenshots');
  
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  
  const firstBatch = batches[0];
  let successCount = 0;
  let failCount = 0;
  
  console.log(`\n🎯 Processing batch 1 of ${batches.length} (${firstBatch.length} projects)`);
  
  for (const project of firstBatch) {
    const filename = createFilename(project.title) + '.png';
    const outputPath = path.join(screenshotsDir, filename);
    
    const success = await captureScreenshot(browser, project, outputPath);
    
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    
    // Delay between captures
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  await browser.close();
  
  console.log(`\n📊 Batch 1 Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📁 Screenshots saved to: ${screenshotsDir}`);
  console.log(`\n🔄 Run this script again to process the next batch`);
}

// Run the first batch
processFirstBatch().catch(console.error);


