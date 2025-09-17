const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  
  await page.goto('https://bhfparis.com/', {waitUntil: 'domcontentloaded', timeout: 15000});
  await page.waitForTimeout(8000);
  
  // Inspect what cookie elements actually exist
  const cookieElements = await page.evaluate(() => {
    const elements = [];
    document.querySelectorAll('*').forEach(el => {
      const text = el.textContent?.toLowerCase() || '';
      const className = el.className?.toLowerCase() || '';
      const id = el.id?.toLowerCase() || '';
      
      if (text.includes('cookie') || text.includes('policy') || text.includes('consent') || 
          className.includes('cookie') || className.includes('policy') || className.includes('consent') ||
          id.includes('cookie') || id.includes('policy') || id.includes('consent')) {
        elements.push({
          tag: el.tagName,
          text: text.substring(0, 100),
          className: className,
          id: id
        });
      }
    });
    return elements;
  });
  
  console.log('Cookie elements found:', cookieElements);
  
  await browser.close();
})();
