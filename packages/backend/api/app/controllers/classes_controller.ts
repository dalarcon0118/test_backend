import type { HttpContext } from '@adonisjs/core/http'
import Class from '#models/class' // Asegúrate que la ruta al modelo Class es correcta
import { createClassEnrollmentValidator } from '#validators/create_class_enrollment_validator' // Ruta al validador
import Student from '#models/student' // Importa el modelo Student para verificar su existencia

export default class ClassesController {
  /**
   * Handle new class enrollment (student in a course)
   */
  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createClassEnrollmentValidator)

    try {
      // Los datos ya están validados, incluyendo la existencia de student_id y course_id
      const classEnrollment = await Class.create({
        student_id: payload.student_id,
        course_id: payload.course_id,
        initial_date: payload.initial_date, // VineJS convierte la fecha a un objeto Date de JS
      })

      return response.created(classEnrollment)
    } catch (error) {
      // Considera un manejo de errores más específico si la validación de unicidad
      // (si la implementas en el validador o aquí) falla.
      console.error('Error creating class enrollment:', error)
      return response.status(500).json({
        message: 'An error occurred while enrolling the student.',
        error: error.message,
      })
    }
  }

  /**
   * List students enrolled in a specific course
   */
  public async getStudentsByCourse({ params, response }: HttpContext) {
    const courseId = params.courseId // Obtiene el ID del curso de los parámetros de la ruta

    try {
      // Busca las inscripciones para el curso dado y precarga la relación 'student'
      const enrollments = await Class.query()
        .where('course_id', courseId)
        .preload('student') // Precarga la información del estudiante relacionado
        .select('initial_date', 'student_id') // Selecciona solo los campos necesarios de la tabla 'classes'

      // Mapea los resultados para obtener el formato deseado
      const students = enrollments.map((enrollment) => ({
        id: enrollment.student.id,
        name: enrollment.student.name,
        email: enrollment.student.email,
        initial_date: enrollment.initial_date.toISODate(), // Formatea la fecha a YYYY-MM-DD
        // topic: 'Campo no encontrado', // Placeholder para el campo topic
      }))

      // Si no se encuentran inscripciones, devuelve un array vacío o un 404
      if (students.length === 0) {
        // Opcional: Puedes verificar si el curso existe primero y devolver 404 si no
        // const course = await Course.find(courseId)
        // if (!course) {
        //   return response.notFound({ message: 'Course not found' })
        // }
        return response.ok([]) // Devuelve un array vacío si el curso existe pero no tiene estudiantes
      }

      return response.ok(students)
    } catch (error) {
      console.error('Error fetching students by course:', error)
      return response.status(500).json({
        message: 'An error occurred while fetching students for the course.',
        error: error.message,
      })
    }
  }

  /**
   * List courses for a specific student
   */
  public async getCoursesByStudent({ params, response }: HttpContext) {
    const studentId = params.studentId // Obtiene el ID del estudiante de los parámetros de la ruta

    try {
      // Opcional: Verificar si el estudiante existe
      const student = await Student.find(studentId)
      if (!student) {
        return response.notFound({ message: 'Student not found' })
      }

      // Busca las inscripciones para el estudiante dado y precarga la relación 'course'
      const enrollments = await Class.query()
        .where('student_id', studentId)
        .preload('course') // Precarga la información del curso relacionado
        .select('initial_date', 'course_id') // Selecciona los campos necesarios de la tabla 'classes'

      // Mapea los resultados para obtener el formato deseado
      const courses = enrollments.map((enrollment) => ({
        id: enrollment.course.id,
        name: enrollment.course.name,
        description: enrollment.course.description,
        initial_date: enrollment.initial_date.toISODate(), // Formatea la fecha a YYYY-MM-DD
        // topic: 'Campo topic no disponible en la base de datos actual', // Placeholder para el campo topic
      }))

      // Si no se encuentran inscripciones, devuelve un array vacío
      if (courses.length === 0) {
        return response.ok([])
      }

      return response.ok(courses)
    } catch (error) {
      console.error('Error fetching courses by student:', error)
      return response.status(500).json({
        message: 'An error occurred while fetching courses for the student.',
        error: error.message,
      })
    }
  }
}
