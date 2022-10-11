import authMiddleware from '@infra/middlewares/authmiddleware'
import { createTaskController } from '@useCases/CreateTask'
import { listTaskController } from '@useCases/listTask'

import { Router } from 'express'

const router = Router()

router.use(authMiddleware)

router.get('/', (req, res) => {
  return listTaskController.handle(req, res)
})

router.post('/', (req, res) => {
  return createTaskController.handle(req, res)
})

export default router
