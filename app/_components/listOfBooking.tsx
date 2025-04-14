import { FC } from "react";
import BookingCard from "./BookingCard";
import SortByButton from "./SortByButton";

const ListOfBooking: FC = () => {
  return (
    <div className="w-full p-8">
      <p className="text-gray-800">140 search results for</p>
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-[700]">New York, Dec 9-12, 1 guests</h2>
        <SortByButton />
      </div>

      <div className="mt-2 flex flex-col gap-8">
        {Array(10)
          .fill(0)
          .map((item, index) => {
            return <BookingCard key={index} />;
          })}
      </div>
    </div>
  );
};

export default ListOfBooking;
