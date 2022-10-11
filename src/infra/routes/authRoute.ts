import { loginController } from '@useCases/Login'
import { Router } from 'express'

const router = Router()

router.post('/login', (req, res) => {
  return loginController.handle(req, res)
})

export default router
