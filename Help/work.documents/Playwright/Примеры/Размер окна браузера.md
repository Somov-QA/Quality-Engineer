Настройка размера окна в файле конфигурации playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
	projects: [
	{
		name: 'Google Chrome',
		use: {
			channel: 'chrome', // используем установленный Chrome
			viewport: { width: 1440, height: 900 }, // размер или null,
		},
	},
	],
});
```

Открыть окно браузера на весь экран

```typescript
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
	projects: [
	{
		name: 'Google Chrome',
		use: {
			channel: 'chrome',
			viewport: null,
			launchOptions: {
				args: ['--start-maximized']
			}
		},
	},
	],
});
```

Запуск теста с отображением браузера

```
npx playwright test tests/example.spec.ts --headed
```







