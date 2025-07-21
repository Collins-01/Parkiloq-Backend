import { IRecurringRuleRepository } from '../../interfaces/repositories/IRecurringRuleRepository';
import { RecurringAvailabilityRule } from '../../domain/entities/RecurringAvailabilityRule';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export class SupabaseRecurringRuleRepository implements IRecurringRuleRepository {
  async createRule(rule: Omit<RecurringAvailabilityRule, 'id' | 'created_at'>): Promise<RecurringAvailabilityRule> {
    const newRule = {
      ...rule,
      id: uuidv4(),
      created_at: new Date().toISOString(),
    };
    const { data, error } = await supabase.from('recurring_availability_rules').insert([newRule]).select().single();
    if (error || !data) throw new Error(error?.message || 'Failed to add recurring rule');
    return data as RecurringAvailabilityRule;
  }

  async getRulesBySpot(spotId: string): Promise<RecurringAvailabilityRule[]> {
    const { data, error } = await supabase
      .from('recurring_availability_rules')
      .select('*')
      .eq('spot_id', spotId)
      .order('day_of_week', { ascending: true })
      .order('start_time', { ascending: true });
    if (error) throw new Error(error.message);
    return (data as RecurringAvailabilityRule[]) || [];
  }
}
