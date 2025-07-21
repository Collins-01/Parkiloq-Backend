import { IUserRepository } from '../../interfaces/repositories/IUserRepository';
import { User } from '../entities/User';

export class GetAllUsers {
  constructor(private userRepo: IUserRepository) {}

  async execute(page = 1, pageSize = 50): Promise<User[]> {
    return this.userRepo.getAllUsers(page, pageSize);
  }
}
