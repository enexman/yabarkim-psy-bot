const { Keyboard } = require('grammy');
const { TEXT } = require('./texts');
const { showWindowWithText } = require('./helpers');
const { setAnxietyWindow } = require('./anxiety-windows');
const { setArticleWindow } = require('./articles-window');
const { setPsychologistWindow } = require('./psychologist-windows');

const mainKeyboard = new Keyboard()
    .text(`Что вас беспокоит?`)
    .row().text(`Анонсы и новости`)
    .row().text(`Полезные статьи`)
    .resized();
const painKeyboard = new Keyboard()
    .text(`Чувствую сильную тревогу`)
    .row().text(`Скоро...`)
    // .row().text(`У меня панические атаки`)
    .row().text(`Главное меню`)
    .resized();
const backKeyboard = new Keyboard().text(`Главное меню`).resized().oneTime();
const articleKeyboard = new Keyboard()
    .text(`Когда тревога уже патология?`)
    .row().text(`Обесценивание, почему и зачем?`)
    .row().text(`Почему люди верят в "тайное" правительство?`)
    .row().text(`Глубинные страхи в образах`)
    .row().text(`Главное меню`)
    .resized();

module.exports.setWindows = () => {
    showWindowWithText([`Главное меню`], TEXT.main, mainKeyboard);
    showWindowWithText(`Что вас беспокоит?`, TEXT.pain, painKeyboard);
    showWindowWithText([`Полезные статьи`, `Назад к списку статей`], TEXT.article, articleKeyboard);
    showWindowWithText(`Скоро...`, `Данный бот находится на этапе разработки`, painKeyboard);

    showWindowWithText(`Анонсы и новости`, `На данный момент нет новых анонсов`, mainKeyboard);

    setAnxietyWindow();
    setArticleWindow();
    setPsychologistWindow();
};