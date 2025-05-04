import { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const accomodations = { type: ["hotels", "motels", "cabins"], img: [] };

const BrowseByPropertyType: FC = () => {
  return (
    <div className="mb-8 px-8">
      <h2 className="mb-4 text-2xl font-semibold">Browse by property type</h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {accomodations.type.map((el) => (
            <CarouselItem
              key={el}
              className="relative md:basis-1/2 lg:basis-1/3"
            >
              <Image
                src="/image/Switzerland_Lake_Mountains_Houses_Engelberg_Lake_520074_1920x1080.jpg"
                alt="background-switherland"
                width={1440}
                height={300}
                className="h-[300px] w-full rounded-4xl object-cover"
              />
              <span className="absolute bottom-4 left-8 rounded-full bg-white/80 px-3 py-1 text-sm">
                {el}
              </span>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default BrowseByPropertyType;
