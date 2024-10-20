const puppeteer = require('puppeteer');

(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        await page.goto('https://www.hackerrank.com/', { waitUntil: 'networkidle2' });
        await page.setViewport({ width: 1080, height: 1024 });
        await page.screenshot({ path: 'hackerrank.png' });

        await delay(1000);
   
        await page.waitForSelector("#main > div.home22-intro > div > div > div > div > p:nth-child(2) > a:nth-child(1)");
        await page.click("#main > div.home22-intro > div > div > div > div > p:nth-child(2) > a:nth-child(1)");
        await delay(1000);

        await page.waitForSelector("#main > article > div > ul > li:nth-child(2) > a > svg");
        await page.click("#main > article > div > ul > li:nth-child(2) > a > svg");
        await delay(1000);

        await page.waitForSelector("#main > article > div > a");
        await page.click("#main > article > div > a");
        await delay(1000);

        const inputSelector = 'c-gbnqRc c-gbnqRc-kFASxh-state-error';
        await page.waitForSelector(inputSelector);
        await page.type(inputSelector, 'Vishal Nagar');
        await delay(2000);   
        
        const inputselect = '#react-aria4357937028-2868';
        await page.waitForSelector(inputselect);
        await page.type(inputselect, 'vishalnagar74405@gmail.com');
        delay(2000);

    } catch (error) {
        console.log("An error occurred:", error);
    } finally {
        await browser.close();
    }   
})();
