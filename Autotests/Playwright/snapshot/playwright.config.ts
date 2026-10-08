import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  testDir: './tests',
  timeout: 300000,
  fullyParallel: true,
  reporter: [
    ['html', {open: 'never'}]
  ],
  
  use: {
    baseURL: 'https://somovstudio.github.io/test.html',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors: true,
  },

  outputDir: 'test-results/',

  projects: [
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome',
        viewport: null,
		    launchOptions: {
			    args: ['--start-maximized']
		    }
      }
    },
  ],

  expect: {
    toMatchAriaSnapshot: {
      pathTemplate: '__snapshots__/{testFilePath}/{arg}{ext}',
    },
  },
});
