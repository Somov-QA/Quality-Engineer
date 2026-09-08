import { test, expect } from '@playwright/test';

test('Проверка авторизации', async ({ page }) => {

    const url = 'https://somovstudio.github.io/test.html';

    await test.step('Загрузка тестовой страницы', async () => {
        await page.goto(url, { waitUntil: 'load', timeout: 5000 });
        const title = await page.title();
        expect(title).toBe('Тестовая страница');
    });

    await test.step('Заполнение и отправка формы авторизации', async () => {
        await page.locator("//input[@id='login']").fill('admin');
        await page.locator("//input[@id='pass']").fill('1234');
        await page.locator("//input[@id='buttonLogin']").click();
    });

    await test.step('Проверка успешности авторизации', async () => {
		await page.waitForSelector("//div[@id='result']");
		const titlePopup = await page.locator("//div[@id='result']/h3").textContent();
		expect(titlePopup).toBe('Результат авторизации');
		const message = await page.locator("//textarea[@id='textarea']").inputValue();
		expect(message).toBe('Вы успешно авторизованы');
    });
});