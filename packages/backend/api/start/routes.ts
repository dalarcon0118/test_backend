import router from '@adonisjs/core/services/router'
// Import the controller directly using its filename for the alias
const StudentsController = () => import('#controllers/students_controller')
const CoursesController = () => import('#controllers/courses_controller')
const ClassesController = () => import('#controllers/classes_controller')

router
  .group(() => {
    // Rutas para cursos
    router.get('/courses', [CoursesController, 'index'])
    router.get('/courses/:id', [CoursesController, 'show'])
    router.post('/courses', [CoursesController, 'store'])
    router.put('/courses/:id', [CoursesController, 'update'])
    router.delete('/courses/:id', [CoursesController, 'destroy'])

    // Rutas para estudiantes
    router.get('/students', [StudentsController, 'index'])
    router.get('/students/:id', [StudentsController, 'show'])
    router.post('/students', [StudentsController, 'store'])
    router.put('/students/:id', [StudentsController, 'update'])
    router.delete('/students/:id', [StudentsController, 'destroy'])

    // Rutas para clases
    router.get('/classes', [ClassesController, 'index'])
    router.get('/classes/:id', [ClassesController, 'show'])
    router.post('/classes', [ClassesController, 'store'])
    router.put('/classes/:id', [ClassesController, 'update'])
    router.delete('/classes/:id', [ClassesController, 'destroy'])
  })
  .prefix('/api')
