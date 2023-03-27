const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const routes = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(bodyParser.json());
app.use(routes)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
