export interface Booking {
  id: string;
  userId: string;
  spotId: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'cancelled' | 'completed';
  createdAt?: string;
}
