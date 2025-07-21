import { Request, Response } from 'express';
import { SupabaseParkingSpotRepository } from '../../infrastructure/repositories/SupabaseParkingSpotRepository';
import { CreateSpot } from '../../domain/usecases/CreateSpot';
import { GetAvailableSpots } from '../../domain/usecases/GetAvailableSpots';

const spotRepo = new SupabaseParkingSpotRepository();
const createSpotUC = new CreateSpot(spotRepo);
const getAvailableSpotsUC = new GetAvailableSpots(spotRepo);

export class ParkingSpotController {
  static async createSpot(req: Request, res: Response) {
    try {
      const ownerId = req.body.ownerId; // In production, get from auth
      const { location, description, pricePerHour } = req.body;
      const spot = await createSpotUC.execute({ ownerId, location, description, pricePerHour });
      res.status(201).json(spot);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getAvailableSpots(_req: Request, res: Response) {
    try {
      const spots = await getAvailableSpotsUC.execute();
      res.json(spots);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
