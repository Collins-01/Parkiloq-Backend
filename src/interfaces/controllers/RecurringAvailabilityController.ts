import { Request, Response } from 'express';
import { SupabaseRecurringRuleRepository } from '../../infrastructure/repositories/SupabaseRecurringRuleRepository';
import { CreateRecurringRule } from '../../domain/usecases/CreateRecurringRule';
import { GetRecurringRulesBySpot } from '../../domain/usecases/GetRecurringRulesBySpot';

const recurringRuleRepo = new SupabaseRecurringRuleRepository();
const createRecurringRuleUC = new CreateRecurringRule(recurringRuleRepo);
const getRecurringRulesBySpotUC = new GetRecurringRulesBySpot(recurringRuleRepo);

export class RecurringAvailabilityController {
  static async createRule(req: Request, res: Response) {
    try {
      const spotId = req.params.id;
      const userId = req.user?.id;
      // Fetch spot to ensure user is owner
      const { data: spot, error: spotError } = await require('../../infrastructure/supabaseClient').supabase
        .from('parkingspots')
        .select('*')
        .eq('id', spotId)
        .single();
      if (spotError || !spot) return res.status(404).json({ error: 'Parking spot not found' });
      if (spot.ownerId !== userId) return res.status(403).json({ error: 'Only the spot owner can add recurring rules' });
      const { day_of_week, start_time, end_time } = req.body;
      if (typeof day_of_week !== 'number' || !start_time || !end_time)
        return res.status(400).json({ error: 'Missing or invalid fields' });
      const rule = await createRecurringRuleUC.execute({
        spot_id: spotId,
        day_of_week,
        start_time,
        end_time,
      });
      res.status(201).json(rule);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getRulesBySpot(req: Request, res: Response) {
    try {
      const spotId = req.params.id;
      const rules = await getRecurringRulesBySpotUC.execute(spotId);
      res.json(rules);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
