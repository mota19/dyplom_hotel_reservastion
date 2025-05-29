import { FC } from "react";
import Image from "next/image";
import { Accomodation } from "@/types/supabaseTypes";
import { getRatingText } from "./Rating";

const BookingCard: FC<Accomodation> = ({
  name,
  country,
  image,
  star_rating,
  city,
  cheapestRoom,
  nights,
  onClick,
}) => {
  const { text, color } = getRatingText(star_rating!);

  return (
    <div
      className="box-content flex cursor-pointer flex-col rounded-2xl p-4 shadow-[0px_10px_50px_rgba(0,0,0,0.25)] md:h-[200px] md:flex-row"
      onClick={onClick}
    >
      <div className="relative h-[200px] w-full flex-shrink-0 md:h-full md:w-[200px]">
        <Image
          src={image || "/image/default.jpg"}
          alt="accommodation"
          fill
          className="rounded-2xl object-cover"
        />
      </div>
      <div className="mt-4 flex w-full flex-col justify-between md:mt-0 md:ml-4 md:flex-row">
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold md:text-2xl">{name}</h3>
            <p className="text-gray-600">{`${city}, ${country}`}</p>
          </div>
          <div className="mt-2">
            <p className="font-semibold">
              {cheapestRoom?.room_type
                ? cheapestRoom.room_type.toLowerCase().includes("room")
                  ? cheapestRoom.room_type
                  : `${cheapestRoom.room_type} room`
                : "no type of rooms"}
            </p>
            {cheapestRoom?.room_beds?.map((el) => (
              <p className="text-[16px]" key={el.bed_types.name}>
                {`${el.bed_count} x ${el.bed_types.name} ${el.bed_count === 1 ? "bed" : "beds"}`}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-col justify-between md:mt-0 md:items-end md:text-left">
          <div className="flex items-center space-x-2">
            <div>
              <p>{text}</p>
              <p className="text-[16px] text-gray-500">1,920 reviews</p>
            </div>
            <p
              className={`rounded-md px-2 py-1 font-semibold text-white ${color}`}
            >
              {star_rating}
            </p>
          </div>
          <div className="mt-2 md:text-right">
            <p className="font-semibold">
              ${(cheapestRoom?.pricepernight ?? 0) * (nights ?? 1)}
            </p>
            <p className="text-[16px]">
              {nights ?? 1} {nights === 1 ? "night" : "nights"},{" "}
              {cheapestRoom?.capacity ?? 0}{" "}
              {cheapestRoom?.capacity === 1 ? "guest" : "guests"}
            </p>
            <button className="mt-2 h-[50px] w-full rounded-4xl bg-blue-600 text-white">
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
