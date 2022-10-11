import { User } from '@entities/User'
import { IPermissionRepository } from '@repositories/IPermissionRepository'
import { IUsersRepository } from '@repositories/IUsersRepository'
import { ICreateUserRequestDTO } from './CreateUserDTO'

class CreateUserUseCase {
  constructor (
    private usersRepository: IUsersRepository,
    private permissionRepository: IPermissionRepository
  ) {}

  async execute (data: ICreateUserRequestDTO): Promise<User> {
    const userAlreadyExist = await this.usersRepository.findByEmail(data.email)
    if (userAlreadyExist) {
      throw new Error('User already exist')
    }

    const permission = await this.permissionRepository.findByLevel(data.permission)
    if (!permission) {
      throw new Error('Permission not found')
    }

    data.permission = permission.id

    const user = new User(data)
    return await this.usersRepository.save(user)
  }
}

export { CreateUserUseCase }
