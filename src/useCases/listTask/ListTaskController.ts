import { Request, Response } from 'express'
import { ListTaskUseCase } from './ListTaskUseCase'

class ListTaskController {
  constructor (
    private listTaskUseCase: ListTaskUseCase
  ) {}

  async handle (req: Request<{}, {}, {}>, res: Response): Promise<Response> {
    const user_id = req.userId
    const permission = req.permission
    try {
      const data = await this.listTaskUseCase.execute({
        permission,
        user_id
      })

      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export { ListTaskController }
