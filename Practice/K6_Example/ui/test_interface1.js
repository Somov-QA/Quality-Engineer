import { check } from 'k6';
import k6Browser from 'k6/browser';

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
    const browser = k6Browser.browser;
    const page = await browser.newPage();

    // Логируем консоль браузера
    //page.on('console', (msg) => {
    //    console.log('🖥️ Browser log:', msg.text());
    //});

    try {
        await page.goto('https://somovstudio.github.io/test.html');

        await page.fill('#login', 'admin');
        await page.fill('#pass', '0000');

        // Убедимся, что кнопка кликабельна
        await page.waitForSelector('#buttonLogin', { state: 'visible' });
        await page.click('#buttonLogin', { force: true }); // принудительный клик

        // Ждём появления #result
        await page.waitForSelector('#result', { state: 'visible', timeout: 10000 });

        // Ждём, когда в #textarea появится текст
        await page.waitForFunction(
            (sel) => {
                const el = document.querySelector(sel);
                return el && el.value && el.value.trim().length > 0;
            },
            { timeout: 10000 },
            '#textarea'
        );

        const resultText = await page.inputValue('#textarea'); // используем inputValue для textarea
        console.log('🔍 Текст из #textarea:', resultText);

        check(resultText, {
            'successful login': (text) => text.includes('Вы успешно авторизованы'),
        });

    } finally {
        await page.close();
    }
}