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

router.post("/create", authMiddleware, upload.single("profileImage"), profileController.createProfile);
router.delete("/delete", authMiddleware, profileController.deleteProfile)
// router.get("/get/:id", profileController.viewProfile)
router.get("/me", authMiddleware, profileController.viewMyProfile)

export default router
