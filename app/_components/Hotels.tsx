import { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import HotelCard from "./HotelCard";

const Hotels: FC = () => {
  return (
    <div className="px-8">
      <h2 className="mb-4 text-2xl font-semibold">Popular Hotels</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="mb-4 w-full"
      >
        <CarouselContent className="flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <HotelCard key={index} />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Hotels;
