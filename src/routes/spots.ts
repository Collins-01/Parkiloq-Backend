import { Router } from 'express';
import { ParkingSpotController } from '../interfaces/controllers/ParkingSpotController';

const router = Router();

router.post('/', ParkingSpotController.createSpot);
router.get('/', ParkingSpotController.getAvailableSpots);

export default router;
