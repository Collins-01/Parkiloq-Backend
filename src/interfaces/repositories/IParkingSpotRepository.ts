import { ParkingSpot } from '../../domain/entities/ParkingSpot';

export interface IParkingSpotRepository {
  getAllSpots(): Promise<ParkingSpot[]>;
  countSpots(): Promise<number>;
  deactivateSpot(id: string): Promise<void>;
  countActiveHosts(): Promise<number>;
  createSpot(spot: Omit<ParkingSpot, 'id' | 'isAvailable' | 'createdAt'>): Promise<ParkingSpot>;
  getAvailableSpots(): Promise<ParkingSpot[]>;
}
