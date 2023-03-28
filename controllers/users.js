const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(500).send({ message: "Ошибка по умолчанию." });
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(404)
          .send({ message: "Пользователь по указанному _id не найден." });
        return;
      }
      res.status(500).send({ message: "Ошибка по умолчанию." });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Переданы некорректные данные при создании пользователя.",
        });
        return;
      }
      res.status(500).send({ message: "Ошибка по умолчанию." });
    });
};

module.exports.updateProfileUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Переданы некорректные данные при обновлении профиля.",
        });
        return;
      }
      if (err.name === "CastError") {
        res.status(404).send({
          message: "Пользователь с указанным _id не найден.",
        });
        return;
      }
      res.status(500).send({ message: "Ошибка по умолчанию." });
    });
};

module.exports.updateAvatarUser = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Переданы некорректные данные при обновлении аватара.",
        });
        return;
      }
      if (err.name === "CastError") {
        res.status(404).send({
          message: "Пользователь с указанным _id не найден.",
        });
        return;
      }
      res.status(500).send({ message: "Ошибка по умолчанию." });
    });
};