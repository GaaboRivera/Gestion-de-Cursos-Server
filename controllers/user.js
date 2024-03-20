const bcrypt = require('bcryptjs')
const User = require('../models/user')
const image = require('../utils/image')

async function getMe(req, res) {
  const { user_id } = req.user

  const response = await User.findOne({ _id: user_id })

  if (!response) {
    res.status(200).send({ msg: 'No se ha encontrado el usuario' })
  } else {
    res.status(200).send(response)
  }
}

async function getUsers(req, res) {
  const { active } = req.query

  let response = null

  if (active === undefined) {
    response = await User.find()
  } else {
    response = await User.findOne({ active })
  }

  return res.status(200).send(response)
}

async function createUser(req, res) {
  const { password } = req.body
  const user = new User({ ...req.body, active: false })

  const salt = bcrypt.genSaltSync(10)
  const hasPassword = bcrypt.hashSync(password, salt)

  user.password = hasPassword

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar)
    user.avatar = imagePath
  }

  user
    .save()
    .then(userStored => {
      return res.status(201).send(userStored)
    })
    .catch(() => {
      res.status(400).send({ msg: 'Error al guardar al usuario' })
    })
}

async function updateUser(req, res) {
  const { id } = req.params

  const userData = req.body

  //password
  if (userData.password) {
    const salt = bcrypt.genSaltSync(10)
    const hasPassword = bcrypt.hashSync(userData.password, salt)

    userData.password = hasPassword
  } else {
    delete userData.password
  }

  //Avatar
  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar)
    userData.avatar = imagePath
  }

  User.findByIdAndUpdate({ _id: id }, userData)
    .then(() => {
      return res.status(201).send({ msg: 'Actualización correcta' })
    })
    .catch(() => {
      res.status(400).send({ msg: 'Error al actualizar el usuario' })
    })
}

async function deleteUser(req, res) {
  const { id } = req.params

  User.findByIdAndDelete({ _id: id })
    .then(() => {
      return res.status(201).send({ msg: 'Usuario Eliminado' })
    })
    .catch(() => {
      res.status(400).send({ msg: 'Error al eliminar al usuario' })
    })
}

module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
}
