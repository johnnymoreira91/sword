import { Response } from 'express'
import { CacheService } from '@infra/services/CacheService'
import { User } from '@entities/User'
import * as jwt from 'jsonwebtoken'
import { LoginReturn } from '@shared/interfaces/LoginReturn'

class AuthRepository {
  constructor (
    private cacheService: CacheService
  ) {}

  async doLogin (login: User, password: string, ip: string, cacheKey: string, res: Response): Promise<LoginReturn> {
    if (password === login.password) {
      const user = login
      const accessToken = jwt.sign(
        {
          login: user.public_id,
          permission: user.permission
        },
        process.env.ENV_TOKEN,
        { expiresIn: 86400 }
      )

      login.password = 'undefined'

      res.setHeader('authorization', accessToken) // ver o que fazer dps
      const body = {
        message: `${login.email} has been authenticated`,
        accessToken,
        user: user,
        id: user.public_id,
        ip: ip
      }

      await this.cacheService.setCache(cacheKey, body, 30)
      return body
    } else {
      throw new Error('Error User/Password')
    }
  }
}

export { AuthRepository }
