import express from 'express'
import { connection } from '../connection.js'
import AuthController from '../controllers/AuthController.js'

const router = express.Router()
const authController = new AuthController(connection)

//Criação do usuário
router.post("/register", authController.register)

//Login do usuário
router.post("/login", authController.login)
export default router
