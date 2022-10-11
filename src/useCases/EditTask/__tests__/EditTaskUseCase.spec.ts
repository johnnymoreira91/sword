import { database } from '@infra/database/knex'
import { TaskRepository } from '@repositories/implementations/TaskRepository'
import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { InsertMock } from '@utils/mock'
import { EditTaskUseCase } from '../EditTaskUseCase'

describe('CreateUserUseCase test', () => {
  let editTaskUseCase: EditTaskUseCase
  let taskRepository: TaskRepository
  let userRepository: UsersRepository

  beforeAll(async () => {
    taskRepository = new TaskRepository()
    userRepository = new UsersRepository()
    editTaskUseCase = new EditTaskUseCase(taskRepository, userRepository)
    await InsertMock()
  })

  afterAll(async () => {
    await database.schema.dropSchema
    jest.clearAllMocks()
  })

  test('It Should try to edit task that doenst belong to user', async () => {
    try {
      await editTaskUseCase.execute({
        public_id: 'my-task-001',
        user_id: 'user-9993',
        summary: 'Clear my computer - need buy a new mouse for this computer',
        active: true
      })
    } catch (error) {
      expect(error.message).toBe('This task doesnt belong to you')
    }
  })

  test('It edit a task', async () => {
    const data = await editTaskUseCase.execute({
      user_id: 'user-9989',
      summary: 'Clear my computer - need buy a new mouse',
      public_id: 'my-task-001',
      active: true
    })
    expect(data.summary).toBe('Clear my computer - need buy a new mouse')
  })

  test('It Should not found task', async () => {
    try {
      await editTaskUseCase.execute({
        public_id: 'my-task-notFound',
        user_id: 'user-9993',
        summary: 'Clear my computer - need buy a new mouse for this computer',
        active: true
      })
    } catch (error) {
      expect(error.message).toBe('Task not found')
    }
  })
})
