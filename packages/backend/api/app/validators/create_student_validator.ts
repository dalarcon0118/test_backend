import vine from '@vinejs/vine'

export const createStudentValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        // Asegúrate de que el nombre de la tabla 'students' sea correcto
        const student = await db.from('students').where('email', value).first()
        return !student
      }),
    birth_date: vine.date({ formats: ['YYYY-MM-DD'] }), // Formato YYYY-MM-DD. Cambia .optional() si es requerido.
  })
)
