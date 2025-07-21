import express from 'express';
import { RecurringAvailabilityController } from '../interfaces/controllers/RecurringAvailabilityController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Only spot owner can create recurring rule
router.post('/api/spots/:id/recurring', authMiddleware, RecurringAvailabilityController.createRule);
// Public: get all recurring rules for a spot
router.get('/api/spots/:id/recurring', RecurringAvailabilityController.getRulesBySpot);

export default router;
