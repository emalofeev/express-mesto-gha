const usersRouter = require("express").Router();

const {
  getUsers,
  getUser,
  createUser,
  updateProfileUser,
  updateAvatarUser,
} = require("../controllers/users");

usersRouter.get("/users", getUsers);
usersRouter.get("/users/:userId", getUser);
usersRouter.post("/users", createUser);
usersRouter.patch("/users/me", updateProfileUser);
usersRouter.patch("/users/me/avatar", updateAvatarUser);

module.exports = usersRouter;
