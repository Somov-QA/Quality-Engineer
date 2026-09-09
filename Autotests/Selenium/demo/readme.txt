1) Скачать WebDriver для Chrome

	https://googlechromelabs.github.io/chrome-for-testing/#stable
	
	и сохранить файл chromedriver.exe в папку C:\selenium
	
	затем добавить путь C:\selenium в переменную Path в "Система" > "Дополнительные параметры системы" > "Переменные среды..."

	проверить версию драйвера командой
	
	chromedriver --v

2) Скачать и установить Visual Studio Code

	https://code.visualstudio.com/download/

3) Скачать и установить NodeJS

	https://nodejs.org/en/download

	команда для проверки версии NodeJS:

	npm -v

4) Установку Selenium

	npm install selenium-webdriver
	
	проверка версии драйвера
	
	npm show selenium-webdriver version

6) Запуск теста

	node tests/demo.test.js

