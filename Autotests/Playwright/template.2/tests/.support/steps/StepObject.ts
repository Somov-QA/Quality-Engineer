import { Page, expect, test, Browser } from '@playwright/test';
import { PageObject } from '../pages/PageObject';
import { Helper } from '../Helper';

export class StepObject {
    static async sendForm(page: Page): Promise<void> {
        await page.locator(PageObject.FORM_LOGIN).fill(Helper.USERNAME);
        await page.locator(PageObject.FORM_PASS).fill(Helper.PASSWORD);
        await page.locator(PageObject.FORM_BUTTON_LOGIN).click();
    }
}