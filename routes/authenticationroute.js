import express from 'express';
import { registerUser, loginUser, VerifyUser } from '../controllers/authenticationcontroller.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify', VerifyUser);

export default router;
