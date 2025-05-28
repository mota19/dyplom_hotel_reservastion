"use client";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FC, useEffect, useState } from "react";
import { getBookingById } from "../_supabase/hotelApi";
import { getCookie } from "../_supabase/apiUser";
import { IyourBooking } from "@/types/supabaseTypes";
import YourBookingCard from "./YourBookingCard";

const YourBookings: FC = () => {
  const [data, setData] = useState<IyourBooking[] | null>();

  useEffect(() => {
    const userId = getCookie("userId");
    console.log(userId);
    (async function getInfo() {
      if (userId) {
        const { data } = await getBookingById(userId);
        console.log(data);
        if (data) {
          setData(data);
        }
      }
    })();
  }, []);

  const handleDelete = (id: number) => {
    setData((prev) => prev!.filter((item) => item.id !== id));
  };

  return (
    <>
      <h3 className="text-2xl font-[700]">Your bookings</h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className="my-6 w-full"
      >
        <CarouselContent>
          {data?.map((el) => (
            <YourBookingCard
              key={el.id}
              room_id={el.room_id}
              start_date={el.start_date}
              end_date={el.end_date}
              id={el.id}
              onDelete={handleDelete}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default YourBookings;
