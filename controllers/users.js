const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const {
  badRequest,
  unauthorized,
  notFound,
  internalServerError,
} = require("../utils/constants");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res
        .status(internalServerError)
        .send({ message: "На сервере произошла ошибка" });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(notFound)
          .send({ message: "Пользователь по указанному _id не найден" });
        return;
      }
      res
        .status(internalServerError)
        .send({ message: "На сервере произошла ошибка" });
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(notFound)
          .send({ message: "Пользователь по указанному _id " });
        return;
      }
      res
        .status(internalServerError)
        .send({ message: "На сервере произошла ошибка" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(badRequest).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
        return;
      }
      res
        .status(internalServerError)
        .send({ message: "На сервере произошла ошибка" });
    });
};

module.exports.updateProfileUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(badRequest).send({
          message: "Переданы некорректные данные при обновлении профиля",
        });
        return;
      }
      if (err.name === "CastError") {
        res.status(notFound).send({
          message: "Пользователь с указанным _id не найден",
        });
        return;
      }
      res
        .status(internalServerError)
        .send({ message: "На сервере произошла ошибка" });
    });
};

module.exports.updateAvatarUser = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(badRequest).send({
          message: "Переданы некорректные данные при обновлении аватара",
        });
        return;
      }
      if (err.name === "CastError") {
        res.status(notFound).send({
          message: "Пользователь с указанным _id не найден",
        });
        return;
      }
      res
        .status(internalServerError)
        .send({ message: "На сервере произошла ошибка" });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, "super-strong-secret", {
          expiresIn: "7d",
        }),
      });
    })
    .catch(() => {
      res
        .status(unauthorized)
        .send({ message: "Передан неверный логин или пароль" });
    });
};
