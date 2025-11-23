import express from 'express'
import { connection } from '../connection.js';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router()
const userController = new UserController(connection);

// router.get('/search', userController.getAllUsers);
router.get('/search/:id', userController.getUserById);
router.delete('/delete/:id', userController.deleteUser);
router.put('/update', authMiddleware, userController.updateUser);


export default router