const Card = require("../models/card");
const BadRequest = require("../errors/BadRequest");
const NotFound = require("../errors/NotFound");
const InternalServerError = require("../errors/InternalServerError");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      next(new InternalServerError("На сервере произошла ошибка"));
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequest("Переданы некорректные данные при создании карточки")
        );
        return;
      }
      next(new InternalServerError("На сервере произошла ошибка"));
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new NotFound("Карточка с указанным _id не найдена"));
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequest("Переданы некорректные данные для постановки лайка")
        );
        return;
      }
      if (err.name === "CastError") {
        next(new NotFound("Передан несуществующий _id карточки"));
        return;
      }
      next(new InternalServerError("На сервере произошла ошибка"));
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequest("Переданы некорректные данные для снятия лайка"));
        return;
      }
      if (err.name === "CastError") {
        next(new NotFound("Передан несуществующий _id карточки"));
        return;
      }
      next(new InternalServerError("На сервере произошла ошибка"));
    });
};
