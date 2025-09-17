const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  
  await page.goto('https://bernard-loiseau.com/', {waitUntil: 'domcontentloaded', timeout: 15000});
  
  // Wait LONGER for background to load BEFORE removing anything
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(15000); // 15 seconds for background images
  
  // NOW remove popups after background is loaded
  await page.evaluate(() => {
    document.querySelectorAll('.cookie-banner, .popup, .modal, .overlay, [class*="cookie"], [class*="popup"]').forEach(el => el.remove());
  });
  
  await page.screenshot({
    path: 'captured-screenshots/bernard-loiseau-correct-timing.png', 
    fullPage: false
  });
  
  await browser.close();
  console.log('✅ Done - background loads first, then remove popups');
})();
