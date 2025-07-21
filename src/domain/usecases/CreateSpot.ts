import { IParkingSpotRepository } from '../../interfaces/repositories/IParkingSpotRepository';
import { ParkingSpot } from '../entities/ParkingSpot';

export class CreateSpot {
  constructor(private spotRepo: IParkingSpotRepository) {}

  async execute(data: Omit<ParkingSpot, 'id' | 'isAvailable' | 'createdAt'>): Promise<ParkingSpot> {
    return this.spotRepo.createSpot(data);
  }
}
