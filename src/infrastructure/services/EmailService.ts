import { NotificationService } from '../../domain/services/NotificationService';
import { RESEND_API_KEY, EMAIL_FROM } from '../../config/env';
import fetch from 'node-fetch';

export class EmailService implements NotificationService {
  async sendEmail(to: string, subject: string, html: string, text?: string): Promise<void> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: EMAIL_FROM,
          to,
          subject,
          html,
          text,
        }),
      });
      if (!response.ok) {
        const err = await response.text();
        console.error('Email send failed:', err);
      }
    } catch (e) {
      console.error('Email send error:', e);
    }
  }
}
