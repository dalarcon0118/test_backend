import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
// Asume que el validador está en la siguiente ruta
import { createStudentValidator } from '#validators/create_student_validator'
import luxon, { DateTime } from 'luxon'

export default class StudentsController {
  async index({ response }: HttpContext) {
    try {
      const students = await Student.all()
      return response.status(200).json(students)
    } catch (error) {
      return response.status(500).json({ error: 'Error al obtener los estudiantes' })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const student = await Student.findOrFail(params.id)
      return response.status(200).json(student)
    } catch (error) {
      return response.status(404).json({ error: 'Estudiante no encontrado' })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createStudentValidator)
      // Convertir birth_date a DateTime si existe y es string
      const npayload = {
        ...payload,
        birth_date:
          payload.birth_date && payload.birth_date instanceof Date
            ? DateTime.fromJSDate(payload.birth_date)
            : payload.birth_date,
      }
      const student = await Student.create(npayload)
      return response.status(201).json(student)
    } catch (error) {
      if (error.code === 'E_VALIDATION_ERROR') {
        return response.status(422).json({ errors: error.messages })
      }
      return response
        .status(500)
        .json({ error: 'Error al crear el estudiante', details: error.message })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const student = await Student.findOrFail(params.id)
      const data = request.only(['name', 'email'])
      await student.merge(data as any).save()
      return response.status(200).json(student)
    } catch (error) {
      return response.status(404).json({ error: 'Estudiante no encontrado' })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const student = await Student.findOrFail(params.id)
      await student.delete()
      return response.status(204)
    } catch (error) {
      return response.status(404).json({ error: 'Estudiante no encontrado' })
    }
  }
}
