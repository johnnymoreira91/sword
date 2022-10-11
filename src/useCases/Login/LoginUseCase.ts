import { IUsersRepository } from '@repositories/IUsersRepository'
import { ILoginRequestDTO } from './LoginDTO'
import { IAuthRepository } from '@repositories/IAuthRepository'
import { LoginReturn } from '@shared/interfaces/LoginReturn'

class LoginUseCase {
  constructor (
    private usersRepository: IUsersRepository,
    private authRepository: IAuthRepository
  ) {}

  async execute (data: ILoginRequestDTO): Promise<LoginReturn> {
    const findUser = await this.usersRepository.findByEmail(data.email)

    if (!findUser) {
      throw new Error('User not found')
    }

    return this.authRepository.doLogin(findUser, data.password, data.ip, data.cacheKey, data.res)
  }
}

export { LoginUseCase }
