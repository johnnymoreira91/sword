import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { InsertMock } from '@utils/mock'
import { database } from '@infra/database/knex'
import { DeleteUserUseCase } from '@useCases/DeleteUser/DeleteUserUseCase'

describe('CreateUserUseCase test', () => {
  let deleteUserUseCase: DeleteUserUseCase
  let userRepository: UsersRepository

  beforeAll(async () => {
    userRepository = new UsersRepository()
    deleteUserUseCase = new DeleteUserUseCase(userRepository)
    await InsertMock()
  })

  afterAll(async () => {
    await database.schema.dropSchema
    jest.clearAllMocks()
  })

  test('It Should delete one user', async () => {
    const undefinedReturn = await deleteUserUseCase.execute({
      public_id: 'user-9989'
    })
    expect(undefinedReturn).toBe(undefined)
  })
})
