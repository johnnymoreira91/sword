import { Request, Response } from 'express'
import { CreateTableUseCase } from './CreateTablesUseCase'

class CreateTablesController {
  constructor (
    private createTableUseCase: CreateTableUseCase
  ) {}

  async handle (req: Request<{}, {}, {password: string}>, res: Response): Promise<Response> {
    const { password } = req.body
    try {
      if (!password) {
        return res.status(400).json({
          error: 'Password is missing'
        })
      }
      if (password !== process.env.TABLE_PASSWORD) {
        return res.status(400).json({
          error: 'Password is wrong'
        })
      }

      const data = await this.createTableUseCase.execute()
      if (data) {
        return res.status(200).json({ message: 'Table created' })
      }

    //   return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}

export { CreateTablesController }
