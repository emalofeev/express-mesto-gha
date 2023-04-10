const usersRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getUsers,
  getUser,
  getCurrentUser,
  updateProfileUser,
  updateAvatarUser,
} = require("../controllers/users");

usersRouter.get("/users", getUsers);
usersRouter.get("/users/me", getCurrentUser);
usersRouter.get("/users/:userId", getUser);
usersRouter.patch(
  "/users/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfileUser,
);
usersRouter.patch(
  "/users/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(/(https?:\/\/)(w{3}\.)([-._~:/?#][@!$&'()*+,;=])/),
    }),
  }),
  updateAvatarUser,
);

module.exports = usersRouter;
