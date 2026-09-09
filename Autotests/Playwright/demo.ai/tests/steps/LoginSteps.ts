import { expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TestData } from '../helpers/data';

/**
 * StepObject: описание общих функций (шагов) для работы с формой авторизации.
 */
export class LoginSteps {
  readonly page: Page;
  readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
  }

  /** Открыть страницу авторизации */
  async openLoginPage(): Promise<void> {
    await this.page.goto(TestData.baseUrl);
  }

  /** Ввести логин в поле Login */
  async fillLogin(login: string): Promise<void> {
    await this.loginPage.loginInput.fill(login);
  }

  /** Ввести пароль в поле Password */
  async fillPassword(password: string): Promise<void> {
    await this.loginPage.passwordInput.fill(password);
  }

  /** Нажать кнопку Enter */
  async clickEnter(): Promise<void> {
    await this.loginPage.enterButton.click();
  }

  /**
   * Полный шаг авторизации: открыть страницу, заполнить поля и нажать кнопку.
   */
  async login(login: string, password: string): Promise<void> {
    await this.openLoginPage();
    await this.fillLogin(login);
    await this.fillPassword(password);
    await this.clickEnter();
  }

  /** Проверить результат успешной авторизации */
  async expectSuccessResult(): Promise<void> {
    await expect(this.loginPage.resultPopup).toBeVisible();
    await expect(this.loginPage.resultTitle).toHaveText(TestData.resultTitle);
    await expect(this.loginPage.resultTextarea).toHaveValue(TestData.expectedSuccessMessage);
  }

  /** Проверить результат неуспешной авторизации */
  async expectErrorResult(): Promise<void> {
    await expect(this.loginPage.resultPopup).toBeVisible();
    await expect(this.loginPage.resultTitle).toHaveText(TestData.resultTitle);
    await expect(this.loginPage.resultTextarea).toHaveValue(TestData.expectedErrorMessage);
  }
}