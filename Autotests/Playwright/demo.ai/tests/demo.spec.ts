/**
 * Тест-кейс №0001
 * Описание: Проверка формы авторизации
 * Задача: Написать автотест в этом файле на основании этого тест-кейса с позитивными и негативными проверками.
 * Условие:
 *  1. использовать Playwright в качестве инструмента автоматизации
 *  2. использовать TypeScript в качесвте языка описания автотеста
 *  3. использовать паттерн PageObject для описания общих локаторов
 *  4. использовать паттерн StepObject для описания общих функций
 *  5. использовать Helper для хранения общих данных в переменных
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
import { test } from '@playwright/test';
import { LoginSteps } from './steps/LoginSteps';
import { TestData } from './helpers/data';

test.describe('Тест-кейс №0001: Проверка формы авторизации', () => {
  test('Позитивный сценарий: успешная авторизация с корректными данными', async ({ page }) => {
    const loginSteps = new LoginSteps(page);

    // Шаги: открыть страницу, ввести логин и пароль, нажать Enter
    await loginSteps.login(TestData.validLogin, TestData.validPassword);

    // Ожидаемый результат: поп-ап "Результат авторизации" с сообщением "Вы успешно авторизованы"
    await loginSteps.expectSuccessResult();
  });

  test('Негативный сценарий: авторизация с некорректными данными', async ({ page }) => {
    const loginSteps = new LoginSteps(page);

    // Шаги: открыть страницу, ввести неверные логин и пароль, нажать Enter
    await loginSteps.login(TestData.invalidLogin, TestData.invalidPassword);

    // Ожидаемый результат: поп-ап с сообщением об ошибке
    await loginSteps.expectErrorResult();
  });
});
