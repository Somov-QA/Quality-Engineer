Функция отправляющая сообщение во внутренний чат Bitrix

```typescript
static readonly BITRIX_WEBHOOK_URL = 'https://site.team/rest/123/.../im.message.add';
static readonly BITRIX_CHAT_ID = 'chat14';
static readonly BITRIX_MESSAGE_TEXT = 'Текст сообщения';

static async postMessageToBitrixChat(request: APIRequestContext, webhookUrl: string, chatId: string, messageText: string, system: string = "Y"): Promise<string> {
	const response = await request.post(webhookUrl, {
		data: {
			// DIALOG_ID - ID чата или ID пользователя для личного диалога
			DIALOG_ID: chatId,
			// MESSAGE - Текст сообщения
			MESSAGE: messageText,
			// SYSTEM - для системного сообщения ("N" или "Y")
			SYSTEM: system,
		},
	});
	const responseBody = await response.text();
	return responseBody;
}
```

Пример использования

```typescript
test.afterEach(async ({ request }, testInfo) => {
	if (testInfo.status !== 'passed') {
		await Helper.postMessageToBitrixChat(request,
			Helper.BITRIX_WEBHOOK_URL,
			Helper.BITRIX_CHAT_ID,
			Helper.BITRIX_MESSAGE_TEXT, 'Y');
		throw new Error(`Тест провален, статус: ${testInfo.status}`);
	}
});
```

В результате если статус теста не будет успешным тогда будет отправлено сообщение в чат.