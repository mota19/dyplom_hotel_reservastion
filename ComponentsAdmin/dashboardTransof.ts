import { IDashboarInfo } from "@/types/supabaseTypes";
import { parseISO, format, differenceInDays } from "date-fns";

type ChartDataItem = {
  name: string; // e.g., "Jan 2025"
  sales: number; // total value
};

export function transformData(data: IDashboarInfo): ChartDataItem[] {
  const result: Record<string, number> = {};

  data.bookingDetails.forEach((booking) => {
    if (
      booking.start_date &&
      booking.end_date &&
      booking.pricepernight !== null
    ) {
      const start = parseISO(booking.start_date);
      const end = parseISO(booking.end_date);
      const nights = differenceInDays(end, start);

      if (nights > 0) {
        const totalValue = nights * booking.pricepernight;
        const month = format(start, "MMM yyyy"); // Group by start_date month

        result[month] = (result[month] || 0) + totalValue;
      }
    }
  });

  // Convert to array for chart
  return Object.entries(result)
    .map(([month, sales]) => ({
      name: month,
      sales,
    }))
    .sort(
      (a, b) =>
        new Date(a.name + " 1").getTime() - new Date(b.name + " 1").getTime(),
    ); // optional: sort by month
}

export const generateStayDurationData = (
  bookingDetails: IDashboarInfo["bookingDetails"],
) => {
  const durationCount = {
    "2 nights": 0,
    "3 nights": 0,
    "4-5 nights": 0,
    "8-14 nights": 0,
  };

  bookingDetails.forEach((booking) => {
    if (booking.start_date && booking.end_date) {
      const start = parseISO(booking.start_date);
      const end = parseISO(booking.end_date);
      const nights = differenceInDays(end, start);

      if (nights === 2) durationCount["2 nights"]++;
      else if (nights === 3) durationCount["3 nights"]++;
      else if (nights >= 4 && nights <= 5) durationCount["4-5 nights"]++;
      else if (nights >= 8 && nights <= 14) durationCount["8-14 nights"]++;
    }
  });

  return Object.entries(durationCount)
    .map(([name, value]) => ({ name, value }))
    .filter((entry) => entry.value > 0); // прибрати нульові
};
export const generateMonthlyBookingData = (
  bookingDetails: IDashboarInfo["bookingDetails"],
) => {
  const monthlyCount: Record<string, number> = {};

  bookingDetails.forEach((booking) => {
    if (booking.start_date) {
      const date = parseISO(booking.start_date);
      const key = format(date, "yyyy-MM"); // для сортування
      monthlyCount[key] = (monthlyCount[key] || 0) + 1;
    }
  });

  return Object.entries(monthlyCount)
    .map(([key, bookings]) => ({
      key, // "2025-07"
      name: format(new Date(`${key}-01`), "MMM yyyy"), // "Jul 2025"
      bookings,
    }))
    .sort(
      (a, b) =>
        new Date(a.key + "-01").getTime() - new Date(b.key + "-01").getTime(),
    );
};
