"use client";
import { FC } from "react";
import Image from "next/image";
import Arrow from "@/public/svg/reshot-icon-arrow-diagonal-up-right-Y2ND6FM3RW.svg";
import conn from "@/public/image/hotels.jpg";
import { useRouter } from "next/navigation";
import { getRatingText } from "./Rating";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RoomsCard from "./roomsCard";

const DetailInfo: FC = () => {
  const router = useRouter();

  const { text, color } = getRatingText(9!);

  return (
    <div>
      <Image
        src={Arrow}
        alt="arrow"
        className="rotate-225 cursor-pointer"
        onClick={router.back}
      ></Image>
      <h1 className="mt-4 text-3xl font-bold text-gray-900">
        Comfort Stay Hotel
      </h1>
      <h2 className="text-lg font-medium text-gray-600">Zurich, Switzerland</h2>

      <div className="mt-4 flex-col">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <Image
            src={conn}
            alt="hotel large"
            className="col-start-1 col-end-2 row-start-1 row-end-3 h-[500px] w-full rounded-2xl object-cover"
          />
          <Image
            src={conn}
            alt="hotel small 1"
            className="col-start-2 row-start-1 h-[245px] w-full rounded-2xl object-cover"
          />
          <Image
            src={conn}
            alt="hotel small 2"
            className="col-start-2 row-start-2 h-[245px] w-full rounded-2xl object-cover"
          />
        </div>
        <div className="mt-8 flex flex-col">
          <h3 className="text-2xl font-semibold">Description</h3>
          <div className="mt-4 flex flex-row justify-between gap-24">
            <p className="leading-relaxed text-gray-700">
              Nestled in the heart of Zurich, Comfort Stay Hotel offers the
              perfect blend of modern comfort and traditional Swiss hospitality.
              Whether you&apos;re visiting for business or leisure, our prime
              location provides easy access to public transportation,
              restaurants, and cultural landmarks. Guests can enjoy spacious
              rooms, complimentary breakfast, and stunning city views. Our staff
              is dedicated to making your stay memorable, with 24/7 concierge
              service and personalized recommendations.
            </p>

            <div className="flex h-auto min-w-[150px] items-center space-x-2 self-start">
              <div>
                <p>{text}</p>
                <p>1,920 reviews</p>
              </div>
              <p
                className={`rounded-md px-2 py-1 font-semibold text-white ${color}`}
              >
                {9}
              </p>
            </div>
          </div>

          <h3 className="mt-8 text-2xl font-semibold">Amenities</h3>
          <div className="mt-4 flex flex-wrap gap-4 text-gray-700">
            <span className="rounded-full bg-gray-100 px-4 py-2">
              Free Wi-Fi
            </span>
            <span className="rounded-full bg-gray-100 px-4 py-2">
              Breakfast included
            </span>
            <span className="rounded-full bg-gray-100 px-4 py-2">
              Private Parking
            </span>
            <span className="rounded-full bg-gray-100 px-4 py-2">
              Air Conditioning
            </span>
            <span className="rounded-full bg-gray-100 px-4 py-2">
              24/7 Reception
            </span>
            <span className="rounded-full bg-gray-100 px-4 py-2">
              Pool & Spa
            </span>
            <span className="rounded-full bg-gray-100 px-4 py-2">
              Pool & Spa
            </span>
            <span className="rounded-full bg-gray-100 px-4 py-2">
              Pool & Spa
            </span>
            <span className="rounded-full bg-gray-100 px-4 py-2">
              Pool & Spa
            </span>
            <span className="rounded-full bg-gray-100 px-4 py-2">
              Pool & Spa
            </span>
            <span className="rounded-full bg-gray-100 px-4 py-2">
              Pool & Spa
            </span>
          </div>
          <h3 className="mt-8 text-2xl font-semibold">Rooms</h3>
          <Carousel
            opts={{
              align: "start",
            }}
            className="mb-4 w-full"
          >
            <CarouselContent className="flex">
              {Array(10)
                .fill(null)
                .map((el, index) => (
                  <RoomsCard key={index} />
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;
