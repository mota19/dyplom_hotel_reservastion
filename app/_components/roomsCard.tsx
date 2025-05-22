import { FC } from "react";
import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import person from "@/public/svg/1699635.svg";
import sqm from "@/public/svg/square-measument-svgrepo-com.svg";
import bed from "@/public/svg/bed-icon.svg";

interface roomBeds {
  bed_count: number;
  bed_types: {
    id: number;
    name: string;
  };
}

interface RoomsCardProps {
  image: string | null;
  title: string | null;
  area: number | null;
  capacity: number | null;
  typeOfRoom: string | null;
  bedSize: roomBeds[];
  price: number | null;
}

const RoomsCard: FC<RoomsCardProps> = ({
  image,
  title,
  area,
  capacity,
  bedSize,
  typeOfRoom,
  price,
}) => {
  return (
    <CarouselItem className="mb-5 h-auto rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] md:basis-1/3 lg:basis-1/4">
      <Image
        src={image || "/image/default.jpg"}
        alt={title || "no Title"}
        width={1440}
        height={300}
        className="h-[300px] w-full rounded-t-2xl object-cover"
      />
      <div className="space-y-1 px-2 pb-4">
        <div>
          <p className="mb-0 text-lg font-semibold">{title}</p>
          <p className="text-gray-600">{`${typeOfRoom} room`}</p>
        </div>
        <div className="flex items-center gap-2">
          <Image src={sqm} alt="area" className="h-4 w-4" />
          <p className="text-base font-light">{`${area} sqm`}</p>
        </div>
        <div className="flex items-center gap-2">
          <Image src={person} alt="capacity" className="h-4 w-4" />
          <p className="text-base font-light">
            {`${capacity} ${capacity === 1 ? "person" : "people"}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Image src={bed} alt="bed" className="h-4 w-4" />
          {bedSize.map((el) => (
            <p
              className="text-base font-light"
              key={el.bed_types.name}
            >{`${el.bed_count} ${el.bed_types.name}`}</p>
          ))}
        </div>
        <button className="mt-4 w-full cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          Book now for {price} $
        </button>
      </div>
    </CarouselItem>
  );
};

export default RoomsCard;
