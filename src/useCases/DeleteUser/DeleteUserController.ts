import { Request, Response } from 'express'
import { DeleteUserUseCase } from './DeleteUserUseCase'

class DeleteUserController {
  constructor (
    private deleteUserUseCase: DeleteUserUseCase
  ) { }

  async handle (req: Request<{ public_id: string }, {}, {}>, res: Response): Promise<Response> {
    const { public_id } = req.params
    try {
      if (!public_id) {
        return res.status(400).json({
          message: 'public_id cannot be null'
        })
      }

      await this.deleteUserUseCase.execute({ public_id })

      return res.status(201).send()
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export { DeleteUserController }
