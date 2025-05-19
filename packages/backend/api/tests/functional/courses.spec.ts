import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'
test.group('Courses endpoints', (group) => {
  // Ejecutar migraciones antes de cada grupo de tests
  group.setup(async () => {
    await db.beginGlobalTransaction()
  })

  // Revertir cambios después de cada grupo de tests
  group.teardown(async () => {
    await db.rollbackGlobalTransaction()
  })

  test('listar todos los cursos', async ({ client }) => {
    const response = await client.get('/api/courses')
    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('obtener un curso por ID', async ({ client }) => {
    // Primero creamos un curso para luego obtenerlo
    const createdCourse = await client.post('/api/courses').json({
      name: 'Curso de Prueba',
      description: 'Descripción del curso de prueba',
    })

    const courseId = createdCourse.body().id
    const response = await client.get(`/api/courses/${courseId}`)
    response.assertStatus(200)
    response.assertBodyContains({
      name: 'Curso de Prueba',
      description: 'Descripción del curso de prueba',
    })
  })

  test('crear un nuevo curso', async ({ client }) => {
    const response = await client.post('/api/courses').json({
      name: 'Nuevo Curso',
      description: 'Descripción del nuevo curso',
    })
    response.assertStatus(201)
    response.assertBodyContains({
      name: 'Nuevo Curso',
      description: 'Descripción del nuevo curso',
    })
  })

  test('actualizar un curso existente', async ({ client }) => {
    // Primero creamos un curso para luego actualizarlo
    const createdCourse = await client.post('/api/courses').json({
      name: 'Curso para Actualizar',
      description: 'Descripción inicial',
    })

    const courseId = createdCourse.body().id

    const response = await client.put(`/api/courses/${courseId}`).json({
      name: 'Curso Actualizado',
      description: 'Descripción actualizada',
    })

    response.assertStatus(200)
    response.assertBodyContains({
      name: 'Curso Actualizado',
      description: 'Descripción actualizada',
    })
  })

  test('eliminar un curso', async ({ client }) => {
    // Primero creamos un curso para luego eliminarlo
    const createdCourse = await client.post('/api/courses').json({
      name: 'Curso para Eliminar',
      description: 'Este curso será eliminado',
    })

    const courseId = createdCourse.body().id

    const response = await client.delete(`/api/courses/${courseId}`)

    response.assertStatus(204)

    // Verificamos que el curso ya no existe
    const getResponse = await client.get(`/api/courses/${courseId}`)
    getResponse.assertStatus(404)
  })

  test('validar campos requeridos al crear un curso', async ({ client }) => {
    const response = await client.post('/api/courses').json({
      // Omitimos el campo 'name' que es requerido
      description: 'Descripción sin nombre',
    })

    response.assertStatus(422) // Unprocessable Entity
    response.assertBodyContains({
      errors: [
        {
          field: 'name',
          rule: 'required',
        },
      ],
    })
  })
})
