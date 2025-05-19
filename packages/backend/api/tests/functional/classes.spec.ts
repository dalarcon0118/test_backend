import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'

test.group('Classes endpoints', (group) => {
  group.setup(async () => {
    await db.beginGlobalTransaction()
  })

  group.teardown(async () => {
    await db.rollbackGlobalTransaction()
  })

  test('listar todas las clases', async ({ client }) => {
    const response = await client.get('/api/classes')
    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('obtener una clase por ID', async ({ client }) => {
    // Primero creamos un curso
    const course = await client.post('/api/courses').json({
      name: 'Curso para Clase',
      description: 'Descripción del curso',
    })
    // Luego creamos una clase asociada a ese curso
    const createdClass = await client.post('/api/classes').json({
      name: 'Clase de Prueba',
      course_id: course.body().id,
      schedule: '2023-05-15T10:00:00.000Z',
    })

    const classId = createdClass.body().id

    const response = await client.get(`/api/classes/${classId}`)

    response.assertStatus(200)
    response.assertBodyContains({
      name: 'Clase de Prueba',
      course_id: course.body().id,
    })
  })

  test('crear una nueva clase', async ({ client }) => {
    // Primero creamos un curso
    const course = await client.post('/api/courses').json({
      name: 'Otro Curso para Clase',
      description: 'Descripción del curso',
    })

    const response = await client.post('/api/classes').json({
      name: 'Nueva Clase',
      course_id: course.body().id,
      schedule: '2023-05-16T14:00:00.000Z',
    })

    response.assertStatus(201)
    response.assertBodyContains({
      name: 'Nueva Clase',
      course_id: course.body().id,
    })
  })

  test('actualizar una clase existente', async ({ client }) => {
    // Primero creamos un curso
    const course = await client.post('/api/courses').json({
      name: 'Curso para Actualizar Clase',
      description: 'Descripción del curso',
    })

    // Luego creamos una clase para actualizarla
    const createdClass = await client.post('/api/classes').json({
      name: 'Clase para Actualizar',
      course_id: course.body().id,
      schedule: '2023-05-17T09:00:00.000Z',
    })

    const classId = createdClass.body().id

    const response = await client.put(`/api/classes/${classId}`).json({
      name: 'Clase Actualizada',
      schedule: '2023-05-17T11:00:00.000Z',
    })

    response.assertStatus(200)
    response.assertBodyContains({
      name: 'Clase Actualizada',
      course_id: course.body().id,
    })
  })

  test('eliminar una clase', async ({ client }) => {
    // Primero creamos un curso
    const course = await client.post('/api/courses').json({
      name: 'Curso para Eliminar Clase',
      description: 'Descripción del curso',
    })

    // Luego creamos una clase para eliminarla
    const createdClass = await client.post('/api/classes').json({
      name: 'Clase para Eliminar',
      course_id: course.body().id,
      schedule: '2023-05-18T15:00:00.000Z',
    })

    const classId = createdClass.body().id

    const response = await client.delete(`/api/classes/${classId}`)

    response.assertStatus(204)

    // Verificamos que la clase ya no existe
    const getResponse = await client.get(`/api/classes/${classId}`)
    getResponse.assertStatus(404)
  })

  test('validar curso existente al crear una clase', async ({ client }) => {
    const response = await client.post('/api/classes').json({
      name: 'Clase con Curso Inválido',
      course_id: 9999, // ID de curso que no existe
      schedule: '2023-05-19T10:00:00.000Z',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'course_id',
          rule: 'exists',
        },
      ],
    })
  })
})
