import { Request, Response } from 'express';
import { SupabaseBookingRepository } from '../../infrastructure/repositories/SupabaseBookingRepository';
import { SupabaseUserRepository } from '../../infrastructure/repositories/SupabaseUserRepository';
import { SupabaseParkingSpotRepository } from '../../infrastructure/repositories/SupabaseParkingSpotRepository';
import { CreateBooking } from '../../domain/usecases/CreateBooking';
import { CancelBooking } from '../../domain/usecases/CancelBooking';
import { EmailService } from '../../infrastructure/services/EmailService';
import { EmailNotificationService } from '../../interfaces/services/EmailNotificationService';

const bookingRepo = new SupabaseBookingRepository();
const userRepo = new SupabaseUserRepository();
const spotRepo = new SupabaseParkingSpotRepository();
const emailService = new EmailService();
const notificationService = new EmailNotificationService(emailService);
const createBookingUC = new CreateBooking(bookingRepo, notificationService);
const cancelBookingUC = new CancelBooking(bookingRepo);

export class BookingController {
  static async createBooking(req: Request, res: Response) {
    try {
      const { userId, spotId, startTime, endTime } = req.body;
      // Fetch user, spot, and host info for notification fields
      const user = await userRepo.getProfile(userId);
      if (!user) throw new Error('User not found');
      const spot = (await spotRepo.getAllSpots()).find(s => s.id === spotId);
      if (!spot) throw new Error('Spot not found');
      const host = await userRepo.getProfile(spot.ownerId);
      if (!host) throw new Error('Host not found');
      const bookingRequest = {
        userId,
        spotId,
        startTime,
        endTime,
        userEmail: user.email,
        userName: user.name || '',
        hostEmail: host.email,
        hostName: host.name || '',
        spotName: spot.location // or spot.name if available
      };
      const booking = await createBookingUC.execute(bookingRequest);
      res.status(201).json(booking);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getBookings(req: Request, res: Response) {
    try {
      const userId = req.query.userId as string;
      const bookings = await bookingRepo.getBookingsByUser(userId);
      res.json(bookings);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async cancelBooking(req: Request, res: Response) {
    try {
      const bookingId = req.params.id;
      const userId = req.body.userId; // In production, get from auth
      await cancelBookingUC.execute(bookingId, userId);
      res.json({ success: true });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
