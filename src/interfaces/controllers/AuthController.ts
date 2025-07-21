import { Request, Response } from 'express';
import { SupabaseUserRepository } from '../../infrastructure/repositories/SupabaseUserRepository';

const userRepo = new SupabaseUserRepository();

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userRepo.register(email, password);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { user, token } = await userRepo.login(email, password);
      res.json({ user, token });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }

  static async getCurrentUser(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ error: 'No token provided' });
      const user = await userRepo.getUserByToken(token);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async logout(_req: Request, res: Response) {
    // JWT logout is stateless; client should discard token
    res.json({ message: 'Logged out (client-side token discard)' });
  }

  static async getProfile(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ error: 'No token provided' });
      const user = await userRepo.getProfile(token);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ error: 'No token provided' });
      const updates = req.body;
      const user = await userRepo.updateProfile(token, updates);
      res.json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
