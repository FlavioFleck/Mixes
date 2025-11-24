import express from 'express'
import { connection } from '../connection.js';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router()
const userController = new UserController(connection);


router.put('/update', authMiddleware, userController.updateUser);


export default router