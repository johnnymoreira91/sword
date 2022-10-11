import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { InsertMock } from '@utils/mock'
import { database } from '@infra/database/knex'
import { ListUserUseCase } from '../ListUserUseCase'

describe('CreateUserUseCase test', () => {
  let listUserUseCase: ListUserUseCase
  let userRepository: UsersRepository

  beforeAll(async () => {
    userRepository = new UsersRepository()
    listUserUseCase = new ListUserUseCase(userRepository)
    await InsertMock()
  })

  afterAll(async () => {
    await database.schema.dropSchema
    jest.clearAllMocks()
  })

  test('It Should list all users', async () => {
    const users = await listUserUseCase.execute()
    expect(users.length).toBeGreaterThan(1)
  })

  test('It expect an empty array of users', async () => {
    await database('users').del()
    try {
      const data = await listUserUseCase.execute()
      expect(data.length).toBe(0)
    } catch (error) {
      expect(error.message).toBe('Any Users found')
    }
  })

  test('It expect an empty array of users', async () => {
    await database.schema.dropTable('users')
    try {
      const data = await listUserUseCase.execute()
      expect(data.length).toBe(0)
    } catch (error) {
      expect(error.message).toBe('select `users`.* from `users` - SQLITE_ERROR: no such table: users')
    }
  })
})
