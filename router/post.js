const express = require('express')
const multiparty = require('connect-multiparty')
const PostController = require('../controllers/post')
const asureAuth = require('../middlewares/autenticated')

const upload = multiparty({ uploadDir: './uploads/blog' })

const api = express.Router()

api.post('/post', [asureAuth, upload], PostController.createPost)
api.get('/posts', PostController.getAllPost)
api.patch('/post/:id', [asureAuth, upload], PostController.updatePost)
api.delete('/post/:id', [asureAuth], PostController.deletePost)
api.get('/post/:path', PostController.getPostByPath)

module.exports = api
