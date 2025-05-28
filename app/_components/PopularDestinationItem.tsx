"use client";
import { FC } from "react";
import { updateCountry } from "@/redux/slices/filterSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Destination {
  country: string | null;
  image: string;
  colSpan?: string;
  rowSpan?: string;
  colStart?: number;
}

const PopularDestinationItem: FC<Destination> = ({
  image,
  country,
  colSpan,
  rowSpan,
  colStart,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleClick = (key: string) => {
    router.push(`/booking`);
    dispatch(updateCountry({ country: [key] }));
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${colSpan} ${rowSpan} col-start-${colStart} cursor-pointer`}
      onClick={() => handleClick(country!)}
    >
      <Image
        src={image || "/image/default.jpg"}
        alt={country ?? "Unknown"}
        layout="fill"
        objectFit="cover"
      />
      <span className="absolute bottom-2 left-2 rounded-full bg-white/80 px-3 py-1 text-sm">
        {country ?? "-"}
      </span>
    </div>
  );
};

export default PopularDestinationItem;
