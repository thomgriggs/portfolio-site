const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  
  await page.goto('https://bhfparis.com/', {waitUntil: 'domcontentloaded', timeout: 15000});
  await page.waitForTimeout(8000);
  
  // Target the specific cookie widget
  await page.evaluate(() => {
    // Remove the axeptio widget class from HTML
    document.documentElement.classList.remove('axeptio-widget--open');
    
    // Remove any axeptio widget elements
    document.querySelectorAll('[class*="axeptio"], [id*="axeptio"]').forEach(el => el.remove());
    
    // Remove any cookie consent widgets
    document.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="gdpr"]').forEach(el => el.remove());
  });
  
  await page.screenshot({
    path: 'captured-screenshots/bhf-paris-target-axeptio.png', 
    fullPage: false
  });
  
  await browser.close();
  console.log('✅ Done - targeted axeptio widget');
})();
