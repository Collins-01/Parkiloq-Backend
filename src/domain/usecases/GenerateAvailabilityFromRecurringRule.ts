import { RecurringAvailabilityRule } from '../entities/RecurringAvailabilityRule';

export class GenerateAvailabilityFromRecurringRule {
  // Generates availability slots for a given date range from a set of recurring rules
  static generateSlots(
    rules: RecurringAvailabilityRule[],
    fromDate: Date,
    toDate: Date
  ): { start: Date; end: Date }[] {
    const slots: { start: Date; end: Date }[] = [];
    for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay();
      for (const rule of rules) {
        if (rule.day_of_week === dayOfWeek) {
          const [startHour, startMinute] = rule.start_time.split(':').map(Number);
          const [endHour, endMinute] = rule.end_time.split(':').map(Number);
          const slotStart = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), startHour, startMinute));
          const slotEnd = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), endHour, endMinute));
          slots.push({ start: slotStart, end: slotEnd });
        }
      }
    }
    return slots;
  }
}
