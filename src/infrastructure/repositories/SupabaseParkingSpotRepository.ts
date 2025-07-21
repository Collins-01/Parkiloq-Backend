import { IParkingSpotRepository } from '../../interfaces/repositories/IParkingSpotRepository';
import { ParkingSpot } from '../../domain/entities/ParkingSpot';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export class SupabaseParkingSpotRepository implements IParkingSpotRepository {
  async getAllSpots(): Promise<ParkingSpot[]> {
    const { data, error } = await supabase
      .from('parkingspots')
      .select('*');
    if (error) throw new Error(error.message);
    return (data as ParkingSpot[]) || [];
  }

  async countSpots(): Promise<number> {
    const { count, error } = await supabase
      .from('parkingspots')
      .select('id', { count: 'exact', head: true });
    if (error) throw new Error(error.message);
    return count || 0;
  }

  async deactivateSpot(id: string): Promise<void> {
    const { error } = await supabase
      .from('parkingspots')
      .update({ is_active: false })
      .eq('id', id);
    if (error) throw new Error(error.message);
  }

  async countActiveHosts(): Promise<number> {
    const { data, error } = await supabase
      .from('parkingspots')
      .select('ownerId', { count: 'exact' })
      .eq('is_active', true)
      .neq('ownerId', null);
    if (error) throw new Error(error.message);
    // Unique count of ownerId
    const uniqueOwners = new Set((data || []).map((s: any) => s.ownerId));
    return uniqueOwners.size;
  }
  async createSpot(spot: Omit<ParkingSpot, 'id' | 'isAvailable' | 'createdAt'>): Promise<ParkingSpot> {
    const newSpot = {
      ...spot,
      id: uuidv4(),
      isAvailable: true,
      createdAt: new Date().toISOString(),
    };
    const { error } = await supabase.from('parking_spots').insert([newSpot]);
    if (error) throw new Error(error.message);
    return newSpot;
  }

  async getAvailableSpots(): Promise<ParkingSpot[]> {
    const { data, error } = await supabase
      .from('parking_spots')
      .select('*')
      .eq('isAvailable', true);
    if (error) throw new Error(error.message);
    return (data as ParkingSpot[]) || [];
  }
}
