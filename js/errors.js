const { GrammyError, HttpError } = require('grammy');
const { bot } = require('./bot');

module.exports.catchErrors = () => {
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
};
