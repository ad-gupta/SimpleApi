import express from 'express'
import { getAllUsers, getMyProfile, login, logout, register } from '../controllers/userControllers.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get('/all', getAllUsers);

router.post('/register', register)

router.post('/login', login)

router.get('/me',isAuthenticated , getMyProfile);

router.get('/logout', isAuthenticated, logout)

export default router;