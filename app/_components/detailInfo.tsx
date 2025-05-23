"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Arrow from "@/public/svg/reshot-icon-arrow-diagonal-up-right-Y2ND6FM3RW.svg";

import { useRouter } from "next/navigation";
import { getRatingText } from "./Rating";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RoomsCard from "./roomsCard";
import { getAccommodationById } from "../_supabase/hotelApi";
import { useParams } from "next/navigation";
import { IAccommodationWithRelations } from "@/types/supabaseTypes";

const DetailInfo: FC = () => {
  const [data, setData] = useState<IAccommodationWithRelations | null>(null);
  const [rating, setRating] = useState<{ text: string; color: string } | null>(
    null,
  );

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const id = params?.id;

    (async function getAccommodationInfo() {
      if (id) {
        const data = await getAccommodationById(+id);

        setData(data);
      }
      return;
    })();
  }, [params]);

  useEffect(() => {
    if (data) {
      const { text, color } = getRatingText(data.star_rating);
      setRating({ text, color });
    }
  }, [data]);

  const imagesCount = [
    data?.image,
    data?.rooms?.[0]?.image,
    data?.rooms?.[1]?.image,
  ].filter(Boolean).length;

  const gridClass =
    imagesCount === 3
      ? "grid grid-cols-2 grid-rows-2 gap-4"
      : imagesCount === 2
        ? "grid grid-cols-2 grid-rows-1 gap-4"
        : "grid grid-cols-1 grid-rows-1 gap-4";

  return (
    <div>
      <Image
        src={Arrow}
        alt="arrow"
        className="rotate-225 cursor-pointer"
        onClick={router.back}
      ></Image>
      <h1 className="mt-4 text-3xl font-bold text-gray-900">{data?.name}</h1>
      <h2 className="text-lg font-medium text-gray-600">
        {data?.city}, {data?.country}
      </h2>

      <div className="mt-4 flex-col">
        <div className={gridClass}>
          {data?.image && (
            <Image
              src={data.image}
              alt="hotel large"
              width={600}
              height={500}
              className="col-span-1 row-span-2 h-full max-h-[600px] w-full rounded-2xl object-cover"
              priority
            />
          )}

          {data?.rooms?.[0]?.image && (
            <Image
              src={data.rooms[0].image}
              alt="hotel small 1"
              width={imagesCount === 3 ? 300 : 600}
              height={imagesCount === 3 ? 245 : 490}
              className="h-full max-h-[292px] w-full rounded-2xl object-cover"
              priority
            />
          )}

          {data?.rooms?.[1]?.image && imagesCount === 3 && (
            <Image
              src={data.rooms[1].image}
              alt="hotel small 2"
              width={300}
              height={245}
              className="h-full max-h-[292px] w-full rounded-2xl object-cover"
              priority
            />
          )}
        </div>
        <div className="mt-8 flex flex-col">
          <h3 className="text-2xl font-semibold">Description</h3>
          <div className="mt-4 flex flex-row justify-between gap-24">
            <p className="leading-relaxed text-gray-700">{data?.description}</p>

            <div className="flex h-auto min-w-[150px] items-center space-x-2 self-start">
              <div>
                <p>{rating?.text}</p>
                <p>1,920 reviews</p>
              </div>
              <p
                className={`rounded-md px-2 py-1 font-semibold text-white ${rating?.color}`}
              >
                {data?.star_rating}
              </p>
            </div>
          </div>

          <h3 className="mt-8 text-2xl font-semibold">Amenities</h3>
          <div className="mt-4 flex flex-wrap gap-4 text-gray-700">
            {data?.accommodation_amenities.map((el) => (
              <span
                className="rounded-full bg-gray-100 px-4 py-2"
                key={el.amenities.name}
              >
                {el.amenities.name}
              </span>
            ))}
          </div>
          <h3 className="mt-8 text-2xl font-semibold">Rooms</h3>
          <Carousel
            opts={{
              align: "start",
            }}
            className="mb-4 w-full"
          >
            <CarouselContent className="flex">
              {data?.rooms?.map((room, index) => (
                <RoomsCard
                  key={index}
                  id={room.id}
                  image={room.image}
                  title={room.name}
                  area={room.sqm}
                  typeOfRoom={room.room_type}
                  capacity={room.capacity}
                  bedSize={room.room_beds}
                  price={room.pricepernight}
                />
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
