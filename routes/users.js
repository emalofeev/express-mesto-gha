const usersRouter = require("express").Router();

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
usersRouter.patch("/users/me", updateProfileUser);
usersRouter.patch("/users/me/avatar", updateAvatarUser);

module.exports = usersRouter;
