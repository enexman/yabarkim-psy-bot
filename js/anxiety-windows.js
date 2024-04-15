const { Keyboard } = require('grammy');
const { showWindowWithPhoto } = require('./helpers.js');
const { TEXT } = require('./texts');

const anxietyKeyboardLevelOne = new Keyboard()
    .text(`от 1 до 3`)
    .text(`от 4 до 7`)
    .text(`от 8 до 10`)
    .row().text(`Обратиться к психологу`)
    .row().text(`Главное меню`)
    .resized();

module.exports.setAnxietyWindow = () => {
    showWindowWithPhoto(
        `Чувствую сильную тревогу`,
        TEXT.anxietyStart,
        anxietyKeyboardLevelOne,
        `./img/anxiety_0.jpg`
    );
    showWindowWithPhoto(
        `от 1 до 3`,
        TEXT.anxietyLow,
        anxietyKeyboardLevelOne,
        `./img/anxiety_3.jpg`
    );
    showWindowWithPhoto(
        `от 4 до 7`,
        TEXT.anxietyMedium,
        anxietyKeyboardLevelOne,
        `./img/anxiety_2.jpg`
    );
    showWindowWithPhoto(
        `от 8 до 10`,
        TEXT.anxietyHigh,
        anxietyKeyboardLevelOne,
        `./img/anxiety_1.jpg`
    );
};
