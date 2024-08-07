const express = require('express')
const MenuController = require('../controllers/menu')
const asureAuth = require('../middlewares/autenticated')

const api = express.Router()

//endpoints
api.post('/menu', [asureAuth], MenuController.createMenu)
api.get('/menu', MenuController.getMenus)
api.patch('/menu/:id', [asureAuth], MenuController.updateMenu)
api.delete('/menu/:id', [asureAuth], MenuController.deleteMenu)

module.exports = api
