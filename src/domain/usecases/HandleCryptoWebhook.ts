import { IPaymentRepository } from '../../interfaces/repositories/IPaymentRepository';

export class HandleCryptoWebhook {
  constructor(private paymentRepo: IPaymentRepository) {}
  async execute(event: any): Promise<void> {
    return this.paymentRepo.handleCryptoWebhook(event);
  }
}
