import { RecurringAvailabilityRule } from '../../domain/entities/RecurringAvailabilityRule';

export interface IRecurringRuleRepository {
  createRule(rule: Omit<RecurringAvailabilityRule, 'id' | 'created_at'>): Promise<RecurringAvailabilityRule>;
  getRulesBySpot(spotId: string): Promise<RecurringAvailabilityRule[]>;
}
