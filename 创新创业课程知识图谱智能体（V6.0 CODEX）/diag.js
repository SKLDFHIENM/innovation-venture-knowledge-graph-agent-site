const { chromium } = require('playwright');
(async () => {
    try {
        const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true });
        const page = await browser.newPage();
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
        
        console.log('--- Loading activities.html ---');
        await page.goto('http://127.0.0.1:8000/activities.html');
        
        const cards = await page.$$('.activity-card');
        console.log('Cards count:', cards.length);
        if (cards.length > 0) {
            console.log('Clicking the first activity card...');
            await cards[0].click();
            
            await page.waitForTimeout(500);
            const modalVisible = await page.$eval('#activity-detail-modal', m => m.style.display);
            console.log('Activity detail modal display style:', modalVisible);
            
            const modalButtons = await page.$$eval('#activity-modal-content button', el => el.map(b => ({ text: b.textContent.trim(), onclick: b.getAttribute('onclick') })));
            console.log('Modal action buttons:', modalButtons);
        }
        await browser.close();
    } catch (e) {
        console.error('ERROR:', e);
    }
})();
