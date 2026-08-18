import { check } from 'k6';
import { browser } from 'k6/browser';

// Загрузка страницы с повторами при сетевых ошибках (например, ERR_CONNECTION_RESET)
async function gotoWithRetry(page, url, retries = 2) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            await page.goto(url, { timeout: 30000 });
            return; // успех — выходим
        } catch (err) {
            console.log(`⚠️ Попытка ${attempt}/${retries} загрузить ${url} не удалась: ${err.message}`);
            if (attempt === retries) {
                throw err; // последняя попытка — пробрасываем ошибку
            }
            await page.waitForTimeout(1500); // пауза перед повтором
        }
    }
}

export const options = {
    scenarios: {
        ui: {
            executor: 'shared-iterations',
            vus: 1,
            iterations: 1,
            gracefulStop: '30s',
            options: {
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
            executor: 'constant-vus',   // постоянное число VU
            vus: 100,                  // 100 пользователей
            duration: '30s',           // тест длится 30 секунд
            gracefulStop: '30s',       // время на завершение после окончания
            options: {                 // если нужен браузер – оставляем
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
};
*/

/*
export const options = {
    scenarios: {
        ui: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 100 }, // за 30 секунд выйти на 100 VU
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
        await page.goto('https://somovstudio.github.io/test.html');
        //await gotoWithRetry(page, 'http://localhost/Test_API/auth.html');

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