import { Request, Response } from 'express'
import { DeleteTaskUseCase } from './DeleteTaskUseCase'

class DeleteTaskController {
  constructor (
    private deleteTaskUseCase: DeleteTaskUseCase
  ) { }

  async handle (req: Request<{ task_public_id: string }, {}, {
  }>, res: Response): Promise<Response> {
    const { task_public_id } = req.params
    const permission = req.permission
    const user_id = req.userId
    try {
      if (!task_public_id) {
        return res.status(400).json({
          message: 'task_public_id cannot be null'
        })
      }

      await this.deleteTaskUseCase.execute({
        task_public_id,
        permission,
        user_id
      })

      return res.status(201).send()
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export { DeleteTaskController }
