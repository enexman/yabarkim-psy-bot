require('dotenv').config();
const fs = require('fs');
const { bot } = require('./js/bot');
const { setWindows } = require('./js/windows');
const { catchErrors } = require('./js/errors');
const { setMainMenu } = require('./js/main-menu');

//команды главного меню
setMainMenu();

// запуск окон
setWindows();

// ошибки и прочие сообщения
catchErrors();

// старт бота
bot.start();
