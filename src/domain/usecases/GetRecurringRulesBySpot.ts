import { IRecurringRuleRepository } from '../../interfaces/repositories/IRecurringRuleRepository';
import { RecurringAvailabilityRule } from '../entities/RecurringAvailabilityRule';

export class GetRecurringRulesBySpot {
  constructor(private recurringRuleRepo: IRecurringRuleRepository) {}

  async execute(spotId: string): Promise<RecurringAvailabilityRule[]> {
    return this.recurringRuleRepo.getRulesBySpot(spotId);
  }
}
