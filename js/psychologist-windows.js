const { Keyboard } = require('grammy');
const { showWindowWithPhoto, showWindowWithText } = require('./helpers.js');
const { TEXT } = require('./texts');

const psychologistKeyboard = new Keyboard()
    .text(`Отзывы`)
    .text(`Прайс`)
    .row().text(`Написать`)
    .row().text(`Главное меню`)
    .resized();

module.exports.setPsychologistWindow = () => {
    showWindowWithPhoto(
        `Обратиться к психологу`,
        `КПТ терапевт Мурат Баркинхоев`,
        psychologistKeyboard,
        `./img/psychologist.jpg`
    );
    showWindowWithText(
        `Отзывы`,
        TEXT.reviews,
        psychologistKeyboard
    );
    showWindowWithText(
        `Прайс`,
        `Консультация 3000 руб. 55 минут`,
        psychologistKeyboard
    );
    showWindowWithText(
        `Написать`,
        `<a href="https://t.me/yabarkim">Записаться на консультацию</a>`,
        psychologistKeyboard
    );
};
