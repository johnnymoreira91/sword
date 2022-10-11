import { TaskRepository } from '@repositories/implementations/TaskRepository'
import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { EditTaskController } from './EditTaskController'
import { EditTaskUseCase } from './EditTaskUseCase'

const taskRepository = new TaskRepository()
const userRepository = new UsersRepository()

const editTaskUseCase = new EditTaskUseCase(
  taskRepository,
  userRepository
)

const editTaskController = new EditTaskController(
  editTaskUseCase
)

export {
  editTaskController,
  editTaskUseCase
}
