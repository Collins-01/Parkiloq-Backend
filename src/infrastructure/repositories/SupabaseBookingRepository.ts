import { IBookingRepository } from '../../interfaces/repositories/IBookingRepository';
import { Booking } from '../../domain/entities/Booking';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export class SupabaseBookingRepository implements IBookingRepository {
  async getAllBookings(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*');
    if (error) throw new Error(error.message);
    return (data as Booking[]) || [];
  }

  async countBookings(): Promise<number> {
    const { count, error } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true });
    if (error) throw new Error(error.message);
    return count || 0;
  }
  async createBooking(booking: Omit<Booking, 'id' | 'status' | 'createdAt'>): Promise<Booking> {
    const newBooking = {
      ...booking,
      id: uuidv4(),
      status: 'active' as const,
      createdAt: new Date().toISOString(),
    };
    const { error } = await supabase.from('bookings').insert([newBooking]);
    if (error) throw new Error(error.message);
    return newBooking;
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('userId', userId);
    if (error) throw new Error(error.message);
    return (data as Booking[]) || [];
  }

  async cancelBooking(bookingId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId)
      .eq('userId', userId);
    if (error) throw new Error(error.message);
  }
}
