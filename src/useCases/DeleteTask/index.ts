import { TaskRepository } from '@repositories/implementations/TaskRepository'
import { DeleteTaskController } from './DeleteTaskController'
import { DeleteTaskUseCase } from './DeleteTaskUseCase'

const taskRepository = new TaskRepository()

const deleteTaskUseCase = new DeleteTaskUseCase(
  taskRepository
)

const deleteTaskController = new DeleteTaskController(
  deleteTaskUseCase
)

export {
  deleteTaskController,
  deleteTaskUseCase
}
