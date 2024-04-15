const { InputFile } = require('grammy');
const { bot } = require('./bot');
/*
 textHears - string
 textShow - string
 keyboard
 */
const showWindowWithText = (textHears, textShow, keyboard) => {
    bot.hears(textHears, async (ctx) => {
        await ctx.reply(
            textShow,
            {
                parse_mode: `HTML`,
                reply_markup: keyboard
            }
        )
    });
};

/*
 textHears - string
 caption - string
 keyboard
 pathImage - string
 */
const showWindowWithPhoto = (textHears, caption, keyboard, pathImage) => {
    bot.hears(textHears, async (ctx) => {
        await ctx.replyWithPhoto(new InputFile(pathImage),
            {
                caption,
                parse_mode: `HTML`,
                reply_markup: keyboard
            }
        );
    });
};

module.exports = {
    showWindowWithText,
    showWindowWithPhoto,
};
