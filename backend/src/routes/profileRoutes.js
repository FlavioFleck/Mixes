import express from 'express'
import { connection } from '../connection.js'
import ProfileController from "../controllers/ProfileController.js"

const router = express.Router()
const profileController = new ProfileController(connection)

router.post("/create", profileController.createProfile)
router.post("/delete", profileController.deleteProfile)

export default router
