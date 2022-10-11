import { createSchema } from '../createTables'
import { database } from '../knex'

describe('Create Tables test', () => {
  afterAll(async () => {
    await database.schema.dropSchema
    jest.clearAllMocks()
  })

  it('Should create tables with sucess', async () => {
    const tables = await createSchema()
    expect(tables.message).toBe('Tables created')
  })

  // it('Should try to create duplicated tables', async () => {
  //   const tables = await createSchema()
  //   expect(tables.message).toBe(undefined)
  // })
})
