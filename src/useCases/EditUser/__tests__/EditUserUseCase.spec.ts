import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { InsertMock } from '@utils/mock'
import { database } from '@infra/database/knex'
import { EditUserUseCase } from '../EditUserUseCase'

describe('CreateUserUseCase test', () => {
  let editUserUseCase: EditUserUseCase
  let userRepository: UsersRepository

  beforeAll(async () => {
    userRepository = new UsersRepository()
    editUserUseCase = new EditUserUseCase(userRepository)
    await InsertMock()
  })

  afterAll(async () => {
    await database.schema.dropSchema
    jest.clearAllMocks()
  })

  test('It Should edit one user', async () => {
    const user = await userRepository.findByEmail('super@super.com')
    user.age = 99
    user.name = 'super user'
    const userReturn = await editUserUseCase.execute(user)
    expect(userReturn.email).toBe('super@super.com')
    expect(userReturn.age).toBe(99)
    expect(userReturn.name).toBe('super user')
  })

  test('It Should not find user to edit', async () => {
    try {
      await editUserUseCase.execute({
        email: 'not@found.com',
        name: 'notFound',
        password: 'not',
        age: 0,
        active: true,
        permission: 1
      })
    } catch (error) {
      expect(error.message).toBe('User not found')
    }
  })
})
