import { IParkingSpotRepository } from '../../interfaces/repositories/IParkingSpotRepository';
import { ParkingSpot } from '../entities/ParkingSpot';

export class GetAllSpots {
  constructor(private spotRepo: IParkingSpotRepository) {}

  async execute(page = 1, pageSize = 50): Promise<ParkingSpot[]> {
    return this.spotRepo.getAllSpots(page, pageSize);
  }
}
