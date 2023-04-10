const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi, errors } = require("celebrate");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const auth = require("./middlewares/auth");
const errorsMiddlewares = require("./middlewares/errorsMiddlewares");
const { PORT, DB_ADDRESS } = require("./config");
const { login, createUser } = require("./controllers/users");
const NotFound = require("./errors/NotFound");

const app = express();

mongoose.connect(DB_ADDRESS);

app.use(bodyParser.json());

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /(https?:\/\/)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/
      ),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.use(() => {
  throw new NotFound('Страница не найдена');
});

app.use(auth);
app.use(usersRouter);
app.use(cardsRouter);
app.use(errors());
app.use(errorsMiddlewares);

app.listen(PORT, () => {});
