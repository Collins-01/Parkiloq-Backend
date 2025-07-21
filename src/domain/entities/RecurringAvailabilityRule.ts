export interface RecurringAvailabilityRule {
  id: string;
  spot_id: string;
  day_of_week: number; // 0 = Sunday, 6 = Saturday
  start_time: string;  // 'HH:mm'
  end_time: string;    // 'HH:mm'
  created_at: string;
}
