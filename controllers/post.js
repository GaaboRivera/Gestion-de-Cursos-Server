const Post = require('../models/post')
const image = require('../utils/image')

function createPost(req, res) {
  const post = new Post(req.body)
  post.create_at = new Date()

  const imagePath = image.getFilePath(req.files.miniature)
  post.miniature = imagePath

  post
    .save()
    .then(postStored => {
      res.status(200).send(postStored)
    })
    .catch(() => {
      res.status(400).send({ msg: 'Error al guardad el post' })
    })
}

function getAllPost(req, res) {
  const { page = 1, limit = 10 } = req.query

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { create_at: 'desc' },
  }

  Post.paginate({}, options)
    .then(postStored => {
      res.status(200).send(postStored)
    })
    .catch(() => {
      res.status(400).send({ msg: 'Error al obtener los post' })
    })
}

function updatePost(req, res) {
  const { id } = req.params
  const postData = req.body

  if (req.files.miniature) {
    const imagePath = image.getFilePath(req.files.miniature)
    postData.miniature = imagePath
  }

  Post.findByIdAndUpdate({ _id: id }, postData)
    .then(() => {
      return res.status(201).send({ msg: 'Actualización de post correcta' })
    })
    .catch(() => {
      res.status(400).send({ msg: 'Error al actualizar el post' })
    })
}

function deletePost(req, res) {
  const { id } = req.params

  Post.findByIdAndDelete({ _id: id })
    .then(() => {
      return res.status(201).send({ msg: 'Eliminación de post correcta' })
    })
    .catch(() => {
      res.status(400).send({ msg: 'Error al eliminar el post' })
    })
}

function getPostByPath(req, res) {
  const { path } = req.params

  Post.findOne({ path })
    .then(postStored => {
      if (!postStored) {
        throw new Error('No se encontró ningún post')
      }
      res.status(200).send(postStored)
    })
    .catch(() => {
      res.status(400).send({ msg: 'No se encontró ningún post' })
    })
}
module.exports = {
  createPost,
  getAllPost,
  updatePost,
  deletePost,
  getPostByPath,
}
