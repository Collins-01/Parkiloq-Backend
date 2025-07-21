import { Router } from 'express';
import { BookingController } from '../interfaces/controllers/BookingController';

const router = Router();

router.post('/', BookingController.createBooking);
router.get('/', BookingController.getBookings);
router.delete('/:id', BookingController.cancelBooking);

export default router;
