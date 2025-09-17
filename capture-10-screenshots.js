const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// Read projects data to get URLs
const projectsData = JSON.parse(fs.readFileSync('projects-import.json', 'utf8'));

// Get first 10 projects with URLs
const projectsToCapture = projectsData
  .filter(project => project.urlPath && project.urlPath.startsWith('http'))
  .slice(0, 10);

console.log(`📊 Found ${projectsToCapture.length} projects to capture`);

// Function to create filename from project name
function createFilename(projectName) {
  return projectName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Function to capture screenshot following your exact steps
async function captureScreenshot(browser, project, outputPath) {
  try {
    console.log(`\n🎯 Processing: ${project.title}`);
    console.log(`   URL: ${project.urlPath}`);
    
    const page = await browser.newPage();
    
    // Step 1: Go to URL
    console.log(`   1️⃣ Going to URL...`);
    await page.goto(project.urlPath, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Step 2: Wait for page to fully load
    console.log(`   2️⃣ Waiting for page to fully load...`);
    await page.waitForLoadState('networkidle');
    
    // Step 3: Wait 10 seconds
    console.log(`   3️⃣ Waiting 10 seconds...`);
    await page.waitForTimeout(10000);
    
    // Step 4: Remove popups (hide or close)
    console.log(`   4️⃣ Removing popups...`);
    const popupSelectors = [
      '.popup',
      '.modal',
      '[class*="popup"]',
      '[class*="modal"]',
      '.overlay',
      '[class*="overlay"]',
      '.lightbox',
      '[class*="lightbox"]',
      '.backdrop',
      '[class*="backdrop"]'
    ];
    
    for (const selector of popupSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          await element.evaluate(el => el.style.display = 'none');
          console.log(`     ✅ Hidden popup: ${selector}`);
        }
      } catch (e) {
        // Ignore errors
      }
    }
    
    // Step 5: Remove cookie and GDPR banners
    console.log(`   5️⃣ Removing cookie and GDPR banners...`);
    const cookieSelectors = [
      '[data-testid="cookie-banner"]',
      '.cookie-banner',
      '.cookie-notice',
      '.gdpr-banner',
      '[class*="cookie"]',
      '[class*="gdpr"]',
      'button[class*="accept"]',
      'button[class*="dismiss"]',
      'button[class*="close"]',
      '#cookie-accept',
      '#accept-cookies',
      '.accept-cookies',
      '.btn-accept',
      '.cookie-accept',
      '.cookie-consent',
      '[class*="consent"]'
    ];
    
    for (const selector of cookieSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          await element.evaluate(el => el.style.display = 'none');
          console.log(`     ✅ Hidden cookie banner: ${selector}`);
        }
      } catch (e) {
        // Ignore errors
      }
    }
    
    // Step 6: Capture screenshot
    console.log(`   6️⃣ Capturing screenshot...`);
    await page.screenshot({ 
      path: outputPath,
      fullPage: true
    });
    
    await page.close();
    
    // Step 7: Save to folder (already done with outputPath)
    console.log(`   7️⃣ Saved to: ${path.basename(outputPath)}`);
    
    // Step 8: End process and wait 10 seconds
    console.log(`   8️⃣ Waiting 10 seconds before next...`);
    await page.waitForTimeout(10000);
    
    console.log(`   ✅ SUCCESS: ${project.title}`);
    return true;
    
  } catch (error) {
    console.log(`   ❌ FAILED: ${project.title} - ${error.message}`);
    return false;
  }
}

// Main function
async function capture10Screenshots() {
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const screenshotsDir = path.join(__dirname, 'captured-screenshots');
  
  // Ensure screenshots directory exists
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  
  let successCount = 0;
  let failCount = 0;
  
  console.log(`\n🚀 Starting capture of 10 screenshots...`);
  
  for (let i = 0; i < projectsToCapture.length; i++) {
    const project = projectsToCapture[i];
    const filename = createFilename(project.title) + '.png';
    const outputPath = path.join(screenshotsDir, filename);
    
    console.log(`\n📸 Screenshot ${i + 1}/10`);
    
    const success = await captureScreenshot(browser, project, outputPath);
    
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  await browser.close();
  
  console.log(`\n📊 FINAL RESULTS:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📁 Screenshots saved to: ${screenshotsDir}`);
  console.log(`\n🔄 Ready for next batch or instructions!`);
}

// Run the capture
capture10Screenshots().catch(console.error);


