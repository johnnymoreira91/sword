import { TaskRepository } from '@repositories/implementations/TaskRepository'
import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { ListTaskController } from './ListTaskController'
import { ListTaskUseCase } from './ListTaskUseCase'

const taskRepository = new TaskRepository()
const userRepository = new UsersRepository()

const listTaskUseCase = new ListTaskUseCase(
  taskRepository,
  userRepository
)

const listTaskController = new ListTaskController(
  listTaskUseCase
)

export {
  listTaskController,
  listTaskUseCase
}
