import { database } from '@database/knex'
import { PermissionModel } from '@database/ModelInfra/Permission'

async function createSchema (): Promise<boolean> {
  if (await !database.schema.hasTable('users')) {
    return false
  }

  // Create database schema. You should use knex migration files
  // to do this. We create it here for simplicity.
  await database.schema.createTable('permissions', table => {
    table.increments('id').primary()
    table.integer('level', 2).notNullable()
    table.string('name', 100).notNullable()
    table.timestamps(true, true)
  })

  await database.schema.createTable('users', table => {
    table.increments('id').primary()
    table.uuid('public_id').unique()
    table.string('name', 100).notNullable()
    table.string('email', 100).notNullable()
    table.string('password', 100).notNullable()
    table.integer('permission', 2).unsigned().references('id').inTable('permissions').notNullable()
    table.integer('age', 3).notNullable()
    table.boolean('isGuest').defaultTo(false)
    table.boolean('active').defaultTo(true)
    table.timestamps(true, true)
  })

  await database.schema.createTable('tasks', table => {
    table.increments('id').primary()
    table.uuid('public_id').unique()
    table.integer('user_id', 5).notNullable().index().unsigned().references('id').inTable('users')
    table.string('summary', 2500).notNullable()
    table.boolean('active').defaultTo(true)
    table.timestamp('completed_at').nullable()
    table.timestamps(true, true)
  })

  const retPermission = await createPermissions()
  if (retPermission === false) {
    return false
  }
  return true
}

async function createPermissions (): Promise<boolean> {
  try {
    await database.transaction(async trx => {
      await PermissionModel.query(trx).insert({
        name: 'Technician',
        level: 0
      })
      await PermissionModel.query(trx).insert({
        name: 'Manager',
        level: 1
      })
    })
    return true
  } catch (error) {
    return false
  }
}

export { createSchema }
