import { Booking } from '../../domain/entities/Booking';

export interface IBookingRepository {
  getAllBookings(): Promise<Booking[]>;
  countBookings(): Promise<number>;
  createBooking(booking: Omit<Booking, 'id' | 'status' | 'createdAt'>): Promise<Booking>;
  getBookingsByUser(userId: string): Promise<Booking[]>;
  cancelBooking(bookingId: string, userId: string): Promise<void>;
}
