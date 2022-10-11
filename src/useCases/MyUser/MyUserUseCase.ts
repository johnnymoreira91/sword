import { User } from '@entities/User'
import { IUsersRepository } from '@repositories/IUsersRepository'
import { IMyUserRequestDTO } from './MyUserDTO'

class MyUserUseCase {
  constructor (
    private usersRepository: IUsersRepository
  ) {}

  async execute (data: IMyUserRequestDTO): Promise<User> {
    const findUser = await this.usersRepository.findById(data.public_id)

    if (!findUser) {
      throw new Error('User not found')
    }

    return findUser
  }
}

export { MyUserUseCase }
