import { FC } from "react";
import TableBooking from "@/ComponentsAdmin/booking";

const Booking: FC = () => {
  return (
    <div className="w-[1000px]">
      <h1 className="mb-4 text-[32px] font-bold">Bookings</h1>
      <TableBooking />
    </div>
  );
};

export default Booking;
