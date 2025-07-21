import { User } from '../../domain/entities/User';

export interface IUserRepository {
  getAllUsers(page?: number, pageSize?: number): Promise<User[]>;
  banUser(userId: string, ban: boolean): Promise<void>;
  countUsers(): Promise<number>;
  register(email: string, password: string): Promise<User>;
  login(email: string, password: string): Promise<{ user: User; token: string }>;
  getUserByToken(token: string): Promise<User | null>;
  logout(token: string): Promise<void>;
  getProfile(token: string): Promise<User | null>;
  updateProfile(token: string, updates: Partial<Omit<User, 'id' | 'email'>>): Promise<User>;
}
