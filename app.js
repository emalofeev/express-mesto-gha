const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi } = require("celebrate");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const auth = require("./middlewares/auth");
const { PORT, DB_ADDRESS } = require("./config");
const { login, createUser } = require("./controllers/users");

const app = express();

mongoose.connect(DB_ADDRESS);

app.use(bodyParser.json());

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
app.post(
  "/signup",
  {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  },
  createUser,
);

app.use(auth);
app.use(usersRouter);
app.use(cardsRouter);

app.listen(PORT, () => {});
