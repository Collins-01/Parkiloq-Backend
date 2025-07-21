import { Router } from 'express';
import { PaymentController } from '../interfaces/controllers/PaymentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Stripe
router.post('/stripe/checkout', authMiddleware, PaymentController.createStripeCheckout);
router.post('/stripe/webhook', PaymentController.handleStripeWebhook);

// Crypto (disabled for MVP)
// router.post('/crypto/checkout', authMiddleware, PaymentController.createCryptoCheckout);
// router.post('/crypto/webhook', PaymentController.handleCryptoWebhook);

export default router;
