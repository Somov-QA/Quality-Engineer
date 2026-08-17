import { check } from 'k6';
import k6Browser from 'k6/browser';   // импортируем весь модуль

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

export default async function () {
    // Берём настоящий объект браузера из экспорта
    const browser = k6Browser.browser;
    const page = await browser.newPage();

    try {
        await page.goto('https://somovstudio.github.io/test.html');
        await page.fill('#login', 'admin');
        await page.fill('#pass', '0000');
        await page.click('#buttonLogin');
        await page.waitForSelector('#result', { state: 'visible' });
        const resultText = await page.textContent('#textarea');
        console.log(resultText);
        check(resultText, {
            'successful login': (text) => text.includes('Вы успешно авторизованы'),
        });
    } finally {
        await page.close();   // страница закроется, браузер закроется автоматически
    }
}