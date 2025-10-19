import express from 'express';
import userRouter from './userRoutes.js'
import authRoutes from './authRoutes.js'
import profileRoutes from "./profileRoutes.js"

const router = express.Router();
router.use('/user', userRouter)
router.use('/auth', authRoutes)
router.use('/profile', profileRoutes)

export default router;