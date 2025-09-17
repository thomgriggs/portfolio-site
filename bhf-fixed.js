const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  
  await page.goto('https://bhfparis.com/', {waitUntil: 'domcontentloaded', timeout: 15000});
  await page.waitForTimeout(5000);
  
  // More aggressive cookie policy removal
  await page.evaluate(() => {
    const selectors = [
      '.cookie-banner', '.cookie-notice', '.gdpr-banner', '.cookie-consent',
      '.popup', '.modal', '.overlay', '.lightbox', '.backdrop',
      '[class*="cookie"]', '[class*="popup"]', '[class*="modal"]',
      '[class*="overlay"]', '[class*="banner"]', '[class*="consent"]',
      '[class*="policy"]', '[class*="privacy"]', '[class*="gdpr"]',
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
  
  await page.screenshot({
    path: 'captured-screenshots/bhf-paris-fixed.png', 
    fullPage: false
  });
  
  await browser.close();
  console.log('✅ Done - BHF with cookie policy removed');
})();
