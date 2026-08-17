import { check, sleep } from 'k6';
import { browser } from 'k6/browser';

export const options = { // Экспортируем объект конфигурации теста
    scenarios: { // Секция scenarios определяет сценарии выполнения теста
        ui: { // Называем сценарий "ui"
            executor: 'shared-iterations', // все виртуальные пользователи совместно выполняют заданное количество итераций
            vus: 1, // количество одновременно работающих виртуальных пользователей
            iterations: 1, // общее количество итераций сценария
            gracefulStop: '30s', // время ожидания завершения текущих действий при остановке сценария
            options: { // Вложенный объект options для специфических настроек сценария
                browser: { // настройки для браузерного тестирования
                    type: 'chromium', // используем браузер Chromium для выполнения теста
                },
            },
        },
    },
};

export default async function () {
    const page = await browser.newPage();

    // Логируем консоль браузера
    //page.on('console', (msg) => {
    //    console.log('🖥️ Browser log:', msg.text());
    //});

    try {
        await page.goto('https://somovstudio.github.io/test.html', { timeout: 60000 });

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