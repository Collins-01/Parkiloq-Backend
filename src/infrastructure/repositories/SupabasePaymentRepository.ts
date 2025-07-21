import { IPaymentRepository } from '../../interfaces/repositories/IPaymentRepository';
import { supabase } from '../supabaseClient';
import { stripe } from '../services/stripe';
import { v4 as uuidv4 } from 'uuid';

export class SupabasePaymentRepository implements IPaymentRepository {
  async sumRevenue(): Promise<number> {
    const { data, error } = await supabase
      .from('payments')
      .select('amount')
      .eq('status', 'paid');
    if (error) throw new Error(error.message);
    const total = (data || []).reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
    return total;
  }
  async createStripeCheckout(bookingId: string, userId: string) {
    // 1. Fetch booking details
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();
    if (bookingError || !booking) throw new Error('Booking not found');
    if (booking.userId !== userId) throw new Error('Unauthorized: Booking does not belong to user');

    // 2. Fetch spot info (for price/currency)
    const { data: spot, error: spotError } = await supabase
      .from('parkingspots')
      .select('*')
      .eq('id', booking.spotId)
      .single();
    if (spotError || !spot) throw new Error('Parking spot not found');

    // 3. Calculate amount (assuming pricePerHour * hours)
    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);
    const hours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
    const amount = Math.max(1, hours) * (spot.pricePerHour || 0); // fallback to 0 if undefined
    if (amount <= 0) throw new Error('Invalid booking amount');

    // 4. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: spot.currency || 'usd',
            product_data: {
              name: `Parking Spot: ${spot.location}`,
            },
            unit_amount: Math.round(amount * 100), // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingId: bookingId,
        userId: userId,
        spotId: booking.spotId,
      },
      success_url: process.env.STRIPE_SUCCESS_URL || 'https://example.com/success',
      cancel_url: process.env.STRIPE_CANCEL_URL || 'https://example.com/cancel',
    });

    // 5. Insert payment record in Supabase
    const paymentId = uuidv4();
    const { error: paymentError } = await supabase.from('payments').insert([
      {
        id: paymentId,
        booking_id: bookingId,
        user_id: userId,
        amount: amount,
        currency: spot.currency || 'usd',
        method: 'stripe',
        status: 'pending',
        created_at: new Date().toISOString(),
        stripe_session_id: session.id,
      },
    ]);
    if (paymentError) throw new Error('Failed to create payment record');

    // 6. Return checkout URL (ensure not null)
    if (!session.url) {
      throw new Error('Stripe session URL is null');
    }
    return { checkoutUrl: session.url };
  }
  
  async createCryptoCheckout(bookingId: string, userId: string): Promise<{ checkoutUrl: string }> {
    throw new Error('Not implemented');
  }
  async handleStripeWebhook(event: any) {
    // Implement using Stripe service and Supabase
    throw new Error('Not implemented');
  }
  async handleCryptoWebhook(event: any): Promise<void> {
    throw new Error('Not implemented');
  }
  async getHostEarnings(hostId: string) {
    // Implement earnings aggregation logic
    throw new Error('Not implemented');
  }
}
