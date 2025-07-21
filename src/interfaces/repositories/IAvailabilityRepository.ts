import { Availability } from '../../domain/entities/Availability';

export interface IAvailabilityRepository {
  addAvailability(availability: Omit<Availability, 'id' | 'created_at'>): Promise<Availability>;
  getAvailabilityBySpot(spotId: string): Promise<Availability[]>;
  isSpotAvailable(spotId: string, from: string, to: string): Promise<boolean>;
}
