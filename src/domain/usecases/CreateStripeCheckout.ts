import { IPaymentRepository } from '../../interfaces/repositories/IPaymentRepository';

export class CreateStripeCheckout {
  constructor(private paymentRepo: IPaymentRepository) {}
  async execute(bookingId: string, userId: string): Promise<{ checkoutUrl: string }> {
    return this.paymentRepo.createStripeCheckout(bookingId, userId);
  }
}
