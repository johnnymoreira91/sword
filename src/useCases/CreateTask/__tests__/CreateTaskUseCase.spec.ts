
import { InsertMock } from '@utils/mock'
import { database } from '@infra/database/knex'
import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { CreateTaskUseCase } from '../CreateTaskUseCase'
import { TaskRepository } from '@repositories/implementations/TaskRepository'
import { Task } from '@entities/Task'

describe('CreateUserUseCase test', () => {
  let createTaskUseCase: CreateTaskUseCase
  let taskRepository: TaskRepository
  let userRepository: UsersRepository

  beforeAll(async () => {
    userRepository = new UsersRepository()
    taskRepository = new TaskRepository()
    createTaskUseCase = new CreateTaskUseCase(taskRepository, userRepository)
    await InsertMock()
  })

  afterAll(async () => {
    await database.schema.dropSchema
    jest.clearAllMocks()
  })

  test('It Should create a new task', async () => {
    const task = {
      public_id: 'user-9989',
      active: true,
      summary: 'Clear all HR computers'
    }

    const data = await createTaskUseCase.execute(task)
    expect(data.user_id).toBe(1)
    expect(data.active).toBe(true)
    expect(data.summary).toBe('Clear all HR computers')
  })

  test('It Should give error to not found users', async () => {
    const task = {
      public_id: 'user-xxxxx',
      active: true,
      summary: 'Clear all HR computers'
    }

    try {
      await createTaskUseCase.execute(task)
    } catch (error) {
      expect(error.message).toBe('User not found')
    }
  })
})
