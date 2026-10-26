import { test, expect } from '@playwright/test';
import { StepObject } from './.support/steps/StepObject';
import { PageObject } from './.support/pages/PageObject';
import { Helper } from './.support/Helper';

test('Авторизация', async ({ page }) => {
    await page.goto(Helper.URL);
    await expect(page).toHaveTitle('Тестовая страница');
    StepObject.sendForm(page);
    await expect(page.locator(PageObject.POPUP_RESULT)).toBeVisible();
    await expect(page.locator(PageObject.POPUP_TEXTAREA)).toHaveValue('Вы успешно авторизованы');
});