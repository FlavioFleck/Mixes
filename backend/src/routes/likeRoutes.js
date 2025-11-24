import express from 'express'
import { connection } from '../connection.js'
import LikeController from '../controllers/LikeController.js'

const router = express.Router()
const likeController = new LikeController(connection)


router.post("/create", likeController.createLike)
router.delete("/delete/:like", likeController.deleteLike)

export default router
