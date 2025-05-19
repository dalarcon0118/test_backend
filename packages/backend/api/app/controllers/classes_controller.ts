import { HttpContext } from '@adonisjs/core/http'
import Class from '#models/class'
import { createClassEnrollmentValidator } from '#validators/create_class_enrollment_validator'
import { DateTime } from 'luxon'

export default class ClassesController {
  async index({ request, response }: HttpContext) {
    try {
      const studentId = request.qs().studentId
      const courseId = request.qs().courseId

      let query = Class.query().preload('course').preload('student')

      if (studentId) {
        query = query.where('student_id', studentId)
      }
      if (courseId) {
        query = query.where('course_id', courseId)
      }

      const classes = await query.exec()
      const result = classes.map((c) => ({
        id: c.id,
        course: c.course
          ? {
              id: c.course.id,
              name: c.course.name,
              description: c.course.description,
            }
          : null,
        student: c.student
          ? {
              id: c.student.id,
              name: c.student.name,
              birthDate: c.student.birth_date,
            }
          : null,
        initialDate: c.initial_date,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      }))
      return response.status(200).json(result)
    } catch (error) {
      return response.status(500).json({ error: 'Error al obtener las clases' })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const c = await Class.query()
        .where('id', params.id)
        .preload('course')
        .preload('student')
        .firstOrFail()

      const result = {
        id: c.id,
        course: c.course
          ? {
              id: c.course.id,
              name: c.course.name,
              description: c.course.description,
            }
          : null,
        student: c.student
          ? {
              id: c.student.id,
              name: c.student.name,
              birthDate: c.student.birth_date,
            }
          : null,
        initialDate: c.initial_date,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      }
      return response.status(200).json(result)
    } catch (error) {
      return response.status(404).json({ error: 'Clase no encontrada' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createClassEnrollmentValidator)
      const npayload = {
        ...payload,
        initial_date:
          payload.initial_date && payload.initial_date instanceof Date
            ? DateTime.fromJSDate(payload.initial_date)
            : payload.initial_date,
      }
      const c = await Class.create(npayload)
      await c.load('course')
      await c.load('student')
      const result = {
        id: c.id,
        course: c.course
          ? {
              id: c.course.id,
              name: c.course.name,
              description: c.course.description,
            }
          : null,
        student: c.student
          ? {
              id: c.student.id,
              name: c.student.name,
              birthDate: c.student.birth_date,
            }
          : null,
        initialDate: c.initial_date,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      }
      return response.status(201).json(result)
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.status(422).json({ errors: error.messages })
      }
      return response.status(500).json({ error: 'Error al crear la clase', details: error.message })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const classes = await Class.findOrFail(params.id)
      const data = request.only(['name', 'schedule'])
      await classes.merge(data as any).save()
      return response.status(200).json(classes)
    } catch (error) {
      return response.status(404).json({ error: 'Clase no encontrada' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const classes = await Class.findOrFail(params.id)
      await classes.delete()
      return response.status(204)
    } catch (error) {
      return response.status(404).json({ error: 'Clase no encontrada' })
    }
  }
}
