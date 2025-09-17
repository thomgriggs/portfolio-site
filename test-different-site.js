const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  
  // Try a different site from our list
  await page.goto('https://bhfparis.com/', {waitUntil: 'domcontentloaded', timeout: 15000});
  await page.waitForTimeout(5000);
  
  await page.evaluate(() => {
    document.querySelectorAll('.cookie-banner, .popup, .modal, .overlay, [class*="cookie"], [class*="popup"]').forEach(el => el.remove());
  });
  
  await page.screenshot({
    path: 'captured-screenshots/bhf-paris-test.png', 
    fullPage: false
  });
  
  await browser.close();
  console.log('✅ Done - different site test');
})();
