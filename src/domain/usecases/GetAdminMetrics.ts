import { IUserRepository } from '../../interfaces/repositories/IUserRepository';
import { IParkingSpotRepository } from '../../interfaces/repositories/IParkingSpotRepository';
import { IBookingRepository } from '../../interfaces/repositories/IBookingRepository';
import { IPaymentRepository } from '../../interfaces/repositories/IPaymentRepository';

export class GetAdminMetrics {
  constructor(
    private userRepo: IUserRepository,
    private spotRepo: IParkingSpotRepository,
    private bookingRepo: IBookingRepository,
    private paymentRepo: IPaymentRepository
  ) {}

  async execute(): Promise<any> {
    const [users, spots, bookings, revenue, hosts] = await Promise.all([
      this.userRepo.countUsers(),
      this.spotRepo.countSpots(),
      this.bookingRepo.countBookings(),
      this.paymentRepo.sumRevenue(),
      this.spotRepo.countActiveHosts(),
    ]);
    return {
      totalUsers: users,
      totalListings: spots,
      totalBookings: bookings,
      revenueToDate: revenue,
      activeHosts: hosts,
    };
  }
}
