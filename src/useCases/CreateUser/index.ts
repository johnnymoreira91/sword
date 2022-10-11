import { PermissionRepository } from '@repositories/implementations/PermissionRepository'
import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { CreateUserController } from './CreateUserController'
import { CreateUserUseCase } from './CreateUserUseCase'

const usersRepository = new UsersRepository()
const permissionRepository = new PermissionRepository()

const createUserUseCase = new CreateUserUseCase(
  usersRepository,
  permissionRepository
)

const createUserController = new CreateUserController(
  createUserUseCase
)

export {
  createUserUseCase,
  createUserController
}
