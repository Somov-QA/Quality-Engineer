import { check, sleep } from 'k6';
import k6Browser from 'k6/browser';

export const options = {
    scenarios: {
        ui: {
            executor: 'constant-vus',
            vus: 2,
            duration: '10s',
            gracefulStop: '60s',
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
};

export default async function () {
    const browser = k6Browser.browser;
    const page = await browser.newPage();

    try {
        await page.goto('https://somovstudio.github.io/test.html', { timeout: 60000 });

        await page.fill('#login', 'admin');
        await page.fill('#pass', '0000');

        await page.waitForSelector('#buttonLogin', { state: 'visible' });
        await page.click('#buttonLogin', { force: true });

        await page.waitForSelector('#result', { state: 'visible', timeout: 10000 });

        await page.waitForFunction(
            (sel) => {
                const el = document.querySelector(sel);
                return el && el.value && el.value.trim().length > 0;
            },
            { timeout: 10000 },
            '#textarea'
        );

        const resultText = await page.inputValue('#textarea');
        console.log('🔍 Текст из #textarea:', resultText);

        check(resultText, {
            'successful login': (text) => text.includes('Вы успешно авторизованы'),
        });

    } finally {
        await page.waitForTimeout(2000);
        await page.close();
        // если VU=1, можно добавить: await browser.close();
    }
}