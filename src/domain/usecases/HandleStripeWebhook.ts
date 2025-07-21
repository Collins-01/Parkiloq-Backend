import { IPaymentRepository } from '../../interfaces/repositories/IPaymentRepository';

import { EmailNotificationService } from '../../interfaces/services/EmailNotificationService';

export class HandleStripeWebhook {
  constructor(
    private paymentRepo: IPaymentRepository,
    private notificationService: EmailNotificationService
  ) {}

  async execute(event: any): Promise<void> {
    // Call paymentRepo and get booking/payment info
const result = await this.paymentRepo.handleStripeWebhook(event);
// You would need to fetch user, host, spot, and amount info for real emails
try {
  await this.notificationService.sendPaymentReceipt(
    result.driverEmail,
    result.driverName || '',
    result.amount || 0,
    result.spotName || '',
    result.location || ''
  );
  await this.notificationService.sendHostBookingAlert(
    result.hostEmail,
    result.hostName || '',
    result.spotName || '',
    result.startTime || '',
    result.endTime || ''
  );
} catch (e) {
  console.error('Payment email notification failed:', e);
}
return result;
  }
}
