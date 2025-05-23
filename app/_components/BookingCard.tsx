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
      className="box-content flex h-[200px] cursor-pointer rounded-2xl p-4 shadow-[0px_10px_50px_rgba(0,0,0,0.25)]"
      onClick={onClick}
    >
      <Image
        src={image || "/image/default.jpg"}
        alt="background-switherland"
        width={200}
        height={200}
        className="rounded-2xl object-cover"
      />
      <div className="flex w-full justify-between">
        <div className="ml-4 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-[600]">{name}</h3>
            <p className="text-gray-600">{`${city}, ${country}`}</p>
          </div>
          <div>
            <p className="font-[600]">
              {cheapestRoom?.room_type ?? "no type of rooms"}
            </p>
            {cheapestRoom?.room_beds?.map((el) => (
              <p className="" key={el.bed_types.name}>
                {`${el.bed_count} ${el.bed_types.name} ${el.bed_count === 1 ? "bed" : "beds"}`}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex h-auto items-center space-x-2">
            <div>
              <p>{text}</p>
              <p>1,920 reviews</p>
            </div>
            <p
              className={`rounded-md px-2 py-1 font-semibold text-white ${color}`}
            >
              {star_rating}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold">
              ${(cheapestRoom?.pricepernight ?? 0) * (nights ?? 1)}
            </p>
            <p>
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
