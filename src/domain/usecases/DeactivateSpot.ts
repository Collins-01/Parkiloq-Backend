import { IParkingSpotRepository } from '../../interfaces/repositories/IParkingSpotRepository';

export class DeactivateSpot {
  constructor(private spotRepo: IParkingSpotRepository) {}

  async execute(spotId: string, deactivate: boolean): Promise<void> {
    return this.spotRepo.deactivateSpot(spotId, deactivate);
  }
}
