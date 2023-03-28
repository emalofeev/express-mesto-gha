const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: "64222af2b1dd8cbcb72aef76",
  };

  next();
});
app.use(usersRouter);
app.use(cardsRouter);

app.listen(PORT, () => {});
