const Card = require("../models/card");
const { badRequest, notFound, internalServerError } = require('../utils/constants')

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(internalServerError).send({ message: "Ошибка по умолчанию." });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(badRequest).send({
          message: "Переданы некорректные данные при создании карточки.",
        });
        return;
      }
      res.status(internalServerError).send({ message: "Ошибка по умолчанию." });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(notFound)
          .send({ message: " Карточка с указанным _id не найдена." });
        return;
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(badRequest).send({
          message: "Переданы некорректные данные для постановки лайка. ",
        });
        return;
      }
      if (err.name === "CastError") {
        res.status(notFound).send({
          message: "Передан несуществующий _id карточки.",
        });
        return;
      }
      res.status(internalServerError).send({ message: "Ошибка по умолчанию." });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(badRequest).send({
          message: "Переданы некорректные данные для снятия лайка. ",
        });
        return;
      }
      if (err.name === "CastError") {
        res.status(notFound).send({
          message: "Передан несуществующий _id карточки.",
        });
        return;
      }
      res.status(internalServerError).send({ message: "Ошибка по умолчанию." });
    });
};
