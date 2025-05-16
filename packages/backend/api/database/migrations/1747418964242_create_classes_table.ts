import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'classes' // Nombre de la tabla en inglés

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table
        .integer('course_id')
        .unsigned()
        .references('id')
        .inTable('courses') // Referencia a la tabla 'courses'
        .onDelete('CASCADE') // Opcional: si se borra un curso, se borran sus clases
        .notNullable()

      table
        .integer('student_id')
        .unsigned()
        .references('id')
        .inTable('students') // Referencia a la tabla 'students'
        .onDelete('CASCADE') // Opcional: si se borra un estudiante, se borran sus clases
        .notNullable()

      table.date('initial_date').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      // Opcional: Para asegurar que un estudiante no se inscriba múltiples veces al mismo curso.
      // Si la fecha de inicio también es parte de la unicidad, puedes agregarla:
      // table.unique(['course_id', 'student_id', 'initial_date'])
      // O si solo es la combinación de curso y estudiante:
      // table.unique(['course_id', 'student_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
