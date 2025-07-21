export interface NotificationService {
  sendEmail(to: string, subject: string, html: string, text?: string): Promise<void>;
}
