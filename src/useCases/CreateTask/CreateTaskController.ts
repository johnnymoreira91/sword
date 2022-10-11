import { Request, Response } from 'express'
import { CreateTaskUseCase } from './CreateTaskUseCase'

class CreateTaskController {
  constructor (
    private createTaskUseCase: CreateTaskUseCase
  ) {}

  async handle (req: Request<{}, {}, {
    summary: string, active: boolean
  }>, res: Response): Promise<Response> {
    const { summary, active } = req.body
    const public_id = req.userId
    try {
      if (!public_id || !summary) {
        return res.status(400).json({
          error: 'Params is missing'
        })
      }
      const data = await this.createTaskUseCase.execute({
        public_id,
        summary,
        active: active || true
      })

      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export { CreateTaskController }
