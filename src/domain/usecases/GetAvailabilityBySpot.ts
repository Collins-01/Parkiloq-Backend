import { IAvailabilityRepository } from '../../interfaces/repositories/IAvailabilityRepository';
import { Availability } from '../entities/Availability';

export class GetAvailabilityBySpot {
  constructor(private availabilityRepo: IAvailabilityRepository) {}

  async execute(spotId: string): Promise<Availability[]> {
    return this.availabilityRepo.getAvailabilityBySpot(spotId);
  }
}
