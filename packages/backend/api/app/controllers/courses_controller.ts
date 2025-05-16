import type { HttpContext } from '@adonisjs/core/http'
import Course from '#models/course' // Asegúrate que la ruta al modelo Course es correcta
import { createCourseValidator } from '#validators/create_course_validator' // Ruta al validador creado

export default class CoursesController {
  /**
   * Handle new course creation
   */
  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createCourseValidator)

    try {
      const courseData: { name: string; description?: string } = {
        name: payload.name,
      }

      if (payload.description) {
        courseData.description = payload.description
      }

      const course = await Course.create(courseData)
      return response.created(course)
    } catch (error) {
      console.error('Error creating course:', error)
      return response
        .status(500)
        .json({ message: 'An error occurred while creating the course.', error: error.message })
    }
  }

  // Aquí puedes añadir otros métodos como index, show, update, destroy
}
