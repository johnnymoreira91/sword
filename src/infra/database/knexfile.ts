import dotenv from 'dotenv'
dotenv.config()

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: ':memory:'
    },
    pool: {
      min: 2,
      max: 60,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 60 * 1000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false
    }
  },

  // test: {
  //   client: 'mysql2',
  //   useNullAsDefault: true,
  //   connection: {
  //     host: process.env.DB_HOST,
  //     port: 3306,
  //     user: process.env.DB_USER,
  //     password: process.env.DB_PASS,
  //     database: 'test'
  //   }
  // },

  dev: {
    client: 'mysql2',
    useNullAsDefault: true,
    connection: {
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  prod: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: 'prodDb.db'
    },
    pool: {
      min: 2,
      max: 60,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 60 * 1000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
      propagateCreateError: false
    }
  }

}
