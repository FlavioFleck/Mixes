import express from 'express';
import UserController from '../controllers/UserController.js';
import { connection } from '../connection.js';

const router = express.Router();
const userController = new UserController(connection);

router.post('/register/user', userController.createUser);

export default router;