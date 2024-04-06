require('dotenv').config();
const { Bot, GrammyError, HttpError, Keyboard } = require('grammy');

const bot = new Bot(process.env.BOT_API_KEY);

bot.api.setMyCommands([
    {
        command: `start`,
        description: `Запуск бота`
    },
    {
        command: `hello`,
        description: `Пустышка`
    }
]);

// действие на команду start
bot.command('start', async (ctx) => {
    const startKeyboard = new Keyboard().text(`Хорошо`).row().text(`ID`).resized()/*.oneTime()*/;
    await ctx.reply(
        `<a href="https://yabarkim-psy.ru/">site</a>`,
        {
            parse_mode: `HTML`,
            reply_markup: startKeyboard
        }

    )
});

bot.hears(`Хорошо`, async (ctx) => {
    const goodKeyboard = new Keyboard().text(`Назад`).resized();
    await ctx.reply(`у меня тоже`, {
        reply_markup: goodKeyboard /*{remove_keyboard: true}*/ // убрать клавиатуру
    })
});

bot.hears(`ID`, async (ctx) => {
    await ctx.reply(ctx.from.id)
});

// прочие сообщения
bot.on('message', async (ctx) => {
    await ctx.reply(`Don't know`)
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