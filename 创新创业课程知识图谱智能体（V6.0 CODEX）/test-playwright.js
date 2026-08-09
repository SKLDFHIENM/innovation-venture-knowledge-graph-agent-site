import { chromium } from 'playwright';
const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
});
const page = await browser.newPage();
page.on('response', res => {
    if (res.status() >= 400) {
        console.log(`[HTTP ERROR] url: ${res.url()} -> status: ${res.status()}`);
    }
});
page.on('console', msg => {
    console.log(`[CONSOLE] type: ${msg.type()} -> text: ${msg.text()}`);
});
console.log('Navigating to activities.html...');
await page.goto('http://localhost:8000/activities.html');
await page.waitForTimeout(2000);
await browser.close();
