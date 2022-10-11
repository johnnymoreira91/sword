import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface tokenPayLod {
    login: string,
    permission: number,
    iat: number,
    exp: number
}

export default function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authorization.replace('Bearer', '').trim()

  try {
    const data = jwt.verify(token, process.env.ENV_TOKEN)
    const { login, permission } = data as tokenPayLod

    req.userId = login
    req.permission = permission

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token error' })
  }
}
