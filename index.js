require('dotenv').config();
const { Bot, GrammyError, HttpError, Keyboard, InputFile } = require('grammy');
const { TEXT } = require('./text.js');
const { ARTICLE } = require('./articles.js');

// клавиатуры
const mainKeyboard = new Keyboard()
    .text(`Что Вас беспокоит?`)
    .row().text(`Полезные статьи`)
    .resized().oneTime();
const painKeyboard = new Keyboard()
    .text(`Чувствую сильную тревогу`)
    // .row().text(`Не могу совладать с эмоциями`)
    // .row().text(`У меня панические атаки`)
    .resized().oneTime();
const backKeyboard = new Keyboard().text(`Главное меню`).resized().oneTime();
const articleKeyboard = new Keyboard()
    .text(`Когда тревога уже патология?`)
    .row().text(`Главное меню`)
    .resized().oneTime();


const bot = new Bot(process.env.BOT_API_KEY);


bot.api.setMyCommands([
    {
        command: `start`,
        description: `Запуск бота`
    },
    {
        command: `author`,
        description: `Об авторе`
    }
]);

// действие на команду start
bot.command('start', async (ctx) => {
    await ctx.reply(
        TEXT.main,
        {
            parse_mode: `HTML`,
            reply_markup: mainKeyboard
        }
    )
});

bot.command('author', async (ctx) => {
    await ctx.reply(
        TEXT.author,
        {
            parse_mode: `HTML`,
            reply_markup: backKeyboard
        }
    )
});

bot.hears(`Главное меню`, async (ctx) => {
    await ctx.reply(
        TEXT.main,
        {
            parse_mode: `HTML`,
            reply_markup: mainKeyboard
        }
    )
});

bot.hears(`Что Вас беспокоит?`, async (ctx) => {
    await ctx.reply(
        TEXT.pain,
        {
            parse_mode: `HTML`,
            reply_markup: painKeyboard
        }
    )
});

bot.hears(`Полезные статьи`, async (ctx) => {
    await ctx.reply(
        TEXT.article,
        {
            parse_mode: `HTML`,
            reply_markup: articleKeyboard
        }
    )
});

bot.hears(`Когда тревога уже патология?`, async (ctx) => {
    await ctx.replyWithPhoto(new InputFile("./img/anxiety_01.jpg"),
        {
            caption: ARTICLE.anxiety,
            parse_mode: `HTML`,
            reply_markup: backKeyboard
        }
    );
});

bot.hears(`Чувствую сильную тревогу`, async (ctx) => {
    await ctx.replyWithPhoto(new InputFile("./img/anxiety_01.jpg"),
        {
            caption: TEXT.anxiety,
            parse_mode: `HTML`,
            reply_markup: backKeyboard
        }
    );
});

bot.hears([`ID`, `id`], async (ctx) => {
    await ctx.reply(`Ваш id: ${ctx.from.id}`)
});

// прочие сообщения
bot.on('message', async (ctx) => {
    await ctx.reply(`Извините, я вас не понимаю.`)
});

// ошибки
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;

    if (e instanceof GrammyError) {
        console.error(`Error in request`, e.description);
    } else if (e instanceof HttpError) {
        console.error(`Could not contact Telegram:`, e);
    } else {
        console.error(`Unknown error`, e);
    }
});

// старт бота
bot.start();