import { Router } from 'express';
import { AvailabilityController } from '../interfaces/controllers/AvailabilityController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Only spot owner can add availability
router.post('/spots/:id/availability', authMiddleware, AvailabilityController.addAvailability);
// Anyone can view availability
router.get('/spots/:id/availability', AvailabilityController.getAvailabilityBySpot);

export default router;
