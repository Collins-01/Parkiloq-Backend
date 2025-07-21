import { IAvailabilityRepository } from '../../interfaces/repositories/IAvailabilityRepository';
import { SupabaseRecurringRuleRepository } from '../../infrastructure/repositories/SupabaseRecurringRuleRepository';
import { GenerateAvailabilityFromRecurringRule } from './GenerateAvailabilityFromRecurringRule';

export class IsSpotAvailable {
  private recurringRuleRepo = new SupabaseRecurringRuleRepository();

  constructor(private availabilityRepo: IAvailabilityRepository) {}

  async execute(spotId: string, from: string, to: string): Promise<boolean> {
    // 1. Check explicit availability
    const explicitAvailable = await this.availabilityRepo.isSpotAvailable(spotId, from, to);
    if (explicitAvailable) return true;

    // 2. Check recurring rules
    const rules = await this.recurringRuleRepo.getRulesBySpot(spotId);
    if (!rules.length) return false;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const slots = GenerateAvailabilityFromRecurringRule.generateSlots(rules, fromDate, toDate);
    // The booking must be fully contained within a single slot
    for (const slot of slots) {
      if (
        new Date(from) >= slot.start &&
        new Date(to) <= slot.end
      ) {
        return true;
      }
    }
    return false;
  }
}
