const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  console.log('📸 Capturing with better settings...');
  await page.goto('https://aubergedujeudepaumechantilly.fr/', {waitUntil: 'networkidle', timeout: 30000});
  
  await page.waitForTimeout(3000);
  
  // Remove popups
  const popupSelectors = [
    '.cookie-banner', '.cookie-notice', '.gdpr-banner', '.cookie-consent',
    '.popup', '.modal', '.overlay', '.lightbox', '.backdrop',
    '[class*="cookie"]', '[class*="popup"]', '[class*="modal"]',
    '[class*="overlay"]', '[class*="banner"]',
    'button[class*="accept"]', 'button[class*="close"]', 'button[class*="dismiss"]',
    '.btn-accept', '.btn-close', '.accept-cookies', '.cookie-accept'
  ];
  
  for (const selector of popupSelectors) {
    try {
      const elements = await page.$$(selector);
      for (const element of elements) {
        try {
          await element.click({ timeout: 1000 });
          console.log('✅ Clicked:', selector);
        } catch {
          await page.evaluate((s) => {
            document.querySelectorAll(s).forEach(el => {
              el.style.display = 'none';
              el.style.visibility = 'hidden';
              el.style.opacity = '0';
            });
          }, selector);
          console.log('✅ Hidden:', selector);
        }
      }
    } catch (e) {}
  }
  
  await page.waitForTimeout(2000);
  await page.screenshot({path: 'captured-screenshots/auberge-du-jeu-de-paume-chantilly.png', fullPage: true});
  await browser.close();
  console.log('✅ Done! Check the screenshot now.');
})();
