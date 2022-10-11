import { createSchema } from '@infra/database/createTables'
import { ITablesRepository } from '@repositories/ITableRepository'

class TablesRepository implements ITablesRepository {
  async createTables (): Promise<boolean> {
    const schemas = await createSchema()
    return schemas
  }
}

export { TablesRepository }
