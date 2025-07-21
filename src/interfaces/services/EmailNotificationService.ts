import { NotificationService } from '../../domain/services/NotificationService';

export class EmailNotificationService {
  constructor(private notificationService: NotificationService) {}

  async sendBookingConfirmation(to: string, name: string, spot: string, start: string, end: string) {
    const subject = 'Your Parking Booking is Confirmed';
    const html = `<p>Hi ${name}, your booking at <b>${spot}</b> from <b>${start}</b> to <b>${end}</b> is confirmed.</p>`;
    const text = `Hi ${name}, your booking at ${spot} from ${start} to ${end} is confirmed.`;
    await this.notificationService.sendEmail(to, subject, html, text);
  }

  async sendHostBookingAlert(to: string, hostName: string, spot: string, start: string, end: string) {
    const subject = 'New Booking for Your Spot';
    const html = `<p>Hi ${hostName}, a new booking has been made for your spot <b>${spot}</b> from <b>${start}</b> to <b>${end}</b>.</p>`;
    const text = `Hi ${hostName}, a new booking has been made for your spot ${spot} from ${start} to ${end}.`;
    await this.notificationService.sendEmail(to, subject, html, text);
  }

  async sendPaymentReceipt(to: string, name: string, amount: number, spot: string, location: string) {
    const subject = 'Payment Receipt';
    const html = `<p>Thanks for your payment of <b>$${amount}</b> for your parking spot at <b>${location}</b> (${spot}).</p>`;
    const text = `Thanks for your payment of $${amount} for your parking spot at ${location} (${spot}).`;
    await this.notificationService.sendEmail(to, subject, html, text);
  }
}
