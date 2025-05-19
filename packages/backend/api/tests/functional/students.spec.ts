import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'
test.group('Students endpoints', (group) => {
  group.setup(async () => {
    await db.beginGlobalTransaction()
  })

  group.teardown(async () => {
    await db.rollbackGlobalTransaction()
  })

  test('listar todos los estudiantes', async ({ client }) => {
    const response = await client.get('/api/students')

    response.assertStatus(200)
    response.assertBodyContains([])
  })

  test('obtener un estudiante por ID', async ({ client }) => {
    // Primero creamos un estudiante para luego obtenerlo
    const createdStudent = await client.post('/api/students').json({
      name: 'Juan Pérez',
      email: 'juan@example.com',
      phone: '123456789',
    })

    const studentId = createdStudent.body().id

    const response = await client.get(`/api/students/${studentId}`)

    response.assertStatus(200)
    response.assertBodyContains({
      name: 'Juan Pérez',
      email: 'juan@example.com',
    })
  })

  test('crear un nuevo estudiante', async ({ client }) => {
    const response = await client.post('/api/students').json({
      name: 'María López',
      email: 'maria@example.com',
      phone: '987654321',
    })

    response.assertStatus(201)
    response.assertBodyContains({
      name: 'María López',
      email: 'maria@example.com',
    })
  })

  test('actualizar un estudiante existente', async ({ client }) => {
    // Primero creamos un estudiante para luego actualizarlo
    const createdStudent = await client.post('/api/students').json({
      name: 'Pedro Gómez',
      email: 'pedro@example.com',
      phone: '555555555',
    })

    const studentId = createdStudent.body().id

    const response = await client.put(`/api/students/${studentId}`).json({
      name: 'Pedro Gómez Actualizado',
      email: 'pedro.nuevo@example.com',
    })

    response.assertStatus(200)
    response.assertBodyContains({
      name: 'Pedro Gómez Actualizado',
      email: 'pedro.nuevo@example.com',
    })
  })

  test('eliminar un estudiante', async ({ client }) => {
    // Primero creamos un estudiante para luego eliminarlo
    const createdStudent = await client.post('/api/students').json({
      name: 'Ana Torres',
      email: 'ana@example.com',
      phone: '111222333',
    })

    const studentId = createdStudent.body().id

    const response = await client.delete(`/api/students/${studentId}`)

    response.assertStatus(204)

    // Verificamos que el estudiante ya no existe
    const getResponse = await client.get(`/api/students/${studentId}`)
    getResponse.assertStatus(404)
  })

  test('validar email único al crear un estudiante', async ({ client }) => {
    // Primero creamos un estudiante
    await client.post('/api/students').json({
      name: 'Carlos Ruiz',
      email: 'carlos@example.com',
      phone: '444333222',
    })

    // Intentamos crear otro estudiante con el mismo email
    const response = await client.post('/api/students').json({
      name: 'Otro Carlos',
      email: 'carlos@example.com', // Email duplicado
      phone: '999888777',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          rule: 'unique',
        },
      ],
    })
  })
})
