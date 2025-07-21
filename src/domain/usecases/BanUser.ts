import { IUserRepository } from '../../interfaces/repositories/IUserRepository';

export class BanUser {
  constructor(private userRepo: IUserRepository) {}

  async execute(userId: string, ban: boolean): Promise<void> {
    return this.userRepo.banUser(userId, ban);
  }
}
