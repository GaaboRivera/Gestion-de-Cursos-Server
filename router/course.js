const express = require('express')
const multiparty = require('connect-multiparty')
const CourseController = require('../controllers/course')
const asureAuth = require('../middlewares/autenticated')

const md_upload = multiparty({ uploadDir: './uploads/course' })

const api = express.Router()

api.post('/course', [asureAuth, md_upload], CourseController.createCourse)
api.get('/courses', CourseController.getAllCourses)
api.patch('/course/:id', [asureAuth, md_upload], CourseController.updateCourse)
api.delete('/course/:id', [asureAuth], CourseController.deleteCourse)

module.exports = api
