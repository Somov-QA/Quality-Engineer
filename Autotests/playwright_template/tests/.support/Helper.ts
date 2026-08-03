import { APIRequestContext } from '@playwright/test';
import { test, expect, Page } from '@playwright/test';

/**
 * Helper
 * Содержит вспомогательные методы используемые в автотестах
 */
export class Helper {
  // URL сайта для тестирования
  static readonly URL = 'https://somovstudio.github.io/test.html';

  // Данные авторизации администратора
  static readonly ADMIN_USERNAME = 'admin';
  static readonly ADMIN_PASSWORD = '0000';
  
  // Настройка чат Bitrix
  static readonly BITRIX_WEBHOOK_URL = 'https://zionec.team/rest/421/gbrzaptiz2onkq6q/im.message.add';
  static readonly BITRIX_CHAT_ID = 'chat41';
  static readonly BITRIX_MESSAGE_TEXT = 'ПРОЕКТ - автотест вернул FAILED (возможно сайт упал)';
  
  // Отправка сообщения во внутренний чат Bitrix
  static async postMessageToBitrixChat(request: APIRequestContext, webhookUrl: string, chatId: string, messageText: string, system: string = "Y"): Promise<string> {
    const response = await request.post(webhookUrl, {
      data: {
        DIALOG_ID: chatId,      // DIALOG_ID - ID чата или ID пользователя для личного диалога
        MESSAGE: messageText,   // MESSAGE - Текст сообщения
        SYSTEM: system,         // SYSTEM - для системного сообщения ("N" или "Y")
      },
    });
    const responseBody = await response.text();
    return responseBody;
  }
}