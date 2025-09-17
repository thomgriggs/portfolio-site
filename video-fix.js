const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  
  await page.goto('https://bernard-loiseau.com/', {waitUntil: 'domcontentloaded', timeout: 15000});
  
  // Wait for video to load
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(10000);
  
  // Pause any videos and wait for them to load
  await page.evaluate(() => {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.pause();
      video.currentTime = 0; // Go to first frame
    });
  });
  
  await page.waitForTimeout(5000); // Wait for video frame to load
  
  // Remove popups
  await page.evaluate(() => {
    document.querySelectorAll('.cookie-banner, .popup, .modal, .overlay, [class*="cookie"], [class*="popup"]').forEach(el => el.remove());
  });
  
  await page.screenshot({
    path: 'captured-screenshots/bernard-loiseau-video-fix.png', 
    fullPage: false
  });
  
  await browser.close();
  console.log('✅ Done - video paused and captured');
})();
