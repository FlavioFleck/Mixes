import express from 'express'
import multer from "multer";
import { connection } from '../connection.js'
import ProfileController from "../controllers/ProfileController.js"
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const upload = multer({ dest: "uploads/profile/" });
const profileController = new ProfileController(connection)

router.post("/profile/create", upload.single("profileImage"), authMiddleware, profileController.createProfile);
router.post("/delete", profileController.deleteProfile)
router.get("/get", profileController.viewProfile)
router.get("get/:id", profileController.viewProfiles)

export default router
