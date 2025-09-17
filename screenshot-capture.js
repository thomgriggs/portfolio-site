const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Configuration
const SCREENSHOT_DIR = './screenshots';
const VIEWPORT_WIDTH = 1280;
const VIEWPORT_HEIGHT = 720;
const DELAY_MS = 3000; // Wait for page to load
const MAX_CONCURRENT = 3; // Limit concurrent screenshots

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// List of projects with URLs to screenshot
const projects = [
  { name: 'Hotel Palombaggia', url: 'https://hotelpalombaggia.com' },
  { name: 'Maison Heler', url: 'https://maisonheler.com' },
  { name: 'Optimum RV', url: 'https://optimumrv.com' },
  { name: 'Alma Hotel', url: 'https://almahotel.fr' },
  { name: '1er Etage', url: 'https://1eretage.com' },
  { name: 'Altai Courchevel', url: 'https://altai-courchevel.com' },
  // Add more projects as needed
];

async function takeScreenshot(browser, project, index) {
  const page = await browser.newPage();
  
  try {
    console.log(`📸 Capturing ${project.name} (${index + 1}/${projects.length})...`);
    
    // Set viewport
    await page.setViewportSize({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT });
    
    // Navigate to the page
    await page.goto(project.url, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Wait for page to fully load
    await page.waitForTimeout(DELAY_MS);
    
    // Handle cookie banners and popups
    try {
      // Try to find and click common cookie accept buttons
      const cookieSelectors = [
        'button[data-testid="cookie-accept"]',
        'button[id*="accept"]',
        'button[class*="accept"]',
        'button[class*="cookie"]',
        '#cookie-accept',
        '.cookie-accept',
        'button:has-text("Accept")',
        'button:has-text("OK")',
        'button:has-text("I agree")'
      ];
      
      for (const selector of cookieSelectors) {
        try {
          await page.click(selector, { timeout: 2000 });
          console.log(`  ✅ Clicked cookie button: ${selector}`);
          break;
        } catch (e) {
          // Continue to next selector
        }
      }
      
      // Wait a bit after clicking cookies
      await page.waitForTimeout(1000);
    } catch (e) {
      console.log(`  ⚠️  No cookie banner found or handled`);
    }
    
    // Take screenshot
    const filename = `${project.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
    const filepath = path.join(SCREENSHOT_DIR, filename);
    
    await page.screenshot({ 
      path: filepath,
      fullPage: false, // Only capture viewport
      type: 'png'
    });
    
    console.log(`  ✅ Saved: ${filename}`);
    return { success: true, filename, project: project.name };
    
  } catch (error) {
    console.error(`  ❌ Error capturing ${project.name}:`, error.message);
    return { success: false, error: error.message, project: project.name };
  } finally {
    await page.close();
  }
}

async function captureAllScreenshots() {
  console.log('🚀 Starting screenshot capture...');
  console.log(`📁 Screenshots will be saved to: ${SCREENSHOT_DIR}`);
  console.log(`📐 Viewport: ${VIEWPORT_WIDTH}x${VIEWPORT_HEIGHT}`);
  console.log(`⏱️  Delay per page: ${DELAY_MS}ms`);
  console.log('');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const results = [];
  
  // Process projects in batches to avoid overwhelming the system
  for (let i = 0; i < projects.length; i += MAX_CONCURRENT) {
    const batch = projects.slice(i, i + MAX_CONCURRENT);
    console.log(`📦 Processing batch ${Math.floor(i / MAX_CONCURRENT) + 1}...`);
    
    const batchPromises = batch.map((project, batchIndex) => 
      takeScreenshot(browser, project, i + batchIndex)
    );
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    // Small delay between batches
    if (i + MAX_CONCURRENT < projects.length) {
      console.log('⏳ Waiting before next batch...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  await browser.close();
  
  // Summary
  console.log('\n📊 Screenshot Summary:');
  console.log('====================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  
  if (successful.length > 0) {
    console.log('\n📸 Screenshots saved:');
    successful.forEach(r => console.log(`  - ${r.filename}`));
  }
  
  if (failed.length > 0) {
    console.log('\n❌ Failed captures:');
    failed.forEach(r => console.log(`  - ${r.project}: ${r.error}`));
  }
  
  console.log(`\n📁 All screenshots saved to: ${path.resolve(SCREENSHOT_DIR)}`);
}

// Run the screenshot capture
captureAllScreenshots().catch(console.error);
