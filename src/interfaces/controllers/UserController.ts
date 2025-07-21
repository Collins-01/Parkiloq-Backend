import { Request, Response } from 'express';
import { SupabaseUserRepository } from '../../infrastructure/repositories/SupabaseUserRepository';
import { UpdateUserProfile } from '../../domain/usecases/UpdateUserProfile';

const userRepo = new SupabaseUserRepository();
const updateUserProfileUC = new UpdateUserProfile(userRepo);

export class UserController {
  static async getProfile(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) return res.status(401).json({ error: 'No token provided' });
      const profile = await userRepo.getProfile(token);
      if (!profile) return res.status(404).json({ error: 'User not found' });
      res.json(profile);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) return res.status(401).json({ error: 'No token provided' });
      const updates = req.body;
      const updated = await updateUserProfileUC.execute(token, updates);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
