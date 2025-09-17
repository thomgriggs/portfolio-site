const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor',
      '--block-third-party-cookies',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding'
    ]
  });
  
  const page = await browser.newPage();
  
  // Block cookie banners and ads
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (url.includes('cookie') || url.includes('consent') || url.includes('gdpr') || url.includes('privacy')) {
      route.abort();
    } else {
      route.continue();
    }
  });
  
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  
  await page.goto('https://bhfparis.com/', {waitUntil: 'domcontentloaded', timeout: 15000});
  await page.waitForTimeout(5000);
  
  await page.screenshot({
    path: 'captured-screenshots/bhf-paris-brave-style.png', 
    fullPage: false
  });
  
  await browser.close();
  console.log('✅ Done - Brave-style blocking');
})();
