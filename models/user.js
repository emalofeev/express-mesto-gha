const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => validator.isURL(url),
        message:
          "URL указан в неверном формате или содержит недопустимые символы",
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message:
          "Email указан в неверном формате или содержит недопустимые символы",
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model("user", userSchema);
