import { Router } from 'express';
import { PaymentController } from '../interfaces/controllers/PaymentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/earnings', authMiddleware, PaymentController.getHostEarnings);
// Optionally add POST /request for payout requests

export default router;
