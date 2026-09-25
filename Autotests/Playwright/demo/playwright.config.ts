import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // папка с тестами
  timeout: 300000,  // максимальное время ожидания
  fullyParallel: true,  // параллельное выполнение
  //reporter: 'html', // тип отчета
  reporter: [
    ['html', {open: 'never'}] // тип отчета и запрет автоматического открытия отчета
  ],

  use: {
    baseURL: 'https://somovstudio.github.io/',  // базовая ссылка
    trace: 'on-first-retry',  // трассировка
    screenshot: 'only-on-failure',  // скриншот только при падении теста
    ignoreHTTPSErrors: true,  // игнорировать ошибки HTTPS
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

    /*
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
