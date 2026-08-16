import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations', // или 'constant-vus'
      vus: 1,                       // один виртуальный пользователь
      iterations: 1,                // выполнить один раз
      options: {
        browser: {
          type: 'chromium',         // используем Chromium
        },
      },
    },
  },
};

export default async function () {
  // Открываем браузер и новую страницу
  const page = await browser.newPage();

  try {
    // 1. Переходим на тестовый сайт (замените на свой)
    await page.goto('https://test.k6.io/');

    // 2. Находим ссылку "My IP" и кликаем по ней
    const link = await page.locator('a[href="/my_ip.php"]');
    await link.click();

    // 3. Ждём появления заголовка на новой странице
    await page.waitForSelector('h1');

    // 4. Проверяем, что заголовок содержит "IP"
    const headerText = await page.locator('h1').textContent();
    check(headerText, {
      'Заголовок содержит IP': (h) => h.includes('IP'),
    });

    // 5. (Опционально) делаем скриншот для отладки
    await page.screenshot({ path: 'screenshot.png' });

  } finally {
    // Закрываем страницу и браузер
    await page.close();
  }
}