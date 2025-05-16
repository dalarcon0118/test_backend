/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Importa el controlador de estudiantes
const StudentsController = () => import('#controllers/students_controller')

// Importa el controlador de cursos
const CoursesController = () => import('#controllers/courses_controller')

// Importa el controlador de clases/inscripciones
const ClassesController = () => import('#controllers/classes_controller')

router.post('students', [StudentsController, 'store'])
router.post('courses', [CoursesController, 'store'])
router.post('classes', [ClassesController, 'store']) // Nueva ruta para inscribir estudiantes en cursos

// Nueva ruta para listar estudiantes por curso
router.get('courses/:courseId/students', [ClassesController, 'getStudentsByCourse'])

// Nueva ruta para listar cursos por estudiante
router.get('students/:studentId/courses', [ClassesController, 'getCoursesByStudent'])

// Ejemplo de cómo agrupar rutas para un recurso
// router.resource('students', StudentsController).apiOnly()
// router.resource('courses', CoursesController).apiOnly()
// router.resource('classes', ClassesController).apiOnly()
