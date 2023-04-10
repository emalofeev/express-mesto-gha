const cardsRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

cardsRouter.get("/cards", getCards);
cardsRouter.post(
  "/cards",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string()
        .required()
        .pattern(/(https?:\/\/)(w{3}\.)([-._~:/?#][@!$&'()*+,;=])/),
    }),
  }),
  createCard,
);
cardsRouter.delete("/cards/:cardId", deleteCard);
cardsRouter.put("/cards/:cardId/likes", likeCard);
cardsRouter.delete("/cards/:cardId/likes", dislikeCard);

module.exports = cardsRouter;
