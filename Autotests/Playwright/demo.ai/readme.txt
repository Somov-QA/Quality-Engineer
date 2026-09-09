1) Установка TypeScript

	npm install --save-dev typescript

2) Установка Playwright

	npm init playwright@latest
	
3) Обновление Playwright

	npm install -D @playwright/test@latest

4) Посмотреть версию Playwright

	npx playwright --version
	
5) Установка новой версии браузеров Playwright

	npx playwright install
	npx playwright install --with-deps
	npx playwright install chromium

6) Запуск теста

	npx playwright test demo.spec.ts
	npx playwright test tests/demo.spec.ts --reporter=list
	npx playwright test tests/demo.spec.ts --reporter=html
	
7) Установка из файла package.json

	npm install

