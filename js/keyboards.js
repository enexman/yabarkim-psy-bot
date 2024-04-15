const { Keyboard } = require('grammy');

const mainKeyboard = new Keyboard()
    .text(`Что вас беспокоит?`)
    .row().text(`Полезные статьи`)
    .resized().oneTime();
const backKeyboard = new Keyboard()
    .text(`Главное меню`)
    .resized().oneTime();

module.exports = {
    mainKeyboard,
    backKeyboard,
};
