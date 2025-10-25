import express from 'express'
import { connection } from '../connection.js'
import AuthController from '../controllers/AuthController.js'

const router = express.Router()
const authController = new AuthController(connection)

//Criação do usuário
router.post("/register", authController.register)

//Criação do perfil
router.post("/profile", authController.profile)

//Login do usuário
router.post("/login", authController.login)

//Logout do usuário
router.post("/logout", authController.logout)


export default router
