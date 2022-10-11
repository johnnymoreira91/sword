import { User } from '@entities/User'
import { Response } from 'express'
import { LoginReturn } from '@shared/interfaces/LoginReturn'

export interface IAuthRepository {
  doLogin(login: User, password: string, ip: string, cacheKey: string, res: Response): Promise<LoginReturn>;
}
