const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { PORT, DB_ADDRESS } = require("./config");
const { login, createUser } = require("./controllers/users");

const app = express();

mongoose.connect(DB_ADDRESS);

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: "6422abbdf8fda1c46bab6d30",
  };

  next();
});
app.use(usersRouter);
app.use(cardsRouter);

app.post("/signin", login);
app.post("/signup", createUser);

app.listen(PORT, () => {});
