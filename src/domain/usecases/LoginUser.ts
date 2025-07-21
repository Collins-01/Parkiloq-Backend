import { IUserRepository } from '../../interfaces/repositories/IUserRepository';

export class LoginUser {
  constructor(private userRepo: IUserRepository) {}

  async execute(email: string, password: string): Promise<{ user: any; token: string }> {
    return this.userRepo.login(email, password);
  }
}
