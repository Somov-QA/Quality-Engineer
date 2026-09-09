/**
 * Helper: хранение общих данных и констант теста.
 * Значения соответствуют тест-кейсу №0001 и разметке страницы.
 */
export const TestData = {
  /** URL страницы авторизации */
  baseUrl: 'https://somovstudio.github.io/test.html',

  /** Корректные учётные данные */
  validLogin: 'admin',
  validPassword: '0000',

  /** Некорректные учётные данные для негативного сценария */
  invalidLogin: 'invalid_user',
  invalidPassword: 'wrong_password',

  /** Заголовок поп-апа "Результат авторизации" */
  resultTitle: 'Результат авторизации',

  /** Сообщение при успешной авторизации */
  expectedSuccessMessage: 'Вы успешно авторизованы',

  /** Сообщение при неверных учётных данных */
  expectedErrorMessage: 'Неверный логин или пароль',
} as const;