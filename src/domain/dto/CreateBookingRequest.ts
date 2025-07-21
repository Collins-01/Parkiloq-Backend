import { Booking } from '../entities/Booking';

export interface CreateBookingRequest extends Omit<Booking, 'id' | 'status' | 'createdAt'> {
  userEmail: string;
  userName: string;
  hostEmail: string;
  hostName: string;
  spotName: string;
}
