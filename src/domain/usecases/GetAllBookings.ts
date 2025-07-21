import { IBookingRepository } from '../../interfaces/repositories/IBookingRepository';
import { Booking } from '../entities/Booking';

export class GetAllBookings {
  constructor(private bookingRepo: IBookingRepository) {}

  async execute(page = 1, pageSize = 50): Promise<Booking[]> {
    return this.bookingRepo.getAllBookings(page, pageSize);
  }
}
