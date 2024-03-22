const Course = require('../models/course')
const image = require('../utils/image')

function createCourse(req, res) {
  const course = new Course(req.body)

  const imagePath = image.getFilePath(req.files.miniature)

  course.miniature = imagePath

  course
    .save()
    .then(courseStored => {
      return res.status(200).send(courseStored)
    })
    .catch(() => {
      res.status(400).send({ msg: 'Error al crear el curso' })
    })
}
function getAllCourses(req, res) {
  const { page = 1, limit = 10 } = req.query

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
  }

  Course.paginate({}, options)
    .then(coursesStored => {
      res.status(200).send(coursesStored)
    })
    .catch(() => {
      res.status(400).send({ msg: 'Error al obtener los cursos' })
    })
}
function updateCourse(req, res) {
  const { id } = req.params
  const courseData = req.body

  if (req.files.miniature) {
    const imagePath = image.getFilePath(req.files.miniature)
    courseData.miniature = imagePath
  }

  Course.findByIdAndUpdate({ _id: id }, courseData)
    .then(() => {
      return res.status(201).send({ msg: 'Actualización de curso correcta' })
    })
    .catch(() => {
      res.status(400).send({ msg: 'Error al actualizar el curso' })
    })
}

function deleteCourse(req, res) {
  const { id } = req.params

  Course.findByIdAndDelete({ _id: id })
    .then(() => {
      return res.status(201).send({ msg: 'Eliminación de curso correcta' })
    })
    .catch(() => {
      res.status(400).send({ msg: 'Error al eliminar el curso' })
    })
}

module.exports = {
  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
}
