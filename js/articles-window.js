const { Keyboard } = require('grammy');
const { showWindowWithPhoto } = require('./helpers.js');
const { ARTICLE } = require('./articles.js');

const backToArticlesKeyboard = new Keyboard().text(`Назад к списку статей`).resized();
// Список статей
module.exports.setArticleWindow = () => {
    showWindowWithPhoto(`Когда тревога уже патология?`, ARTICLE.anxiety, backToArticlesKeyboard, "./img/anxiety.jpg");
    showWindowWithPhoto(`Обесценивание, почему и зачем?`, ARTICLE.depreciation, backToArticlesKeyboard, "./img/depreciation.jpg");
    showWindowWithPhoto(`Почему люди верят в "тайное" правительство?`, ARTICLE.secretGovernment, backToArticlesKeyboard, "./img/secret-government.jpg");
    showWindowWithPhoto(`Глубинные страхи в образах`, ARTICLE.fear, backToArticlesKeyboard, "./img/fear.jpg");
};