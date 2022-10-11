import { createUsers } from '../seeds/user'
import { database } from '../knex'
import { createPermissions } from '../seeds/permission'

describe('Create Tables test', () => {
  afterAll(async () => {
    await database.schema.dropSchema
    jest.clearAllMocks()
  })

  it('Should create user mock', async () => {
    await database.schema.dropSchema
    const data = await createUsers()
    expect(data).toBe(false)
  })

  it('Should create permissions mock', async () => {
    await database.schema.dropSchema
    const data = await createPermissions()
    expect(data).toBe(false)
  })
})
