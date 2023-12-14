const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt.js");

function register(req, res) {
  const { firstname, lastname, email, password } = req.body;

  if (!email)
    return res.status(403).send({ message: "El email es obligatorio" });
  if (!password)
    return res.status(403).send({ message: "La contraseña es obligatoria" });

  const user = new User({
    firstname,
    lastname,
    email: email.toLowerCase(),
    role: "user",
    active: false
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  user.password = hashPassword;

  user
    .save()
    .then((response) => {
      return res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({ msg: "Error al crear el usuario" });
    });
}

function login(req, res) {
  const { email, password } = req.body;
  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "El password es obligatorio" });

  const emailLowerCase = email.toLowerCase();
  User.findOne({ email: emailLowerCase })
    .then((userStore) => {
      bcrypt.compare(password, userStore.password, (bcryptError, check) => {
        if (bcryptError) {
          return res.status(500).send({ msg: "Error del servidor" });
        }
        if (!check) {
          return res.status(400).send({ msg: "Contraseña incorrecta" });
        }
        if (!userStore.active) {
          return res
            .status(401)
            .send({ msg: "Usuario no autorizado o no activo" });
        }
        return res.status(200).send({
          access: jwt.createAccessToken(userStore),
          refresh: jwt.createRefreshToken(userStore)
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ msg: "Error en el servidor" });
    });
}

function refreshAccessToken(req, res) {
  const { token } = req.body;
  if (!token) res.status(400).send({ msg: "Token requerido" });
  const { user_id } = jwt.decoded(token);

  User.find({ _id: user_id })
    .then((userStore) => {
      res.status(200).send({ accessToken: jwt.createAccessToken(userStore) });
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error en el servidor" });
    });
}

module.exports = {
  register,
  login,
  refreshAccessToken
};
