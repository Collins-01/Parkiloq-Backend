import { Router } from 'express';
import { AuthController } from '../interfaces/controllers/AuthController';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', AuthController.getCurrentUser);
router.post('/logout', AuthController.logout);
router.get('/profile', AuthController.getProfile);
router.put('/profile', AuthController.updateProfile);

export default router;
