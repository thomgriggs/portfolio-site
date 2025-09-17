const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  
  await page.goto('https://bernard-loiseau.com/', {waitUntil: 'domcontentloaded', timeout: 15000});
  
  // Wait for images to load
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(8000); // Wait for background images
  
  await page.evaluate(() => {
    document.querySelectorAll('.cookie-banner, .popup, .modal, .overlay, [class*="cookie"], [class*="popup"]').forEach(el => el.remove());
  });
  
  await page.screenshot({
    path: 'captured-screenshots/bernard-loiseau-final-working.png', 
    fullPage: false
  });
  
  await browser.close();
  console.log('✅ Done - with background loading');
})();
