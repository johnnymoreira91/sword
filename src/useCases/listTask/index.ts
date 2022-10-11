import { TaskRepository } from '@repositories/implementations/TaskRepository'
import { ListTaskController } from './ListTaskController'
import { ListTaskUseCase } from './ListTaskUseCase'

const taskRepository = new TaskRepository()

const listTaskUseCase = new ListTaskUseCase(
  taskRepository
)

const listTaskController = new ListTaskController(
  listTaskUseCase
)

export {
  listTaskController,
  listTaskUseCase
}
