import type { HttpContext } from '@adonisjs/core/http'
import Course from '#models/course'
import { createCourseValidator } from '#validators/create_course_validator'

export default class CoursesController {
  /**
   * Display a list of courses
   */
  public async index({ response }: HttpContext) {
    try {
      const courses = await Course.all()
      return response.ok(courses)
    } catch (error) {
      return response.status(500).json({
        message: 'An error occurred while fetching courses.',
        error: error.message,
      })
    }
  }

  /**
   * Display a single course
   */
  public async show({ params, response }: HttpContext) {
    try {
      const course = await Course.findOrFail(params.id)
      return response.ok(course)
    } catch (error) {
      return response.notFound({
        message: 'Course not found',
        error: error.message,
      })
    }
  }

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

  /**
   * Update course details
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      const course = await Course.findOrFail(params.id)
      const payload = await request.validateUsing(createCourseValidator)

      const courseData: { name: string; description?: string } = {
        name: payload.name,
      }

      if (payload.description) {
        courseData.description = payload.description
      }

      await course.merge(courseData).save()
      return response.ok(course)
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Course not found' })
      }
      return response.status(500).json({
        message: 'An error occurred while updating the course.',
        error: error.message,
      })
    }
  }

  /**
   * Delete a course
   */
  public async destroy({ params, response }: HttpContext) {
    try {
      const course = await Course.findOrFail(params.id)
      await course.delete()
      return response.noContent()
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ message: 'Course not found' })
      }
      return response.status(500).json({
        message: 'An error occurred while deleting the course.',
        error: error.message,
      })
    }
  }
}
