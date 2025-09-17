const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Configuration
const SCREENSHOT_DIR = './screenshots';
const PUBLIC_SCREENSHOT_DIR = './apps/site/public/screenshots';
const VIEWPORT_WIDTH = 1280;
const VIEWPORT_HEIGHT = 720;
const DELAY_MS = 4000; // Wait for page to load
const BATCH_SIZE = 5; // Process 5 projects at a time
const BATCH_DELAY = 10000; // 10 seconds between batches

// Ensure directories exist
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}
if (!fs.existsSync(PUBLIC_SCREENSHOT_DIR)) {
  fs.mkdirSync(PUBLIC_SCREENSHOT_DIR, { recursive: true });
}

// Get all projects from Sanity
async function getProjectsFromSanity() {
  const { createClient } = require('@sanity/client');
  
  const client = createClient({
    projectId: '669ljbt4',
    dataset: 'production',
    apiVersion: '2025-01-01',
    useCdn: false,
    perspective: 'published',
  });

  try {
    const projects = await client.fetch(`
      *[_type == "project"] | order(featured desc, dateCreated desc) {
        _id, title, urlPath, featured
      }
    `);
    
    // Filter to only projects with valid URLs
    return projects.filter(project => 
      project.urlPath && 
      project.urlPath.startsWith('http') &&
      project.urlPath.includes('.')
    );
  } catch (error) {
    console.error('Error fetching projects from Sanity:', error);
    return [];
  }
}

async function takeScreenshot(browser, project, index, total) {
  const page = await browser.newPage();
  
  try {
    console.log(`📸 [${index + 1}/${total}] Capturing ${project.title}...`);
    
    // Set viewport
    await page.setViewportSize({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT });
    
    // Navigate to the page
    await page.goto(project.urlPath, { 
      waitUntil: 'domcontentloaded',
      timeout: 45000 // 45 seconds
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
        'button:has-text("Got it")',
        'button:has-text("Allow")',
        'button:has-text("Close")',
        '[data-testid="close"]',
        '.close-button',
        '#close'
      ];
      
      for (const selector of cookieSelectors) {
        try {
          await page.click(selector, { timeout: 2000 });
          console.log(`  ✅ Clicked: ${selector}`);
          break;
        } catch (e) {
          // Continue to next selector
        }
      }
      
      // Wait after clicking cookies
      await page.waitForTimeout(1000);
    } catch (e) {
      console.log(`  ⚠️  No popup handled`);
    }
    
    // Take screenshot
    const filename = `${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`;
    const filepath = path.join(SCREENSHOT_DIR, filename);
    const publicFilepath = path.join(PUBLIC_SCREENSHOT_DIR, filename);
    
    await page.screenshot({ 
      path: filepath,
      fullPage: false,
      type: 'png'
    });
    
    // Copy to public directory
    fs.copyFileSync(filepath, publicFilepath);
    
    console.log(`  ✅ Saved: ${filename}`);
    return { success: true, filename, project: project.title };
    
  } catch (error) {
    console.error(`  ❌ Error capturing ${project.title}:`, error.message);
    return { success: false, error: error.message, project: project.title };
  } finally {
    await page.close();
  }
}

async function processBatch(browser, projects, batchIndex, totalBatches) {
  console.log(`\n📦 Processing Batch ${batchIndex + 1}/${totalBatches} (${projects.length} projects)`);
  console.log('=' .repeat(60));
  
  const results = [];
  
  // Process projects in this batch
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const globalIndex = (batchIndex * BATCH_SIZE) + i;
    
    const result = await takeScreenshot(browser, project, globalIndex, projects.length);
    results.push(result);
    
    // Small delay between projects in same batch
    if (i < projects.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  return results;
}

async function captureAllScreenshots() {
  console.log('🚀 Starting comprehensive screenshot capture...');
  console.log(`📁 Screenshots will be saved to: ${SCREENSHOT_DIR}`);
  console.log(`📁 Public screenshots: ${PUBLIC_SCREENSHOT_DIR}`);
  console.log(`📐 Viewport: ${VIEWPORT_WIDTH}x${VIEWPORT_HEIGHT}`);
  console.log(`⏱️  Delay per page: ${DELAY_MS}ms`);
  console.log(`📦 Batch size: ${BATCH_SIZE} projects`);
  console.log(`⏳ Delay between batches: ${BATCH_DELAY}ms`);
  console.log('');
  
  // Get projects from Sanity
  console.log('📡 Fetching projects from Sanity...');
  const projects = await getProjectsFromSanity();
  
  if (projects.length === 0) {
    console.log('❌ No projects found with valid URLs');
    return;
  }
  
  console.log(`✅ Found ${projects.length} projects with valid URLs`);
  console.log('');
  
  // Split projects into batches
  const batches = [];
  for (let i = 0; i < projects.length; i += BATCH_SIZE) {
    batches.push(projects.slice(i, i + BATCH_SIZE));
  }
  
  console.log(`📊 Will process ${batches.length} batches of up to ${BATCH_SIZE} projects each`);
  console.log('');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor'
    ]
  });
  
  const allResults = [];
  
  // Process each batch
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const batchResults = await processBatch(browser, batch, i, batches.length);
    allResults.push(...batchResults);
    
    // Wait between batches (except for the last one)
    if (i < batches.length - 1) {
      console.log(`\n⏳ Waiting ${BATCH_DELAY/1000}s before next batch...`);
      await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
    }
  }
  
  await browser.close();
  
  // Final summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL SCREENSHOT SUMMARY');
  console.log('='.repeat(60));
  
  const successful = allResults.filter(r => r.success);
  const failed = allResults.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}/${allResults.length}`);
  console.log(`❌ Failed: ${failed.length}/${allResults.length}`);
  console.log(`📈 Success rate: ${Math.round((successful.length / allResults.length) * 100)}%`);
  
  if (successful.length > 0) {
    console.log('\n📸 Screenshots captured:');
    successful.forEach(r => console.log(`  ✅ ${r.filename}`));
  }
  
  if (failed.length > 0) {
    console.log('\n❌ Failed captures:');
    failed.forEach(r => console.log(`  ❌ ${r.project}: ${r.error}`));
  }
  
  console.log(`\n📁 Screenshots saved to: ${path.resolve(SCREENSHOT_DIR)}`);
  console.log(`📁 Public screenshots: ${path.resolve(PUBLIC_SCREENSHOT_DIR)}`);
  console.log('\n🎉 Screenshot capture complete!');
}

// Run the screenshot capture
captureAllScreenshots().catch(console.error);
