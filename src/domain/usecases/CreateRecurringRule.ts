import { IRecurringRuleRepository } from '../../interfaces/repositories/IRecurringRuleRepository';
import { RecurringAvailabilityRule } from '../entities/RecurringAvailabilityRule';

export class CreateRecurringRule {
  constructor(private recurringRuleRepo: IRecurringRuleRepository) {}

  async execute(rule: Omit<RecurringAvailabilityRule, 'id' | 'created_at'>): Promise<RecurringAvailabilityRule> {
    return this.recurringRuleRepo.createRule(rule);
  }
}
