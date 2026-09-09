import { type Locator, type Page } from '@playwright/test';

/**
 * PageObject: описание общих локаторов страницы авторизации.
 */
export class LoginPage {
  readonly page: Page;

  /** Поле ввода логина */
  readonly loginInput: Locator;

  /** Поле ввода пароля */
  readonly passwordInput: Locator;

  /** Кнопка "Войти" */
  readonly enterButton: Locator;

  /** Поп-ап "Результат авторизации" */
  readonly resultPopup: Locator;

  /** Заголовок поп-апа */
  readonly resultTitle: Locator;

  /** Текстовая область с результатом авторизации */
  readonly resultTextarea: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginInput = page.locator('#login');
    this.passwordInput = page.locator('#pass');
    this.enterButton = page.locator('#buttonLogin');
    this.resultPopup = page.locator('#result');
    this.resultTitle = page.locator('#result h3');
    this.resultTextarea = page.locator('#textarea');
  }
}