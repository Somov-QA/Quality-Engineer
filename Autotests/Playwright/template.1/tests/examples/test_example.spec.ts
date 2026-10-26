import { test, expect } from '@playwright/test';
import { PageObject } from '../.support/pages/PageObject';
import { StepsObject } from '../.support/steps/StepsObject';
import { Helper } from '../.support/Helper';

test('Страница', async ({ page }) => {

    await test.step('Загрузка', async () => {
        await page.goto(Helper.URL + '/page/');
    });

    await test.step('Тест - контент', async () => {
        
        
        

        test.info().attachments.push({
            name: 'Проверка контента страницы',
            contentType: 'text/plain',
            body: Buffer.from('Проверены все основные элементы страницы')
        });
    });

    await test.step('Скриншот', async () => {
        const finalScreenshot = await page.screenshot({ fullPage: true });
        test.info().attachments.push({
            name: 'Финальный вид страницы',
            contentType: 'image/png',
            body: finalScreenshot
        });
    });

});