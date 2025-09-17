const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 2200, height: 1200 });
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  
  await page.goto('https://bhfparis.com/', {waitUntil: 'domcontentloaded', timeout: 15000});
  await page.waitForTimeout(8000);
  
  await page.evaluate(() => {
    document.documentElement.classList.remove('axeptio-widget--open');
    document.querySelectorAll('[class*="axeptio"], [id*="axeptio"]').forEach(el => el.remove());
    document.querySelectorAll('[class*="cookie"], [class*="consent"], [class*="gdpr"]').forEach(el => el.remove());
  });
  
  await page.screenshot({
    path: 'captured-screenshots/bhf-paris-2200x1200.png', 
    fullPage: false
  });
  
  await browser.close();
  console.log('✅ Done - 2200x1200 dimensions');
})();
