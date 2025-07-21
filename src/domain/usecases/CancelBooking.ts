import { IBookingRepository } from '../../interfaces/repositories/IBookingRepository';

export class CancelBooking {
  constructor(private bookingRepo: IBookingRepository) {}

  async execute(bookingId: string, userId: string): Promise<void> {
    return this.bookingRepo.cancelBooking(bookingId, userId);
  }
}
