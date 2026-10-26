/**
 * Тест-кейс №0001
 * Описание: Проверка тестирование снимков
 * Шаги:
 *  1. Открыть страницу авторизации https://somovstudio.github.io/test.html
 *  2. Снять снимок страницы
 *  3. Проверить страницу по снимку
 *  Ожидаемый результат: страница и снимок должны совпадать
 */

import { test, expect } from '@playwright/test';

test('Авторизация', async ({ page }) => {
    await page.goto('https://somovstudio.github.io/test.html');
    await expect(page.locator('body')).toMatchAriaSnapshot({ name: 'snapshot.aria.yml' });
});