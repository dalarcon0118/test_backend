import vine from '@vinejs/vine'

export const createClassEnrollmentValidator = vine.compile(
  vine.object({
    student_id: vine
      .number()
      .positive()
      .exists(async (db, value) => {
        const student = await db.from('students').where('id', value).first()
        return !!student
      }),
    course_id: vine
      .number()
      .positive()
      .exists(async (db, value) => {
        const course = await db.from('courses').where('id', value).first()
        return !!course
      }),
    initial_date: vine.date({ formats: ['YYYY-MM-DD'] }),
    // Opcional: Validar unicidad para evitar inscripciones duplicadas
    // Esto depende de tu lógica de negocio.
    // Por ejemplo, un estudiante no puede inscribirse dos veces al mismo curso
    // en la misma fecha de inicio.
    // unique: vine.group([
    //   vine.rule(async (value, { meta, errorReporter }) => {
    //     const { student_id, course_id, initial_date } = meta.original
    //     const existingEnrollment = await db
    //       .from('classes')
    //       .where('student_id', student_id)
    //       .where('course_id', course_id)
    //       .where('initial_date', initial_date) // Asegúrate que el formato de fecha coincida
    //       .first()
    //     if (existingEnrollment) {
    //       errorReporter.report(
    //         'This student is already enrolled in this course for this date.',
    //         'unique',
    //         meta
    //       )
    //     }
    //   }),
    // ]),
  })
)
