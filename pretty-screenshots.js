const { chromium } = require('playwright');
const fs = require('fs');

console.log('🎨 Pretty Screenshot Capture');
console.log('============================\n');

const projects = JSON.parse(fs.readFileSync('projects-import.json', 'utf8'));
const projectsWithUrls = projects.filter(p => p.urlPath && p.urlPath.startsWith('http'));

const screenshotsDir = 'captured-screenshots';
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir);

let currentIndex = 0;
let successCount = 0;
let failCount = 0;

function createFilename(projectName) {
  return projectName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function captureOne() {
  if (currentIndex >= projectsWithUrls.length) {
    console.log('\n🎉 FINAL RESULTS');
    console.log('================');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`📁 Saved to: ${screenshotsDir}/`);
    console.log('\n✨ All done!');
    return;
  }
  
  const project = projectsWithUrls[currentIndex];
  const filename = createFilename(project.title) + '.png';
  const outputPath = `${screenshotsDir}/${filename}`;
  
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  ${currentIndex + 1}/${projectsWithUrls.length}: ${project.title} (exists)`);
    successCount++;
    currentIndex++;
    setTimeout(captureOne, 500);
    return;
  }
  
  console.log(`📸 ${currentIndex + 1}/${projectsWithUrls.length}: ${project.title}`);
  
  try {
    const browser = await chromium.launch({headless: true});
    const page = await browser.newPage();
    
    await page.setViewportSize({ width: 1600, height: 1100 });
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    });
    
    await page.goto(project.urlPath, {waitUntil: 'domcontentloaded', timeout: 15000});
    await page.waitForTimeout(8000);
    
    await page.evaluate(() => {
      document.documentElement.classList.remove('axeptio-widget--open');
      document.querySelectorAll('[class*="axeptio"], [id*="axeptio"]').forEach(el => el.remove());
      document.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="gdpr"]').forEach(el => el.remove());
    });
    
    await page.screenshot({
      path: outputPath, 
      fullPage: false
    });
    
    await browser.close();
    console.log(`   ✅ ${filename}`);
    successCount++;
  } catch (error) {
    console.log(`   ❌ ${error.message}`);
    failCount++;
  }
  
  currentIndex++;
  setTimeout(captureOne, 2000);
}

console.log(`🚀 Starting capture of ${projectsWithUrls.length} screenshots`);
console.log(`📐 Dimensions: 1600x1100`);
console.log(`📁 Saving to: ${screenshotsDir}/\n`);

captureOne();
