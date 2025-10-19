import express from 'express';
import userRouter from './userRoutes'
import authRoutes from './authRoutes'
import profileRoutes from "./profileRoutes"

const router = express.Router();
router.use('/user', userRouter)
router.use('/auth', authRoutes)
router.use('/profile', profileRoutes)

export default router;