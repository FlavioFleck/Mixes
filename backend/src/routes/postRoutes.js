import express from 'express'
import { connection } from '../connection.js'
import PostController from '../controllers/PostController.js'

const router = express.Router()
const postController = new PostController(connection)

//Criação do usuário
router.post("/create", postController.createPost)

export default router
