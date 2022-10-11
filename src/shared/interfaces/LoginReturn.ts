import { User } from '@entities/User'

export interface LoginReturn {
  message: string
  accessToken: string
  user: User
  id: string
  ip: string
}
