import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth';
import spotRoutes from './routes/spots';
import bookingRoutes from './routes/bookings';
import userRoutes from './routes/users';
import paymentRoutes from './routes/payments';
import payoutRoutes from './routes/payouts';
import availabilityRoutes from './routes/availability';
import recurringAvailabilityRoutes from './routes/recurringAvailability';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/payouts', payoutRoutes);
app.use('/api', availabilityRoutes);
app.use('/api', recurringAvailabilityRoutes);
app.use('/api/spots', spotRoutes);
app.use('/api/bookings', bookingRoutes);

export default app;
