import { database } from '@infra/database/knex'
import { TaskRepository } from '@repositories/implementations/TaskRepository'
import { InsertMock } from '@utils/mock'
import { DeleteTaskUseCase } from '../DeleteTaskUseCase'

describe('CreateUserUseCase test', () => {
  let deleteTaskUseCase: DeleteTaskUseCase
  let taskRepository: TaskRepository

  beforeAll(async () => {
    taskRepository = new TaskRepository()
    deleteTaskUseCase = new DeleteTaskUseCase(taskRepository)
    await InsertMock()
  })

  afterAll(async () => {
    await database.schema.dropSchema
    jest.clearAllMocks()
  })

  test('It Should list all tasks', async () => {
    const data = await deleteTaskUseCase.execute({
      permission: 2,
      task_public_id: 'my-task-001',
      user_id: 'user-9993'
    })
    expect(data).toBeUndefined()
  })

  test('It Should not found task', async () => {
    try {
      await deleteTaskUseCase.execute({
        permission: 1,
        task_public_id: 'my-task-notFound',
        user_id: 'user-9989'
      })
    } catch (error) {
      expect(error.message).toBe('Task not found')
    }
  })

  test('It Shouldtry to delete task without permission', async () => {
    try {
      await deleteTaskUseCase.execute({
        permission: 1,
        task_public_id: 'my-task-003',
        user_id: 'user-9989'
      })
    } catch (error) {
      expect(error.message).toBe('You are not able to delete this task')
    }
  })
})
