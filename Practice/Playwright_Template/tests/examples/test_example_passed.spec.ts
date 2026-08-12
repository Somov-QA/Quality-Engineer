import { test, expect } from '@playwright/test';
import { Helper } from '../.support/Helper';

test('Проверка авторизации', async ({ page }) => {

    const url = 'https://somovstudio.github.io/test.html';

    await test.step('Загрузка тестовой страницы', async () => {
        await page.goto(url, { waitUntil: 'load', timeout: 25000 });
        const title = await page.title();
        expect(title).toBe('Тестовая страница');
		
		test.info().attachments.push({
            name: 'Загрузка страницы',
            contentType: 'text/plain',
            body: Buffer.from(`Заголовок страницы: ${title}`)
        });
    });

    await test.step('Заполнение и отправка формы авторизации', async () => {
        await page.locator("//input[@id='login']").fill(Helper.ADMIN_USERNAME);
        await page.locator("//input[@id='pass']").fill(Helper.ADMIN_PASSWORD);
        await page.locator("//input[@id='buttonLogin']").click();

        test.info().attachments.push({
            name: 'Заполнение формы авторизации',
            contentType: 'text/plain',
            body: Buffer.from(`Заголовок страницы: логин ${Helper.ADMIN_USERNAME}, пароль ${Helper.ADMIN_PASSWORD}`)
        });
    });

    await test.step('Проверка успешности авторизации', async () => {
		await page.waitForSelector("//div[@id='result']");
		const titlePopup = await page.locator("//div[@id='result']/h3").textContent();
		expect(titlePopup).toBe('Результат авторизации');
		const message = await page.locator("//textarea[@id='textarea']").inputValue();
		expect(message).toBe('Вы успешно авторизованы');

        test.info().attachments.push({
            name: 'Проверка авторизации',
            contentType: 'text/plain',
            body: Buffer.from(`Результат авторизации: ${message}`)
        });
    });
	
	await test.step('Скриншот страницы', async () => {
        const finalScreenshot = await page.screenshot({ fullPage: true });
        test.info().attachments.push({
            name: 'Финальный вид страницы',
            contentType: 'image/png',
            body: finalScreenshot
        });
    });
});