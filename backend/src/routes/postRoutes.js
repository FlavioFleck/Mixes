import express from 'express'
import { connection } from '../connection.js'
import PostController from '../controllers/PostController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const postController = new PostController(connection)


router.post("/create", authMiddleware, postController.createPost)
router.delete("/delete/:id", postController.delete)
router.get("/getAll", authMiddleware ,postController.getAllPosts)
router.get("/getByUserId/:user_id", authMiddleware, postController.getPostByUserId)

export default router
