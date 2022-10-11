import { createSchema } from '../createTables'
import { database } from '../knex'

describe('Create Tables test', () => {
  afterAll(async () => {
    await database.schema.dropSchema
    jest.clearAllMocks()
  })

  it('Should create tables with sucess', async () => {
    const tables = await createSchema()
    expect(tables).toBe(true)
  })

  it('Should try to create duplicated user table', async () => {
    await createSchema()
    const tables = await createSchema()
    expect(tables).toBe(false)
  })
})
