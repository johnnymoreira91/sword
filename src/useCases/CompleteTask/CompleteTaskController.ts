import { Request, Response } from 'express'
import { CompleteTaskUseCase } from './CompleteTaskUseCase'

class CompleteTaskController {
  constructor (
    private completeTaskUseCase: CompleteTaskUseCase
  ) {}

  async handle (req: Request<{public_id: string}, {}, {}>, res: Response): Promise<Response> {
    const user_id = req.userId
    const { public_id } = req.params
    try {
      if (!public_id) {
        return res.status(400).json({
          error: 'Params is missing'
        })
      }
      const data = await this.completeTaskUseCase.execute({
        public_id,
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

export { CompleteTaskController }
