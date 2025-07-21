import { IUserRepository } from '../../interfaces/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { supabase } from '../supabaseClient';

export class SupabaseUserRepository implements IUserRepository {
  async getAllUsers(page = 1, pageSize = 50): Promise<User[]> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    const { data, error } = await supabase
      .from('users')
      .select('id, email, role, created_at, banned')
      .range(from, to)
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return (data as User[]) || [];
  }

  async banUser(userId: string, ban: boolean): Promise<void> {
    const { error } = await supabase
      .from('users')
      .update({ banned: ban })
      .eq('id', userId);
    if (error) throw new Error(error.message);
  }

  async countUsers(): Promise<number> {
    const { count, error } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true });
    if (error) throw new Error(error.message);
    return count || 0;
  }
  async register(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error || !data.user) throw new Error(error?.message || 'Registration failed');
    return { id: data.user.id, email: data.user.email! };
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session || !data.user) throw new Error(error?.message || 'Login failed');
    return {
      user: { id: data.user.id, email: data.user.email! },
      token: data.session.access_token,
    };
  }

  async getUserByToken(token: string): Promise<User | null> {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return null;
    return { id: data.user.id, email: data.user.email! };
  }

  async logout(token: string): Promise<void> {
    // Supabase does not provide a direct logout by token (JWTs are stateless),
    // but you can revoke refresh tokens or rely on client to discard token.
    // Here, just a placeholder for future implementation.
  }

  async getProfile(token: string): Promise<User | null> {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return null;
    const { id, email, user_metadata } = data.user;
    return {
      id,
      email: email!,
      name: user_metadata?.name,
      avatar: user_metadata?.avatar,
      phone: user_metadata?.phone,
    };
  }

  async updateProfile(token: string, updates: Partial<Omit<User, 'id' | 'email'>>): Promise<User> {
    // Create a per-user supabase client using the access token
    const { createClient } = await import('@supabase/supabase-js');
    const { supabaseUrl } = await import('../supabaseClient');
    const supabaseUser = createClient(supabaseUrl, token);
    const { data, error } = await supabaseUser.auth.updateUser({ data: updates });
    if (error || !data.user) throw new Error(error?.message || 'Update failed');
    return {
      id: data.user.id,
      email: data.user.email!,
      name: data.user.user_metadata?.name,
      avatar: data.user.user_metadata?.avatar,
      phone: data.user.user_metadata?.phone,
    };
  }
}
