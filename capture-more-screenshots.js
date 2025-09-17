const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Configuration
const SCREENSHOT_DIR = './screenshots';
const VIEWPORT_WIDTH = 1280;
const VIEWPORT_HEIGHT = 720;
const DELAY_MS = 5000; // Longer delay for slow sites
const MAX_CONCURRENT = 2; // Fewer concurrent for problematic sites

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Projects that failed or need retry
const projects = [
  { name: 'Hotel Palombaggia', url: 'https://hotelpalombaggia.com' },
  { name: 'Maison Heler', url: 'https://maisonheler.com' },
  { name: '1er Etage', url: 'https://1eretage.com' },
  // Add more projects as needed
];

async function takeScreenshot(browser, project, index) {
  const page = await browser.newPage();
  
  try {
    console.log(`📸 Capturing ${project.name} (${index + 1}/${projects.length})...`);
    
    // Set viewport
    await page.setViewportSize({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT });
    
    // Navigate to the page with longer timeout
    await page.goto(project.url, { 
      waitUntil: 'domcontentloaded', // Less strict than networkidle
      timeout: 60000 // 60 seconds
    });
    
    // Wait for page to fully load
    await page.waitForTimeout(DELAY_MS);
    
    // Handle cookie banners and popups
    try {
      const cookieSelectors = [
        'button[data-testid="cookie-accept"]',
        'button[id*="accept"]',
        'button[class*="accept"]',
        'button[class*="cookie"]',
        '#cookie-accept',
        '.cookie-accept',
        'button:has-text("Accept")',
        'button:has-text("OK")',
        'button:has-text("I agree")',
        'button:has-text("Continue")',
        'button:has-text("Got it")'
      ];
      
      for (const selector of cookieSelectors) {
        try {
          await page.click(selector, { timeout: 3000 });
          console.log(`  ✅ Clicked cookie button: ${selector}`);
          break;
        } catch (e) {
          // Continue to next selector
        }
      }
      
      // Wait a bit after clicking cookies
      await page.waitForTimeout(2000);
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
  console.log('🚀 Starting screenshot capture (retry)...');
  console.log(`📁 Screenshots will be saved to: ${SCREENSHOT_DIR}`);
  console.log(`📐 Viewport: ${VIEWPORT_WIDTH}x${VIEWPORT_HEIGHT}`);
  console.log(`⏱️  Delay per page: ${DELAY_MS}ms`);
  console.log('');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });
  
  const results = [];
  
  // Process projects one by one for problematic sites
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    console.log(`📦 Processing ${project.name}...`);
    
    const result = await takeScreenshot(browser, project, i);
    results.push(result);
    
    // Wait between captures
    if (i < projects.length - 1) {
      console.log('⏳ Waiting before next capture...');
      await new Promise(resolve => setTimeout(resolve, 3000));
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
