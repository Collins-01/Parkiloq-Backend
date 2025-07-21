import { IAvailabilityRepository } from '../../interfaces/repositories/IAvailabilityRepository';
import { Availability } from '../entities/Availability';

export class AddAvailability {
  constructor(private availabilityRepo: IAvailabilityRepository) {}

  async execute(availability: Omit<Availability, 'id' | 'created_at'>): Promise<Availability> {
    return this.availabilityRepo.addAvailability(availability);
  }
}

