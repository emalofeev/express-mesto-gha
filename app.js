const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const auth = require("./middlewares/auth");
const { PORT, DB_ADDRESS } = require("./config");
const { login, createUser } = require("./controllers/users");

const app = express();

mongoose.connect(DB_ADDRESS);

app.use(bodyParser.json());
// app.use((req, res, next) => {
//   req.user = {
//     _id: "642292329f6815cb6400a78a",
//   };

//   next();
// });

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);
app.use(usersRouter);
app.use(cardsRouter);

app.listen(PORT, () => {});
