const { chromium } = require('playwright');
const fs = require('fs');

const projects = JSON.parse(fs.readFileSync('projects-import.json', 'utf8'));
const projectsWithUrls = projects.filter(p => p.urlPath && p.urlPath.startsWith('http'));

let currentIndex = 0;
const screenshotsDir = 'captured-screenshots';
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir);

async function captureOne() {
  if (currentIndex >= projectsWithUrls.length) {
    console.log('✅ All done!');
    return;
  }
  
  const project = projectsWithUrls[currentIndex];
  const filename = project.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') + '.png';
  const outputPath = `${screenshotsDir}/${filename}`;
  
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  Skipping ${project.title} (already exists)`);
    currentIndex++;
    return captureOne();
  }
  
  console.log(`📸 ${currentIndex + 1}/${projectsWithUrls.length}: ${project.title}`);
  
  try {
    const browser = await chromium.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(project.urlPath, {waitUntil: 'networkidle', timeout: 30000});
    await page.waitForTimeout(5000);
    await page.screenshot({path: outputPath, fullPage: true});
    await browser.close();
    console.log(`✅ Success: ${filename}`);
  } catch (error) {
    console.log(`❌ Failed: ${error.message}`);
  }
  
  currentIndex++;
  setTimeout(captureOne, 2000); // 2 second pause between captures
}

captureOne();
