import knex, { Knex } from 'knex'
import config from './knexfile'
import { Model } from 'objection'
const environment = process.env.NODE_ENV || 'dev'

const database: Knex = knex(config[environment])

Model.knex(database)

export {
  Model,
  database
}
