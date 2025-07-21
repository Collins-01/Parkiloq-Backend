export interface Availability {
  id: string;
  spot_id: string;
  available_from: string; // ISO timestamp
  available_to: string;   // ISO timestamp
  recurring?: 'daily' | 'weekends' | null;
  created_at: string;
}
