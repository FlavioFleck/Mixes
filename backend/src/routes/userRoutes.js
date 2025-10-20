import express from 'express'
import { connection } from '../connection.js';
import UserController from '../controllers/UserController.js';

const router = express.Router()
const userController = new UserController(connection);

router.post('/create', userController.createUser);
router.get('/search', userController.getAllUsers);
router.get('/search/:id', userController.getUserById);
router.delete('/delete/:id', userController.deleteUser);
router.put('/update/:id', userController.updateUser);


export default router