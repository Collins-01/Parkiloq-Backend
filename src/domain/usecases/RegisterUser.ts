import { IUserRepository } from '../../interfaces/repositories/IUserRepository';
import { User } from '../entities/User';

export class RegisterUser {
  constructor(private userRepo: IUserRepository) {}

  async execute(email: string, password: string): Promise<User> {
    return this.userRepo.register(email, password);
  }
}
