const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Configuration
const SCREENSHOT_DIR = './screenshots';
const PUBLIC_SCREENSHOT_DIR = './apps/site/public/screenshots';
const VIEWPORT_WIDTH = 1280;
const VIEWPORT_HEIGHT = 720;
const DELAY_MS = 3000;

// Ensure directories exist
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}
if (!fs.existsSync(PUBLIC_SCREENSHOT_DIR)) {
  fs.mkdirSync(PUBLIC_SCREENSHOT_DIR, { recursive: true });
}

// Projects that we know work
const projects = [
  {
    name: 'Optimum RV',
    baseUrl: 'https://optimumrv.com',
    pages: [
      { path: '', name: 'homepage' },
      { path: '/inventory', name: 'inventory' },
      { path: '/about', name: 'about' },
      { path: '/contact', name: 'contact' },
      { path: '/financing', name: 'financing' }
    ]
  },
  {
    name: 'Alma Hotel',
    baseUrl: 'https://almahotel.fr',
    pages: [
      { path: '', name: 'homepage' },
      { path: '/chambres', name: 'rooms' },
      { path: '/restaurant', name: 'restaurant' },
      { path: '/spa', name: 'spa' },
      { path: '/contact', name: 'contact' }
    ]
  }
];

async function takeScreenshot(browser, project, page, pageIndex, totalPages) {
  const fullPage = await browser.newPage();
  
  try {
    const url = `${project.baseUrl}${page.path}`;
    console.log(`📸 [${pageIndex + 1}/${totalPages}] Capturing ${project.name} - ${page.name}...`);
    console.log(`    🔗 URL: ${url}`);
    
    // Set viewport
    await fullPage.setViewportSize({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT });
    
    // Navigate to the page
    console.log(`    ⏳ Loading page...`);
    await fullPage.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
    
    // Wait for page to fully load
    console.log(`    ⏳ Waiting for page to load...`);
    await fullPage.waitForTimeout(DELAY_MS);
    
    // Handle cookie banners and popups
    console.log(`    🍪 Checking for popups/cookies...`);
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
        'button:has-text("Close")'
      ];
      
      for (const selector of cookieSelectors) {
        try {
          await fullPage.click(selector, { timeout: 2000 });
          console.log(`    ✅ Clicked popup: ${selector}`);
          break;
        } catch (e) {
          // Continue to next selector
        }
      }
      
      await fullPage.waitForTimeout(1000);
    } catch (e) {
      console.log(`    ⚠️  No popups found`);
    }
    
    // Take screenshot
    console.log(`    📸 Taking screenshot...`);
    const filename = `${project.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${page.name}.png`;
    const filepath = path.join(SCREENSHOT_DIR, filename);
    const publicFilepath = path.join(PUBLIC_SCREENSHOT_DIR, filename);
    
    await fullPage.screenshot({ 
      path: filepath,
      fullPage: false,
      type: 'png'
    });
    
    // Copy to public directory
    fs.copyFileSync(filepath, publicFilepath);
    
    console.log(`    ✅ SUCCESS: ${filename}`);
    return { success: true, filename, project: project.name, page: page.name };
    
  } catch (error) {
    console.log(`    ❌ FAILED: ${error.message}`);
    return { success: false, error: error.message, project: project.name, page: page.name };
  } finally {
    await fullPage.close();
  }
}

async function captureWorkingMultiple() {
  console.log('🚀 Starting WORKING SITES multiple pages capture...');
  console.log(`📦 Processing ${projects.length} working projects with multiple pages`);
  console.log('');
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const allResults = [];
  
  // Process each project
  for (let projectIndex = 0; projectIndex < projects.length; projectIndex++) {
    const project = projects[projectIndex];
    console.log(`\n🏨 Processing ${project.name}...`);
    console.log(`📄 ${project.pages.length} pages to capture`);
    console.log('=' .repeat(50));
    
    const projectResults = [];
    
    // Process each page for this project
    for (let pageIndex = 0; pageIndex < project.pages.length; pageIndex++) {
      const page = project.pages[pageIndex];
      const result = await takeScreenshot(browser, project, page, pageIndex, project.pages.length);
      projectResults.push(result);
      
      // Small delay between pages
      if (pageIndex < project.pages.length - 1) {
        console.log(`⏳ Waiting 2 seconds before next page...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    allResults.push(...projectResults);
    
    // Wait between projects
    if (projectIndex < projects.length - 1) {
      console.log(`\n⏳ Waiting 5 seconds before next project...`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  await browser.close();
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 WORKING SITES SUMMARY');
  console.log('='.repeat(60));
  
  const successful = allResults.filter(r => r.success);
  const failed = allResults.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}/${allResults.length}`);
  console.log(`❌ Failed: ${failed.length}/${allResults.length}`);
  
  if (successful.length > 0) {
    console.log('\n📸 Screenshots captured:');
    successful.forEach(r => console.log(`  ✅ ${r.filename} (${r.project} - ${r.page})`));
  }
  
  if (failed.length > 0) {
    console.log('\n❌ Failed captures:');
    failed.forEach(r => console.log(`  ❌ ${r.project} - ${r.page}: ${r.error}`));
  }
  
  console.log(`\n🎉 Working sites multiple pages capture complete!`);
}

// Run the working sites capture
captureWorkingMultiple().catch(console.error);
