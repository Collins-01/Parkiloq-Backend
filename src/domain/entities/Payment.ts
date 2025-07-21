export type PaymentStatus = 'pending' | 'paid' | 'failed';
export type PaymentMethod = 'stripe' | 'crypto';

export interface Payment {
  id: string;
  booking_id: string;
  user_id: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  created_at: string;
}
