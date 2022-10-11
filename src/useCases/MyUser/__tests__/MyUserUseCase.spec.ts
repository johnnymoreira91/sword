import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { InsertMock } from '@utils/mock'
import { database } from '@infra/database/knex'
import { MyUserUseCase } from '../MyUserUseCase'

describe('CreateUserUseCase test', () => {
  let myUserUseCase: MyUserUseCase
  let userRepository: UsersRepository

  beforeAll(async () => {
    userRepository = new UsersRepository()
    myUserUseCase = new MyUserUseCase(userRepository)
    await InsertMock()
  })

  afterAll(async () => {
    await database.schema.dropSchema
    jest.clearAllMocks()
  })

  test('It Should get my user', async () => {
    const user = await (await userRepository.list()).filter(obj => obj.email === 'super@super.com')[0]
    const data = await myUserUseCase.execute({
      public_id: user.public_id
    })
    expect(data.email).toBe('super@super.com')
    expect(data.password).toBe('$2b$10$yXACv8e6D1cggJVocdoWqeN.KoR3Y.xOTrw.RvAKLy4kwgcGhOhU6')
    expect(data.active).toBe(1)
    expect(data.age).toBe(44)
  })

  test('It Should not found my user', async () => {
    try {
      await myUserUseCase.execute({
        public_id: 'test123'
      })
    } catch (error) {
      expect(error.message).toBe('User not found')
    }
  })
})
