import { IPaymentRepository } from '../../interfaces/repositories/IPaymentRepository';

export class GetHostEarnings {
  constructor(private paymentRepo: IPaymentRepository) {}
  async execute(hostId: string): Promise<any> {
    return this.paymentRepo.getHostEarnings(hostId);
  }
}
