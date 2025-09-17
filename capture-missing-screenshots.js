const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Projects that need screenshots
const projectsToCapture = [
  {
    name: 'Hotel Palombaggia',
    url: null, // No URL available
    filename: 'hotel-palombaggia.png'
  },
  {
    name: 'Hotel Florida Paris',
    url: 'https://hotelfloridaparis.ro/',
    filename: 'hotel-florida-paris.png'
  },
  {
    name: 'Chateau de Sainte Feyre',
    url: 'https://chateaudesaintefeyre.com/',
    filename: 'chateau-de-sainte-feyre.png'
  }
];

async function captureScreenshots() {
  console.log('🚀 Starting screenshot capture for missing projects...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  });

  const results = {
    successful: [],
    failed: []
  };

  for (const project of projectsToCapture) {
    console.log(`📸 Capturing ${project.name}...`);
    
    // Skip projects without URLs
    if (!project.url) {
      console.log(`⏭️  Skipping ${project.name} - No URL available`);
      results.failed.push({ ...project, error: 'No URL available' });
      continue;
    }
    
    try {
      const page = await context.newPage();
      
      // Set timeout to 30 seconds
      await page.goto(project.url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      // Wait a bit for any dynamic content
      await page.waitForTimeout(2000);
      
      // Handle cookie banners if they exist
      try {
        await page.click('button:has-text("Accept")', { timeout: 3000 });
        await page.waitForTimeout(1000);
      } catch (e) {
        // No cookie banner found, continue
      }
      
      // Take screenshot
      const screenshotPath = path.join(__dirname, 'apps/site/public/screenshots', project.filename);
      await page.screenshot({ 
        path: screenshotPath,
        fullPage: true
        // Removed quality option for PNG
      });
      
      console.log(`✅ Successfully captured ${project.name}`);
      results.successful.push(project);
      
      await page.close();
      
    } catch (error) {
      console.log(`❌ Failed to capture ${project.name}: ${error.message}`);
      results.failed.push({ ...project, error: error.message });
    }
    
    // Small delay between captures
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  await browser.close();

  console.log('\n📊 Results Summary:');
  console.log(`✅ Successful: ${results.successful.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  
  if (results.successful.length > 0) {
    console.log('\n🎉 Successfully captured:');
    results.successful.forEach(project => {
      console.log(`  - ${project.name}`);
    });
  }
  
  if (results.failed.length > 0) {
    console.log('\n💥 Failed to capture:');
    results.failed.forEach(project => {
      console.log(`  - ${project.name}: ${project.error}`);
    });
  }

  return results;
}

// Run the capture
captureScreenshots().catch(console.error);
