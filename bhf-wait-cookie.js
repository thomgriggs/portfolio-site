const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  
  await page.goto('https://bhfparis.com/', {waitUntil: 'domcontentloaded', timeout: 15000});
  
  // Wait for cookie policy to appear
  await page.waitForTimeout(8000);
  
  // Try to click accept button first
  try {
    await page.click('button[class*="accept"], .btn-accept, .accept-cookies, .cookie-accept', { timeout: 2000 });
    console.log('✅ Clicked accept button');
  } catch (e) {
    console.log('No accept button found');
  }
  
  // Then remove any remaining cookie elements
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
  
  await page.waitForTimeout(2000);
  
  await page.screenshot({
    path: 'captured-screenshots/bhf-paris-wait-cookie.png', 
    fullPage: false
  });
  
  await browser.close();
  console.log('✅ Done - waited for cookie policy then removed');
})();
