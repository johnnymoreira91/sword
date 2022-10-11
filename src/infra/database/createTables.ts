import { database } from '@database/knex'
import { createPermissions } from './seeds/permission'
import { createUsers } from './seeds/user'

async function createSchema (): Promise<boolean> {
  if (await database.schema.hasTable('permissions')) {
    return false
  }

  // Create database schema. You should use knex migration files
  // to do this. We create it here for simplicity.
  await database.schema.createTable('permissions', table => {
    table.increments('id').primary()
    table.integer('level', 2).unique()
    table.string('name', 100).notNullable()
    table.timestamp('created_at').defaultTo(database.raw('CURRENT_TIMESTAMP'))
    table.timestamp('updated_at').defaultTo(database.raw('CURRENT_TIMESTAMP'))
  })

  await database.schema.createTable('users', table => {
    table.increments('id').primary()
    table.uuid('public_id').unique()
    table.string('name', 100).notNullable()
    table.string('email', 100).notNullable().unique()
    table.string('password', 100).notNullable()
    table.integer('permission', 2).unsigned().references('id').inTable('permissions').notNullable().onUpdate('CASCADE')
    table.integer('age', 3).notNullable()
    table.boolean('active').defaultTo(true)
    table.timestamp('created_at').defaultTo(database.raw('CURRENT_TIMESTAMP'))
    table.timestamp('updated_at').defaultTo(database.raw('CURRENT_TIMESTAMP'))
  })

  await database.schema.createTable('tasks', table => {
    table.increments('id').primary()
    table.uuid('public_id').unique()
    table.integer('user_id', 5).notNullable().index().unsigned().references('id').inTable('users')
    table.string('summary', 2500).notNullable()
    table.boolean('active').defaultTo(true)
    table.timestamp('completed_at').nullable()
    table.timestamp('created_at').defaultTo(database.raw('CURRENT_TIMESTAMP'))
    table.timestamp('updated_at').defaultTo(database.raw('CURRENT_TIMESTAMP'))
  })

  await createPermissions()
  await createUsers()

  return true
}

export { createSchema }
