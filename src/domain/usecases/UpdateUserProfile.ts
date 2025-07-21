import { IUserRepository } from '../../interfaces/repositories/IUserRepository';
import { User } from '../entities/User';

export class UpdateUserProfile {
  constructor(private userRepo: IUserRepository) {}

  async execute(token: string, updates: Partial<Omit<User, 'id' | 'email'>>): Promise<User> {
    return this.userRepo.updateProfile(token, updates);
  }
}
