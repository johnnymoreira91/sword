import { TablesRepository } from '@repositories/implementations/TablesRepository'
import { CreateTablesController } from './CreateTableController'
import { CreateTableUseCase } from './CreateTablesUseCase'

const tablesRepository = new TablesRepository()

const createTablesUseCase = new CreateTableUseCase(
  tablesRepository
)

const createTablesController = new CreateTablesController(
  createTablesUseCase
)

export {
  createTablesController,
  createTablesUseCase
}
