const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/router");
const errorsMiddlewares = require("./middlewares/errorsMiddlewares");
const { errors } = require("celebrate");
const { PORT, DB_ADDRESS } = require("./config");

const app = express();

mongoose.connect(DB_ADDRESS);

app.use(bodyParser.json());
app.use(routes);
app.use(errors());
app.use(errorsMiddlewares);

app.listen(PORT, () => {});
