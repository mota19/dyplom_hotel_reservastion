import { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import HotelCard from "./HotelCard";
import { getPopularAccommodations } from "../_supabase/hotelApi";

const Hotels: FC = async () => {
  const { data, error } = await getPopularAccommodations();
  return (
    <div className="px-8">
      <h2 className="mb-4 text-2xl font-semibold">Popular Hotels</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="mb-4 w-full"
      >
        {error && <div>some error</div>}
        <CarouselContent className="flex">
          {data?.map((el) => (
            <HotelCard
              key={el.id}
              city={el.city}
              name={el.name}
              star_rating={el.star_rating}
              country={el.country}
              id={el.id}
              pricePerNight={el.pricePerNight}
              image={el.image}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Hotels;
