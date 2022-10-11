import { Response } from 'express'

class ILoginRequestDTO {
  email: string
  password: string
  ip: string
  cacheKey: string
  res: Response
}

export { ILoginRequestDTO }
