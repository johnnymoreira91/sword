import authMiddleware from '@infra/middlewares/authmiddleware'
import { createUserController } from '@useCases/CreateUser'
import { deleteUserController } from '@useCases/DeleteUser'
import { editUserController } from '@useCases/EditUser'
import { listUserController } from '@useCases/ListUser'
import { myUserController } from '@useCases/MyUser'
import { Router } from 'express'

const router = Router()

router.get('/', authMiddleware, (req, res) => {
  return listUserController.handle(req, res)
})

router.get('/my', authMiddleware, (req, res) => {
  return myUserController.handle(req, res)
})

router.post('/', (req, res) => {
  return createUserController.handle(req, res)
})

router.put('/:public_id', authMiddleware, (req, res) => {
  return editUserController.handle(req, res)
})

router.delete('/:public_id', authMiddleware, (req, res) => {
  return deleteUserController.handle(req, res)
})

export default router
