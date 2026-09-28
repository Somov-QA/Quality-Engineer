Структура проекта с использованием паттернов

![[Pasted image 20260928125328.png]]

Файл: \tests\\.support\Helper.ts

```typescript
export class Helper {
    static readonly URL = 'https://somovstudio.github.io/test.html';
    static readonly USERNAME = 'admin';
    static readonly PASSWORD = '0000';
}
```

Файл: \tests\\.support\pages\PageObject.ts

```typescript
export class PageObject {
    static readonly FORM_LOGIN = "#login";
    static readonly FORM_PASS = "#pass";
    static readonly FORM_BUTTON_LOGIN = "#buttonLogin";
    static readonly POPUP_RESULT = "#result";
    static readonly POPUP_TEXTAREA = "#textarea";
}
```

Файл: \tests\\.support\steps\StepObject.ts

```typescript
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
```

Файл: \tests\demo.pattern.spec.ts

```typescript
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
```





