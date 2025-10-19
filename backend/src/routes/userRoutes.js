import express from 'express'
import { connection } from '../connection.js';
import UserController from '../controllers/UserController.js';

const router = express.Router()
const userController = new UserController(connection);

router.post('/create', userController.createUser);

export default router