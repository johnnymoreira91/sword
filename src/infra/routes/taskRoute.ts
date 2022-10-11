import authMiddleware from '@infra/middlewares/authmiddleware'
import { createTaskController } from '@useCases/CreateTask'
import { editTaskController } from '@useCases/EditTask'
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

router.put('/:public_id', (req, res) => {
  return editTaskController.handle(req, res)
})

export default router
