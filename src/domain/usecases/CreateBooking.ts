import { IBookingRepository } from '../../interfaces/repositories/IBookingRepository';
import { Booking } from '../entities/Booking';
import { SupabaseAvailabilityRepository } from '../../infrastructure/repositories/SupabaseAvailabilityRepository';
import { IsSpotAvailable } from './IsSpotAvailable';
import { CreateBookingRequest } from '../dto/CreateBookingRequest';
import { EmailNotificationService } from '../../interfaces/services/EmailNotificationService';

export class CreateBooking {
  private availabilityRepo = new SupabaseAvailabilityRepository();
  private isSpotAvailableUC = new IsSpotAvailable(this.availabilityRepo);

  constructor(
    private bookingRepo: IBookingRepository,
    private notificationService: EmailNotificationService
  ) {}



  async execute(data: CreateBookingRequest): Promise<Booking> {
    // Use UTC ISO strings for all comparisons
    const spotId = data.spotId;
    const startTime = new Date(data.startTime).toISOString();
    const endTime = new Date(data.endTime).toISOString();
    const isAvailable = await this.isSpotAvailableUC.execute(spotId, startTime, endTime);
    if (!isAvailable) {
      throw new Error('This spot is not available during the selected time.');
    }
    // Prevent overlapping bookings for the same spot
    if (await this.hasOverlappingBooking(spotId, startTime, endTime)) {
      throw new Error('This spot is already booked during the selected time.');
    }
    const booking = await this.bookingRepo.createBooking(data);
// Send notifications (driver and host)
try {
  // You would need to fetch user and spot info here for real emails
  await this.notificationService.sendBookingConfirmation(
    data.userEmail,
    data.userName || '',
    data.spotName || '',
    startTime,
    endTime
  );
  await this.notificationService.sendHostBookingAlert(
    data.hostEmail,
    data.hostName || '',
    data.spotName || '',
    startTime,
    endTime
  );
} catch (e) {
  console.error('Booking email notification failed:', e);
}
return booking;
  }

  private async hasOverlappingBooking(spotId: string, start: string, end: string): Promise<boolean> {
    // Query bookings for this spot that overlap the requested time
    // This method assumes bookingRepo has a method getBookingsBySpot
    if (!('getBookingsBySpot' in this.bookingRepo)) return false;
    const bookings = await (this.bookingRepo as any).getBookingsBySpot(spotId);
    return bookings.some((b: Booking) =>
      (new Date(b.startTime).toISOString() < end) && (new Date(b.endTime).toISOString() > start)
    );
  }
}
