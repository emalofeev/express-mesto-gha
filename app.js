const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { PORT, DB_ADDRESS } = require("./config");

const app = express();

mongoose.connect(DB_ADDRESS);

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
