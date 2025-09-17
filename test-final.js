const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  
  await page.goto('https://bernard-loiseau.com/', {waitUntil: 'domcontentloaded', timeout: 15000});
  
  // Wait for images to load completely
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(12000); // Longer wait for background images
  
  // More aggressive cookie/popup removal
  await page.evaluate(() => {
    // Remove all common popup/cookie elements
    const selectors = [
      '.cookie-banner', '.cookie-notice', '.gdpr-banner', '.cookie-consent',
      '.popup', '.modal', '.overlay', '.lightbox', '.backdrop',
      '[class*="cookie"]', '[class*="popup"]', '[class*="modal"]',
      '[class*="overlay"]', '[class*="banner"]', '[class*="consent"]',
      'button[class*="accept"]', 'button[class*="close"]', 'button[class*="dismiss"]',
      '.btn-accept', '.btn-close', '.accept-cookies', '.cookie-accept',
      '#cookie-accept', '#accept-cookies', '.cookie-policy'
    ];
    
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.opacity = '0';
        el.remove();
      });
    });
  });
  
  // Wait a bit more after removal
  await page.waitForTimeout(2000);
  
  await page.screenshot({
    path: 'captured-screenshots/bernard-loiseau-final.png', 
    fullPage: false
  });
  
  await browser.close();
  console.log('✅ Done - final version');
})();
