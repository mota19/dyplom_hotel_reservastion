import { FC } from "react";
import Image from "next/image";
import { CarouselItem } from "@/components/ui/carousel";
import { PropPopularHotes } from "@/types/supabaseTypes";
import Rating from "./Rating";

const HotelCard: FC<PropPopularHotes> = ({
  name,
  city,
  country,
  star_rating,
  pricePerNight,
  image,
}) => {
  return (
    <CarouselItem className="mb-5 h-auto cursor-pointer rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] md:basis-1/3 lg:basis-1/4">
      <Image
        src={image || "/image/default.jpg"}
        alt="background-switherland"
        width={1440}
        height={300}
        className="h-[300px] w-full rounded-t-2xl object-cover"
      />
      <div className="px-2 pb-4">
        <p className="font-semibold">{name}</p>
        <p className="font-light">
          {city}, {country}
        </p>

        <div className="flex items-center gap-2 text-sm">
          <Rating star_rating={star_rating} />
          <span className="text-gray-500">· 89 reviews</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="font-[600]">from ${pricePerNight}/night</p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M6 4L10 8L6 12"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
};

export default HotelCard;
