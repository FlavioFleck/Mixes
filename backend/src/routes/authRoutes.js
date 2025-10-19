import express from 'express'
import { connection } from '../connection.js'
import AuthController from '../controllers/AuthController.js'

const router = express.Router()
const authController = new AuthController(connection)

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/logout", authController.logout)


export default router
