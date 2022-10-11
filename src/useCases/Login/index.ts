import { AuthRepository } from '@repositories/implementations/AuthRepository'
import { UsersRepository } from '@repositories/implementations/UsersRepository'
import { CacheService } from '@infra/services/CacheService'
import { LoginController } from './LoginController'
import { LoginUseCase } from './LoginUseCase'

const cacheService = new CacheService()

const usersRepository = new UsersRepository()
const authRepository = new AuthRepository(
  cacheService
)

const loginUseCase = new LoginUseCase(
  usersRepository,
  authRepository
)

const loginController = new LoginController(
  cacheService,
  loginUseCase
)

export {
  loginUseCase,
  loginController
}
