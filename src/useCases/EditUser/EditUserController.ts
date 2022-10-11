import { Request, Response } from 'express'
import { EditUserUseCase } from './EditUserUseCase'

class EditUserController {
  constructor (
    private editUserUseCase: EditUserUseCase
  ) {}

  async handle (req: Request<{id: number}, {}, {
    name: string, email: string, password: string, age: number, active: boolean,
    permission: number
  }>, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, email, password, age, active, permission } = req.body
    try {
      if (!id) {
        return res.status(400).json({
          message: 'Id cannot be null'
        })
      }
      const data = await this.editUserUseCase.execute({
        id: id,
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
