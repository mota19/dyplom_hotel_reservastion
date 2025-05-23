"use client";
import { FC, useState } from "react";
import { DateRangePicker } from "./DateRangePicker";
import { DateRange } from "react-day-picker";
import { saveBooking } from "../_supabase/hotelApi";
import { getCookie } from "../_supabase/apiUser";
import { useAppSelector } from "@/redux/hooks/hooks";

const RoomOfBookingModal: FC<{ onClose: () => void; room_id: number }> = ({
  onClose,
  room_id,
}) => {
  const [range, setRange] = useState<DateRange | undefined>();

  const numberOfGuest = useAppSelector((state) => state.info.numberOfGuest);

  const handleSave = async () => {
    const user_id = getCookie("userId");
    if (user_id && range) {
      if (range.from && range.to) {
        const start_date = range.from.toISOString();
        const end_date = range.to.toISOString();
        await saveBooking({
          user_id,
          start_date,
          end_date,
          status: "unconfirmed",
          room_id,
          numberOfGuests: numberOfGuest || 1,
        });
      }
    }
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-[4px]">
      <div className="flex w-[320px] flex-col items-center gap-4 rounded-xl bg-white p-6 shadow-lg">
        <h3 className="font-bold">Choose a date</h3>
        <DateRangePicker onDateChange={setRange} width="full" />

        <div className="mt-4 flex w-full justify-between gap-2">
          <button
            onClick={handleClose}
            className="flex-1 rounded-md bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomOfBookingModal;
