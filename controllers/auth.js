const User = require("../models/user");
const bcrypt = require("bcryptjs");

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
    actives: false
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  user.password = hashPassword;

  // user.save((error, userStorage) => {
  //   if (error) {
  //     return res.status(400).send({ msg: "Error al crear el usuario" });
  //   } else {
  //     res.status(200).send(userStorage);
  //   }
  // });
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

module.exports = {
  register
};
