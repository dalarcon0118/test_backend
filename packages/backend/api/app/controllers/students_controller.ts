import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student' // Asegúrate que la ruta al modelo Student es correcta
import { createStudentValidator } from '#validators/create_student_validator' // Ruta al validador creado

export default class StudentsController {
  /**
   * Handle new student registration
   */
  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createStudentValidator)

    try {
      // Asumiendo que tu modelo Student tiene los campos name, email, birth_date
      // y que birth_date en el modelo es de tipo DateTime de Luxon o compatible.
      const studentData: { name: string; email: string; birth_date?: any } = {
        name: payload.name,
        email: payload.email,
      }

      if (payload.birth_date) {
        studentData.birth_date = payload.birth_date // VineJS ya lo convierte a objeto Date de JS
      }

      const student = await Student.create(studentData)
      return response.created(student)
    } catch (error) {
      console.error('Error creating student:', error)
      return response
        .status(500)
        .json({ message: 'An error occurred while creating the student.', error: error.message })
    }
  }

  // Aquí puedes añadir otros métodos como index, show, update, destroy
}