import { Request, Response } from 'express';
import { SupabasePaymentRepository } from '../../infrastructure/repositories/SupabasePaymentRepository';
import { CreateStripeCheckout } from '../../domain/usecases/CreateStripeCheckout';
// import { CreateCryptoCheckout } from '../../domain/usecases/CreateCryptoCheckout';
import { HandleStripeWebhook } from '../../domain/usecases/HandleStripeWebhook';
// import { HandleCryptoWebhook } from '../../domain/usecases/HandleCryptoWebhook';
import { GetHostEarnings } from '../../domain/usecases/GetHostEarnings';

const paymentRepo = new SupabasePaymentRepository();
import { EmailService } from '../../infrastructure/services/EmailService';
import { EmailNotificationService } from '../../interfaces/services/EmailNotificationService';
const emailService = new EmailService();
const notificationService = new EmailNotificationService(emailService);
const createStripeCheckoutUC = new CreateStripeCheckout(paymentRepo);
// const createCryptoCheckoutUC = new CreateCryptoCheckout(paymentRepo);
const handleStripeWebhookUC = new HandleStripeWebhook(paymentRepo, notificationService);
// const handleCryptoWebhookUC = new HandleCryptoWebhook(paymentRepo);
const getHostEarningsUC = new GetHostEarnings(paymentRepo);
// --- Crypto endpoints are disabled for MVP ---

export class PaymentController {
  static async createStripeCheckout(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { bookingId } = req.body;
      if (!userId || !bookingId) return res.status(400).json({ error: 'Missing userId or bookingId' });
      const result = await createStripeCheckoutUC.execute(bookingId, userId);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async handleStripeWebhook(req: Request, res: Response) {
    try {
      await handleStripeWebhookUC.execute(req.body);
      res.status(200).send('Webhook received');
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  // static async createCryptoCheckout(req: Request, res: Response) {
  //   try {
  //     const userId = req.user?.id;
  //     const { bookingId } = req.body;
  //     if (!userId || !bookingId) return res.status(400).json({ error: 'Missing userId or bookingId' });
  //     const result = await createCryptoCheckoutUC.execute(bookingId, userId);
  //     res.json(result);
  //   } catch (err: any) {
  //     res.status(400).json({ error: err.message });
  //   }
  // }


  // static async handleCryptoWebhook(req: Request, res: Response) {
  //   try {
  //     await handleCryptoWebhookUC.execute(req.body);
  //     res.status(200).send('Webhook received');
  //   } catch (err: any) {
  //     res.status(400).json({ error: err.message });
  //   }
  // }


  static async getHostEarnings(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });
      const result = await getHostEarningsUC.execute(userId);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
