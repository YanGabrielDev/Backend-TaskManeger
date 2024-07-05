import { Router } from 'express'
import { UserController } from '../controllers/userController'

const router = Router()

const userController = new UserController()

router.post('/', userController.createUser)
router.get('/', userController.getUser)
router.post('/login', userController.signIn)
router.get('/logout', userController.logoutUser)

export default router
