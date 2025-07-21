export interface ParkingSpot {
  id: string;
  ownerId: string;
  location: string;
  description?: string;
  pricePerHour: number;
  isAvailable: boolean;
  createdAt?: string;
}
