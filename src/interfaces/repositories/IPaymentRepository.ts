import { Payment } from '../../domain/entities/Payment';

export interface IPaymentRepository {
  sumRevenue(): Promise<number>;
  createStripeCheckout(bookingId: string, userId: string): Promise<{ checkoutUrl: string }>;
  createCryptoCheckout(bookingId: string, userId: string): Promise<{ checkoutUrl: string }>;
  handleStripeWebhook(event: any): Promise<void>;
  handleCryptoWebhook(event: any): Promise<void>;
  getHostEarnings(hostId: string): Promise<any>;
  // Add more as needed
}
