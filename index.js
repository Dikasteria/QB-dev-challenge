const puppeteer = require('puppeteer');
const { performance } = require('perf_hooks');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://quantbet.com/quiz/dev', { waitUntil: 'domcontentloaded'});
    
    const data = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('#quiz strong'))
        return tds.map(td => td.textContent)
    });
    
    var gcd = function(a, b) {
        if (b == 0) {   
            return a;
        }
    return gcd(b, a % b);
    };
      
    const result = gcd(data[0], data[1]);
    
    await page.$eval('input[name=divisor]', (el, result) => {el.value = result}, result);
    await page.click('button[type="submit"]')

  })();
