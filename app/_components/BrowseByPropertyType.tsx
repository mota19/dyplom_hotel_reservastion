"use client";
import { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateTypes, updateCountry } from "@/redux/slices/filterSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";

const accomodations = [
  {
    type: "Hotel",
    image: "/image/hotels.jpg",
  },
  {
    type: "Motel",
    image: "/image/motels.jpg",
  },
  {
    type: "Cabin",
    image: "/image/Cabins.jpg",
  },
];

const BrowseByPropertyType: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleClick = (key: string) => {
    router.push(`/booking`);
    dispatch(updateTypes({ types: [key] }));
    dispatch(updateCountry({ country: [] }));
  };

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
          {accomodations.map(({ type, image }) => (
            <CarouselItem
              key={type}
              className="relative cursor-pointer md:basis-1/2 lg:basis-1/3"
              onClick={() => handleClick(type)}
            >
              <Image
                src={image}
                alt={type}
                width={1440}
                height={300}
                className="h-[300px] w-full rounded-4xl object-cover"
              />
              <span className="absolute bottom-4 left-8 rounded-full bg-white/80 px-3 py-1 text-sm">
                {type}
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
