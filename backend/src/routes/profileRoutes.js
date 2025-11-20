import express from 'express'
import multer from "multer";
import { connection } from '../connection.js'
import ProfileController from "../controllers/ProfileController.js"
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()
const profileController = new ProfileController(connection)

const storage = multer.diskStorage({
    destination: "uploads/profile/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/profile/create", authMiddleware, upload.single("profileImage"), profileController.createProfile);
router.post("/delete", profileController.deleteProfile)
router.get("/get", profileController.viewProfile)
router.get("get/:id", profileController.viewProfiles)

export default router
