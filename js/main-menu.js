const { Keyboard } = require('grammy');
const fs = require('fs');
let { bot } = require('./bot');
const { TEXT } = require('./texts');

const mainKeyboard = new Keyboard()
    .text(`Что вас беспокоит?`)
    .row().text(`Анонсы и новости`)
    .row().text(`Полезные статьи`)
    .resized();
const backKeyboard = new Keyboard()
    .text(`Главное меню`)
    .resized();

module.exports.setMainMenu = () => {
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
            TEXT.main, {
                parse_mode: `HTML`,
                reply_markup: mainKeyboard
            }
        );

        // добавляем нового пользователя
        fs.readFile('./data.json', 'utf8', (err, data) => { // асинхронное чтение
            const users = JSON.parse(data);
            let newUsers = [];

            const newUserBoolean = !users.some((item) => {
                return (item.id == ctx.from.id);
            });
            if(newUserBoolean) {
                users.push({
                    id: ctx.from.id,
                    date: ctx.message.date
                })
            } else {
                newUsers = users.map((item) => {

                    if(item.id == ctx.from.id) {
                        return {
                            id: ctx.from.id,
                            date: ctx.message.date
                        }
                    }
                    return item;
                })
            }

            const updatedFile = (newUserBoolean) ? users : newUsers;
            // console.log('Новые пользователи', updatedFile);
            fs.writeFile('./data.json', JSON.stringify(updatedFile), (err, data) => {});
        });
    });

    bot.command('members', (ctx) => {
        fs.readFile('./data.json', 'utf8', (err, data) => {

            ctx.reply(
                `${JSON.parse(data).length}`, {
                    parse_mode: `HTML`,
                    reply_markup: backKeyboard
                }
            )
        });

    });

    bot.command('author', async (ctx) => {
        await ctx.reply(
            TEXT.author, {
                parse_mode: `HTML`,
                reply_markup: backKeyboard
            }
        )
    });
};
