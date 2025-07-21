import { IParkingSpotRepository } from '../../interfaces/repositories/IParkingSpotRepository';
import { ParkingSpot } from '../entities/ParkingSpot';

export class GetAvailableSpots {
  constructor(private spotRepo: IParkingSpotRepository) {}

  async execute(): Promise<ParkingSpot[]> {
    return this.spotRepo.getAvailableSpots();
  }
}
