import { Request, Response } from 'express'
import { EditTaskUseCase } from './EditTaskUseCase'

class EditTaskController {
  constructor (
    private editTaskUseCase: EditTaskUseCase
  ) { }

  async handle (req: Request<{ public_id: string }, {}, {
    summary: string, active: boolean
  }>, res: Response): Promise<Response> {
    const { public_id } = req.params
    const user_id = req.userId
    const { summary, active } = req.body
    try {
      if (!public_id) {
        return res.status(400).json({
          message: 'Public_id cannot be null'
        })
      }
      const data = await this.editTaskUseCase.execute({
        active: active || true,
        user_id,
        public_id,
        summary
      })
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export { EditTaskController }
