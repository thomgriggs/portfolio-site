const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// Directory to save screenshots
const screenshotsDir = path.join(__dirname, 'captured-screenshots');

// Ensure screenshots directory exists
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

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
async function captureScreenshot(browser, projectName, url, outputPath) {
  let page = null;
  
  try {
    console.log(`📸 Capturing ${projectName} from ${url}...`);

    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    page = await context.newPage();

    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 60000
    });

    console.log(`   ⏳ Waiting 10 seconds for content to load...`);
    await page.waitForTimeout(10000);

    console.log(`   🧹 Removing popups and banners...`);
    const popupSelectors = [
      '[data-testid="cookie-banner"]', '.cookie-banner', '.cookie-notice', '.gdpr-banner',
      '.cookie-consent', '.cookie-accept', '.accept-cookies', '.cookie-policy',
      '#cookie-accept', '#accept-cookies', '.btn-accept', '.cookie-accept',
      '.popup', '.modal', '.overlay', '.lightbox', '.backdrop',
      '[class*="popup"]', '[class*="modal"]', '[class*="overlay"]', '[class*="lightbox"]',
      '[class*="backdrop"]', '[class*="cookie"]', '[class*="banner"]',
      'button[class*="close"]', 'button[class*="dismiss"]', 'button[class*="accept"]',
      '.close', '.dismiss', '.accept', '.btn-close', '.modal-close'
    ];

    let popupsRemoved = 0;
    for (const selector of popupSelectors) {
      try {
        const elements = await page.$$(selector);
        for (const element of elements) {
          try {
            await element.click({ timeout: 1000 });
            popupsRemoved++;
          } catch (clickError) {
            try {
              await page.evaluate((s) => {
                const elements = document.querySelectorAll(s);
                elements.forEach(el => {
                  el.style.display = 'none';
                  el.style.visibility = 'hidden';
                  el.style.opacity = '0';
                });
              }, selector);
              popupsRemoved++;
            } catch (hideError) {
              // Ignore if can't hide either
            }
          }
        }
      } catch (e) {
        // Ignore errors for individual selectors
      }
    }

    if (popupsRemoved > 0) {
      console.log(`   ✅ Removed ${popupsRemoved} popups/banners`);
      await page.waitForTimeout(2000);
    }

    console.log(`   📸 Taking screenshot...`);
    await page.screenshot({
      path: outputPath,
      fullPage: true,
      quality: 90
    });

    await context.close();
    console.log(`   ✅ Successfully captured: ${projectName}`);
    return { success: true, error: null };

  } catch (error) {
    console.log(`   ❌ Failed to capture ${projectName}: ${error.message}`);
    
    if (page) {
      try {
        await page.close();
      } catch (e) {
        // Ignore cleanup errors
      }
    }
    
    return { success: false, error: error.message };
  }
}

async function captureBatch() {
  const projectsData = JSON.parse(fs.readFileSync('projects-import.json', 'utf8'));
  const projectsWithUrls = projectsData.filter(project => project.urlPath && project.urlPath.startsWith('http'));
  
  console.log(`📊 Found ${projectsWithUrls.length} projects with URLs`);
  
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor'
    ]
  });

  let successCount = 0;
  let failCount = 0;
  const failedProjects = [];

  try {
    const batchSize = 10;
    const projectsToProcess = projectsWithUrls.slice(0, batchSize);
    
    console.log(`🚀 Starting capture of ${projectsToProcess.length} screenshots...\n`);

    for (let i = 0; i < projectsToProcess.length; i++) {
      const project = projectsToProcess[i];
      const projectName = project.title;
      const url = project.urlPath;

      const filename = createFilename(projectName) + '.png';
      const outputPath = path.join(screenshotsDir, filename);

      if (fs.existsSync(outputPath)) {
        console.log(`⏭️  Skipping ${projectName} (screenshot already exists)`);
        successCount++;
        continue;
      }

      console.log(`\n📸 Screenshot ${i + 1}/${projectsToProcess.length}`);
      console.log(`🎯 Processing: ${projectName}`);
      console.log(`   URL: ${url}`);
      console.log(`   Output: ${filename}`);

      const result = await captureScreenshot(browser, projectName, url, outputPath);

      if (result.success) {
        successCount++;
        console.log(`   ✅ SUCCESS: ${projectName}`);
      } else {
        failCount++;
        failedProjects.push({ name: projectName, reason: result.error });
        console.log(`   ❌ FAILED: ${projectName} - ${result.error}`);
      }

      if (i < projectsToProcess.length - 1) {
        console.log(`   ⏳ Waiting 10 seconds before next capture...`);
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    }

  } catch (error) {
    console.error('❌ Error during batch capture:', error.message);
  } finally {
    await browser.close();
    
    console.log(`\n📊 FINAL RESULTS:`);
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   📁 Screenshots saved to: ${screenshotsDir}`);
    
    if (failedProjects.length > 0) {
      console.log(`\n❌ Failed projects:`);
      failedProjects.forEach(project => {
        console.log(`   - ${project.name}: ${project.reason}`);
      });
    }
    
    console.log(`\n🔄 Ready for next batch or instructions!`);
  }
}

captureBatch().catch(console.error);
