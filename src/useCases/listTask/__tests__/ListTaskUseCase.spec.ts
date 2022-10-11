import { database } from '@infra/database/knex'
import { TaskRepository } from '@repositories/implementations/TaskRepository'
import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { InsertMock } from '@utils/mock'
import { ListTaskUseCase } from '../ListTaskUseCase'

describe('CreateUserUseCase test', () => {
  let listTaskUseCase: ListTaskUseCase
  let taskRepository: TaskRepository
  let userRepository: UsersRepository

  beforeAll(async () => {
    userRepository = new UsersRepository()
    taskRepository = new TaskRepository()
    listTaskUseCase = new ListTaskUseCase(taskRepository, userRepository)
    await InsertMock()
  })

  afterAll(async () => {
    await database.schema.dropSchema
    jest.clearAllMocks()
  })

  test('It Should list all tasks', async () => {
    const data = await listTaskUseCase.execute({
      permission: 2,
      user_id: 'user-9989'
    })
    expect(data.length).toBeGreaterThan(1)
  })

  test('It Should list task by one user', async () => {
    const data = await listTaskUseCase.execute({
      permission: 1,
      user_id: 'user-9989'
    })
    expect(data.length).toBeGreaterThan(1)
    expect(data[0].id).toBe(1)
    expect(data[0].public_id).toBe('my-task-001')
    expect(data[0].summary).toBe('Clear my computer')
    expect(data[0].completed_at).toBeNull()
  })

  test('It Should not found user', async () => {
    try {
      await listTaskUseCase.execute({
        permission: 1,
        user_id: 'user-notFound'
      })
    } catch (error) {
      expect(error.message).toBe('User Not found')
    }
  })

  test('It Should not found task for user', async () => {
    try {
      await listTaskUseCase.execute({
        permission: 1,
        user_id: 'user-9992'
      })
    } catch (error) {
      expect(error.message).toBe('Any Task for this user Found')
    }
  })

  test('It Should not found task for user with permission 2', async () => {
    try {
      const allTask = await taskRepository.list()
      for (const task of allTask) {
        await taskRepository.deleteById(task.public_id)
      }
      await listTaskUseCase.execute({
        permission: 2,
        user_id: 'user-9993'
      })
    } catch (error) {
      expect(error.message).toBe('Any task found')
    }
  })
})
