import { check } from 'k6';
import { browser } from 'k6/browser';

export const options = {
    scenarios: {
        ui: {
            executor: 'constant-vus',   // постоянное число VU
            vus: 10,                    // 10 пользователей
            duration: '30s',            // тест длится 30 секунд
            gracefulStop: '30s',        // время на завершение после окончания
            options: {                  // настройка браузера
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
};

/*
export const options = {
    scenarios: {
        ui: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 10 }, // за 30 секунд выйти на 100 VU
            ],
            gracefulStop: '30s',
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
};
*/

export default async function () {
    const page = await browser.newPage();

    try {
        await page.goto('http://localhost/Test_API/auth.html');

        // Заполняем поля формы
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

        const resultText = await page.inputValue('#textarea');
        console.log('🔍 Текст из #textarea:', resultText);

        check(resultText, {
            'successful login': (text) => text.includes('Вы успешно авторизованы'),
        });

    } finally {
        await page.close();
    }
}