import { Request, Response } from 'express';
import { SupabaseAvailabilityRepository } from '../../infrastructure/repositories/SupabaseAvailabilityRepository';
import { AddAvailability } from '../../domain/usecases/AddAvailability';
import { GetAvailabilityBySpot } from '../../domain/usecases/GetAvailabilityBySpot';

const availabilityRepo = new SupabaseAvailabilityRepository();
const addAvailabilityUC = new AddAvailability(availabilityRepo);
const getAvailabilityBySpotUC = new GetAvailabilityBySpot(availabilityRepo);

export class AvailabilityController {
  static async addAvailability(req: Request, res: Response) {
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
      if (spot.ownerId !== userId) return res.status(403).json({ error: 'Only the spot owner can add availability' });
      const { available_from, available_to, recurring } = req.body;
      if (!available_from || !available_to) return res.status(400).json({ error: 'Missing required fields' });
      const result = await addAvailabilityUC.execute({
        spot_id: spotId,
        available_from,
        available_to,
        recurring: recurring || null,
      });
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getAvailabilityBySpot(req: Request, res: Response) {
    try {
      const spotId = req.params.id;
      const result = await getAvailabilityBySpotUC.execute(spotId);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
