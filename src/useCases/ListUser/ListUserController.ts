import { Request, Response } from 'express'
import { ListUserUseCase } from './ListUserUseCase'

class ListUserController {
  constructor (
    private listUserUseCase: ListUserUseCase
  ) {}

  async handle (req: Request<{}, {}, {}>, res: Response): Promise<Response> {
    const permission = req.permission
    try {
      if (permission < 2) {
        return res.status(403).json({ message: 'Permission Denied' })
      }
      const data = await this.listUserUseCase.execute()

      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export { ListUserController }
