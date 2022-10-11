import { Request, Response } from 'express'
import { MyUserUseCase } from './MyUserUseCase'

class MyUserController {
  constructor (
    private myUserUseCase: MyUserUseCase
  ) {}

  async handle (req: Request<{}, {}, {}>, res: Response): Promise<Response> {
    const public_id = req.userId
    try {
      if (!public_id) {
        return res.status(400).json({
          message: 'Public_id cannot be null'
        })
      }
      const data = await this.myUserUseCase.execute({
        public_id
      })
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export { MyUserController }
