const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  
  await page.goto('https://bernard-loiseau.com/', {waitUntil: 'networkidle', timeout: 30000});
  
  // Wait longer for background images and CSS to load
  await page.waitForTimeout(8000);
  
  await page.evaluate(() => {
    document.querySelectorAll('.cookie-banner, .popup, .modal, .overlay, [class*="cookie"], [class*="popup"]').forEach(el => el.remove());
  });
  
  await page.screenshot({
    path: 'captured-screenshots/bernard-loiseau-timing.png', 
    fullPage: false
  });
  
  await browser.close();
  console.log('✅ Done - with better timing');
})();
