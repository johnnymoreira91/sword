import { ITablesRepository } from '@repositories/ITableRepository'

class CreateTableUseCase {
  constructor (
    private tableRepository: ITablesRepository
  ) {}

  async execute (): Promise<boolean> {
    const createTables = await this.tableRepository.createTables()

    if (!createTables) return false

    return createTables
  }
}

export { CreateTableUseCase }
