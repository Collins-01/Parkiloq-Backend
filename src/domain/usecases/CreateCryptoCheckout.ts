import { IPaymentRepository } from '../../interfaces/repositories/IPaymentRepository';

export class CreateCryptoCheckout {
  constructor(private paymentRepo: IPaymentRepository) {}
  async execute(bookingId: string, userId: string): Promise<{ checkoutUrl: string }> {
    return this.paymentRepo.createCryptoCheckout(bookingId, userId);
  }
}
