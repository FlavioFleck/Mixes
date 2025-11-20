import express from 'express'
import { connection } from '../connection.js'
import ProfileController from "../controllers/ProfileController.js"
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const profileController = new ProfileController(connection)

router.post("/profile/create", authMiddleware, profileController.createProfile);
router.post("/delete", profileController.deleteProfile)
router.get("/get", profileController.viewProfile)
router.get("get/:id", profileController.viewProfiles)

export default router
