const jwt = require("jsonwebtoken");
const { unauthorized } = require("../utils/constants");

const handleAuthError = (res) => {
  res
    .status(unauthorized)
    .send({ message: "Передан неверный логин или пароль" });
};

const extractBearerToken = (header) => {
  return header.replace("Bearer ", "");
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, "super-strong-secret");
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};
