import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { MyUserController } from './MyUserController'
import { MyUserUseCase } from './MyUserUseCase'

const userRepository = new UsersRepository()

const myUserUserCase = new MyUserUseCase(
  userRepository
)

const myUserController = new MyUserController(
  myUserUserCase
)

export {
  myUserController,
  myUserUserCase
}
