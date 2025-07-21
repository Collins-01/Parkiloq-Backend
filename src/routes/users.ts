import { Router } from 'express';
import { UserController } from '../interfaces/controllers/UserController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/profile', authMiddleware, UserController.getProfile);
router.put('/profile', authMiddleware, UserController.updateProfile);

export default router;
