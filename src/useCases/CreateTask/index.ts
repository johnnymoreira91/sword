import { TaskRepository } from '@repositories/implementations/TaskRepository'
import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { CreateTaskController } from './CreateTaskController'
import { CreateTaskUseCase } from './CreateTaskUseCase'

const taskRepository = new TaskRepository()
const userRepository = new UsersRepository()

const createTaskUseCase = new CreateTaskUseCase(
  taskRepository,
  userRepository
)

const createTaskController = new CreateTaskController(
  createTaskUseCase
)

export {
  createTaskController,
  createTaskUseCase
}
