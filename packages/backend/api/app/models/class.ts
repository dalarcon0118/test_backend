import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Course from '#models/course' // Importa el modelo Course
import Student from '#models/student' // Importa el modelo Student

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare course_id: number

  @column()
  declare student_id: number

  @column.date()
  declare initial_date: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  // Relaciones
  @belongsTo(() => Course, {
    foreignKey: 'course_id',
  })
  declare course: BelongsTo<typeof Course>

  @belongsTo(() => Student, {
    foreignKey: 'student_id',
  })
  declare student: BelongsTo<typeof Student>
}
