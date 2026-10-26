/**
 * Steps Object
 * Содержит методы используемые в автотестах
 */
import { Page, expect, test, Browser, TestInfo } from '@playwright/test';
import { PageObject } from '../pages/PageObject';
import { Helper } from '../Helper';
import { Buffer } from 'buffer';

export class StepsObject {
    /* ВАЖНО: Добавляем маскировку автоматизации */
    static async addMaskingAutomation(page: Page): Promise<void> {
        await page.context().addInitScript(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
            (window as any).chrome = { runtime: {} };
        });
    }
}