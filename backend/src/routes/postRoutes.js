import express from 'express'
import { connection } from '../connection.js'
import PostController from '../controllers/PostController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const postController = new PostController(connection)


router.post("/create", authMiddleware, postController.createPost)
router.delete("/delete/:id", postController.delete)
router.get("/getAll", authMiddleware ,postController.getAllPosts)
router.get("/getByUsername/:username", authMiddleware, postController.getPostByUsername)

export default router
