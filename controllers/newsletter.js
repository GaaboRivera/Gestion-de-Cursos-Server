const Newsletter = require('../models/newsletter')

function suscribeEmail(req, res) {
  const { email } = req.body

  if (!email.trim()) {
    return res.status(400).send({ msg: 'El email es obligatorio!' })
  }
  const newsletter = new Newsletter({
    email: email.toLowerCase(),
  })

  newsletter
    .save()
    .then(() => {
      res.status(200).send({ msg: 'Email registrado' })
    })
    .catch(() => {
      res.status(400).send({ msg: 'El email ya esta registrado' })
    })
}

function getEmails(req, res) {
  const { page = 1, limit = 10 } = req.query

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  }

  Newsletter.paginate({}, options)
    .then(emailsStored => {
      res.status(200).send(emailsStored)
    })
    .catch(() => {
      res.status(400).send({ msg: 'Error al obtener los emails' })
    })
}

function deleteEmail(req, res) {
  const { id } = req.params

  Newsletter.findByIdAndDelete({ _id: id })
    .then(() => {
      return res.status(201).send({ msg: 'Eliminación de email correcta' })
    })
    .catch(() => {
      res.status(400).send({ msg: 'Error al eliminar el email' })
    })
}

module.exports = {
  suscribeEmail,
  getEmails,
  deleteEmail,
}
