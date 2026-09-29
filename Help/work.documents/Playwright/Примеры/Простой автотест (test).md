Файл автотеста **demo.spec.ts**

```typescript
import { test, expect } from '@playwright/test';

test('Авторизация', async ({ page }) => {
    await page.goto('https://somovstudio.github.io/test.html');
    await expect(page).toHaveTitle('Тестовая страница');
    await page.locator('#login').fill('admin');
    await page.locator('#pass').fill('0000');
    await page.locator('#buttonLogin').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#textarea')).toHaveValue('Вы успешно авторизованы');
});
```

Файл конфигурации **playwright.config.ts**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // папка с тестами
  timeout: 300000,  // максимальное время ожидания
  fullyParallel: true,  // параллельное выполнение
  
  //reporter: 'html', // тип отчета
  reporter: [
    ['html', {open: 'never'}] // тип отчета и запрет автоматического открытия отчета
  ],

  use: {
    baseURL: 'https://somovstudio.github.io/',  // базовая ссылка
    trace: 'on-first-retry',  // трассировка
    screenshot: 'only-on-failure',  // скриншот только при падении теста
    ignoreHTTPSErrors: true,  // игнорировать ошибки HTTPS
  },

  outputDir: 'test-results/', // папка для хранения артифактов (скриншоты, видео, трассировка и т.п.)

  projects: [
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome',
        //viewport: { width: 1440, height: 900 }, // размер окна браузера
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'] // открыть окно браузера на весь экран (работает при viewport: null)
        }
      }
    },
  ],
});
```

Команда запуска автотеста с открытием браузера

```
npx playwright test tests/demo.spec.ts --headed
```

Команда открытия отчета

```
npx playwright show-report
```

