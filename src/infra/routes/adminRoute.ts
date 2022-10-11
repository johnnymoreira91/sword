import { createTablesController } from '@useCases/CreateTables'
import { Router } from 'express'

const router = Router()

router.post('/create/tables', (req, res) => {
  return createTablesController.handle(req, res)
})

export default router
