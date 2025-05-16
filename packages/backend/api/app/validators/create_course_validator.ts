import vine from '@vinejs/vine'

export const createCourseValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3),
    description: vine.string().trim().minLength(10).optional(), // Descripción opcional, mínimo 10 caracteres si se provee
  })
)