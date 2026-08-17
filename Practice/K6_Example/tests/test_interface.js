import { check } from 'k6';
import browser from 'k6/browser';   // ← новый импорт

export const options = {
    scenarios: {
        ui: {
            executor: 'constant-vus',
            vus: 5,
            duration: '5s',
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
};

export default async function () {   // ← функция теперь async
    const page = await browser.newPage();   // ← await

    try {
        await page.goto('https://somovstudio.github.io/test.html');
        await page.fill('#login', 'admin');
        await page.fill('#pass', '0000');
        await page.click('#buttonLogin');
        await page.waitForSelector('#result', { state: 'visible' });
        
        const resultText = await page.textContent('#textarea');
        check(resultText, {
            'successful login': (text) => text.includes('Вы успешно авторизованы'),
        });
    } finally {
        await page.close();   // ← await
    }
}