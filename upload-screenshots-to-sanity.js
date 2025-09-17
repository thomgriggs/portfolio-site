const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// Create Sanity client
const client = createClient({
  projectId: '669ljbt4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN // You'll need to set this
});

// Function to upload image to Sanity
async function uploadImageToSanity(imagePath, filename) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: filename,
      title: filename.replace('.png', ''),
      description: `Screenshot for ${filename.replace('.png', '')}`
    });
    
    return asset;
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.message);
    return null;
  }
}

// Function to update project with new image
async function updateProjectWithImage(projectId, imageAsset) {
  try {
    // First get the current project to see existing images
    const project = await client.getDocument(projectId);
    const currentImages = project.images || [];
    
    // Add the new image to the beginning of the array
    const updatedImages = [{
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imageAsset._id
      }
    }, ...currentImages];
    
    // Update the project
    await client
      .patch(projectId)
      .set({ images: updatedImages })
      .commit();
    
    console.log(`✅ Updated project with new image`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to update project:`, error.message);
    return false;
  }
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
    console.log(`  ✅ Screenshot captured: ${project.title}`);
    return true;
    
  } catch (error) {
    console.log(`  ❌ Failed to capture ${project.title}: ${error.message}`);
    return false;
  }
}

// Main function to process a small batch
async function processBatch() {
  console.log('🔍 Getting projects from Sanity...');
  
  // Get projects that have URLs but no images
  const projects = await client.fetch(`
    *[_type == "project" && defined(urlPath) && urlPath != "" && count(images) == 0] {
      _id,
      title,
      urlPath
    }[0...5]
  `);
  
  console.log(`📊 Found ${projects.length} projects to process`);
  
  if (projects.length === 0) {
    console.log('✅ No projects need screenshots!');
    return;
  }
  
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const screenshotsDir = path.join(__dirname, 'temp-screenshots');
  
  // Ensure temp directory exists
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  
  let successCount = 0;
  let failCount = 0;
  
  for (const project of projects) {
    console.log(`\n🎯 Processing: ${project.title}`);
    console.log(`   URL: ${project.urlPath}`);
    
    const filename = project.title.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.png';
    const tempPath = path.join(screenshotsDir, filename);
    
    // Capture screenshot
    const captured = await captureScreenshot(browser, project, tempPath);
    
    if (captured) {
      // Upload to Sanity
      console.log(`   📤 Uploading to Sanity...`);
      const asset = await uploadImageToSanity(tempPath, filename);
      
      if (asset) {
        // Update project
        const updated = await updateProjectWithImage(project._id, asset);
        
        if (updated) {
          successCount++;
          console.log(`   ✅ Successfully processed: ${project.title}`);
        } else {
          failCount++;
        }
      } else {
        failCount++;
      }
      
      // Clean up temp file
      fs.unlinkSync(tempPath);
    } else {
      failCount++;
    }
    
    // Delay between projects
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  await browser.close();
  
  console.log(`\n📊 Batch Summary:`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`\n🔄 Run this script again to process the next batch`);
}

// Check if token is set
if (!process.env.SANITY_API_TOKEN) {
  console.log('❌ Please set SANITY_API_TOKEN environment variable');
  console.log('   You can get a token from: https://sanity.io/manage');
  console.log('   Then run: export SANITY_API_TOKEN=your_token_here');
  process.exit(1);
}

// Run the batch
processBatch().catch(console.error);
