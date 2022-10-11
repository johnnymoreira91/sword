import { CreateUserUseCase } from '../CreateUserUseCase'
import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { User } from '@entities/User'
import { InsertMock } from '@utils/mock'
import { database } from '@infra/database/knex'

describe('CreateUserUseCase test', () => {
  let createUserUseCase: CreateUserUseCase
  let userRepository: UsersRepository

  beforeAll(async () => {
    userRepository = new UsersRepository()
    createUserUseCase = new CreateUserUseCase(userRepository)
    await InsertMock()
  })

  afterAll(async () => {
    await database.schema.dropSchema
    jest.clearAllMocks()
  })

  test('It Should create one user', async () => {
    const user: Omit<User, 'id'> = {
      name: 'superTest2',
      email: 'superTest2@test.com',
      password: 'test',
      permission: 2,
      public_id: 'abc-1234',
      age: 33,
      active: true
    }

    const data = await createUserUseCase.execute(user)
    expect(data.name).toBe('superTest2')
    expect(data.email).toBe('superTest2@test.com')
  })

  test('It Should give error to duplicate users', async () => {
    const user: Omit<User, 'id'> = {
      name: 'superTest2',
      email: 'superTest2@test.com',
      password: 'test',
      permission: 2,
      public_id: 'abc-1234',
      age: 33,
      active: true
    }

    try {
      const data = await createUserUseCase.execute(user)
      expect(data.name).toBe('superTest2')
    } catch (error) {
      expect(error.message).toBe('User already exist')
    }
  })
})
