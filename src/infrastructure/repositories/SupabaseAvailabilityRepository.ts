import { IAvailabilityRepository } from '../../interfaces/repositories/IAvailabilityRepository';
import { Availability } from '../../domain/entities/Availability';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export class SupabaseAvailabilityRepository implements IAvailabilityRepository {
  async addAvailability(availability: Omit<Availability, 'id' | 'created_at'>): Promise<Availability> {
    const newAvailability = {
      ...availability,
      id: uuidv4(),
      created_at: new Date().toISOString(),
    };
    const { data, error } = await supabase.from('availability').insert([newAvailability]).select().single();
    if (error || !data) throw new Error(error?.message || 'Failed to add availability');
    return data as Availability;
  }

  async getAvailabilityBySpot(spotId: string): Promise<Availability[]> {
    const { data, error } = await supabase
      .from('availability')
      .select('*')
      .eq('spot_id', spotId)
      .order('available_from', { ascending: true });
    if (error) throw new Error(error.message);
    return (data as Availability[]) || [];
  }

  async isSpotAvailable(spotId: string, from: string, to: string): Promise<boolean> {
    // Check if there is any availability window that fully covers the requested range
    const { data, error } = await supabase
      .from('availability')
      .select('*')
      .eq('spot_id', spotId)
      .lte('available_from', from)
      .gte('available_to', to);
    if (error) throw new Error(error.message);
    return !!(data && data.length > 0);
  }
}
