import { Request, Response } from 'express'
import { EditUserUseCase } from './EditUserUseCase'

class EditUserController {
  constructor (
    private editUserUseCase: EditUserUseCase
  ) {}

  async handle (req: Request<{public_id: string}, {}, {
    name: string, email: string, password: string, age: number, active: boolean,
    permission: number
  }>, res: Response): Promise<Response> {
    const { public_id } = req.params
    const { name, email, password, age, active, permission } = req.body
    try {
      if (!public_id) {
        return res.status(400).json({
          message: 'Public_id cannot be null'
        })
      }
      const data = await this.editUserUseCase.execute({
        email: email,
        name: name,
        password: password,
        age,
        active,
        permission
      })
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export { EditUserController }
