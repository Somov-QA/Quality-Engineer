/**
 * Тест-кейс №0001
 * Описание: Проверка формы авторизации
 * Данные:
 *  1. Корректный логин: admin
 *  2. Корректный пароль: 0000
 * Шаги:
 *  1. Открыть страницу авторизации https://somovstudio.github.io/test.html
 *  2. В поле Login ввести имя пользователя
 *  3. В поле Password ввести пароль пользователя
 *  4. Нажать кнопку Enter
 *  Ожидаемый результат: Должен открыться поп-ап "Результат авторизации" с сообщением "Вы успешно авторизованы"
 */

import { test, expect } from '@playwright/test';

test('Авторизация', async ({ page }) => {
    await page.goto('https://somovstudio._github.io/test.html');
    await expect(page).toHaveTitle('Тестовая страница');
    await page.locator('#login').fill('admin');
    await page.locator('#pass').fill('0000');
    await page.locator('#buttonLogin').click();
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#textarea')).toHaveValue('Вы успешно авторизованы');
});