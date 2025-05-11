"use client";
import { FC } from "react";
import BookingCard from "./BookingCard";
import SortByButton from "./SortByButton";
import { useAppSelector } from "@/redux/hooks/hooks";

const ListOfBooking: FC = () => {
  const data = useAppSelector((state) => state.booking);
  const city = useAppSelector((state) => state.info.destination);
  const inDate = useAppSelector((state) => state.info.inDate);
  const outDate = useAppSelector((state) => state.info.outDate);
  const numberOfGuests = useAppSelector((state) => state.info.numberOfGuest);
  const validResults = data?.filter((el) => el.city !== "") ?? [];

  return (
    <div className="w-full p-8">
      <p className="text-gray-800">{validResults.length} search results for</p>
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-[700]">
          {city}, {inDate}-{outDate}, {numberOfGuests} guests
        </h2>
        <SortByButton />
      </div>

      <div className="mt-2 flex flex-col gap-8">
        {data.map((item, index) => {
          return (
            <BookingCard
              key={index}
              id={item.id}
              city={item.city}
              name={item.name}
              star_rating={item.star_rating}
              country={item.country}
              image={item.image}
              pricePerNight={item.pricePerNight}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ListOfBooking;
