const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://thomgriggs-portfolio.vercel.app';
const PAGES = [
  { path: '/', name: 'home' },
  { path: '/projects', name: 'projects' },
  { path: '/about', name: 'about' },
  { path: '/contact', name: 'contact' },
  { path: '/notes', name: 'notes' },
  { path: '/archive', name: 'archive' }
];

async function takeScreenshots() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Set viewport for consistent screenshots
  await page.setViewport({
    width: 1200,
    height: 800,
    deviceScaleFactor: 2 // Higher quality
  });

  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  console.log('Taking full-page screenshots...');

  for (const pageInfo of PAGES) {
    try {
      console.log(`Capturing ${pageInfo.name} page...`);
      
      await page.goto(`${BASE_URL}${pageInfo.path}`, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Wait a bit for any animations or dynamic content
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Take full page screenshot
      const screenshotPath = path.join(screenshotsDir, `${pageInfo.name}-page.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true,
        type: 'png'
      });

      console.log(`✅ Screenshot saved: ${screenshotPath}`);
    } catch (error) {
      console.error(`❌ Error capturing ${pageInfo.name}:`, error.message);
    }
  }

  await browser.close();
  console.log('\n🎉 All screenshots complete!');
  console.log(`📁 Screenshots saved in: ${screenshotsDir}`);
}

takeScreenshots().catch(console.error);
