import express from 'express'
import { connection } from '../connection.js'
import PostController from '../controllers/PostController.js'

const router = express.Router()
const postController = new PostController(connection)


router.post("/create", postController.createPost)
router.get("/getAll", postController.getAllPosts)
router.get("/getByUserId/:user_id", postController.getPostByUserId)

export default router
