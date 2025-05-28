import { CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import { FC } from "react";
import { IyourBooking } from "@/types/supabaseTypes";
import person from "@/public/svg/1699635.svg";
import sqm from "@/public/svg/square-measument-svgrepo-com.svg";
import bed from "@/public/svg/bed-icon.svg";
import { Button } from "@/components/ui/button";
import { deleteBooking } from "../_supabase/adminApi";

const YourBookingCard: FC<IyourBooking> = ({
  room_id,
  start_date,
  end_date,
  id,
  onDelete,
}) => {
  const nights = Math.max(
    Math.ceil(
      (new Date(end_date).getTime() - new Date(start_date).getTime()) /
        (1000 * 60 * 60 * 24),
    ),
    1,
  );

  const totalPrice = room_id?.pricepernight
    ? nights * room_id.pricepernight
    : 0;

  return (
    <CarouselItem className="mb-5 h-auto rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] md:basis-1/3 lg:basis-1/4">
      <Image
        src={room_id?.image || "/image/default.jpg"}
        alt={room_id?.name || "no Title"}
        width={1440}
        height={300}
        className="h-[300px] w-full rounded-t-2xl object-cover"
      />
      <div className="space-y-1 px-2 pb-4">
        <div>
          <p className="mb-0 text-lg font-semibold">{room_id?.name}</p>
          <p className="text-gray-600">{`${room_id?.room_type} room`}</p>
          <p className="text-sm text-gray-500">
            {`From: ${new Date(start_date).toLocaleDateString()} To: ${new Date(end_date).toLocaleDateString()}`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Image src={sqm} alt="area" className="h-4 w-4" />
          <p className="text-base font-light">{`${room_id?.sqm} sqm`}</p>
        </div>

        <div className="flex items-center gap-2">
          <Image src={person} alt="capacity" className="h-4 w-4" />
          <p className="text-base font-light">
            {`${room_id?.capacity} ${room_id?.capacity === 1 ? "person" : "people"}`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Image src={bed} alt="bed" className="h-4 w-4" />
          {room_id?.room_beds.map((el) => (
            <p className="text-base font-light" key={el.bed_types.name}>
              {`${el.bed_count} ${el.bed_types.name}`}
            </p>
          ))}
        </div>

        <div className="pt-2">
          <p className="text-sm font-medium text-gray-700">
            Total Price:{" "}
            <span className="font-semibold text-black">
              ${totalPrice}{" "}
              <span className="text-xs text-gray-500">
                ({nights} night{nights > 1 ? "s" : ""} × $
                {room_id?.pricepernight})
              </span>
            </span>
          </p>
        </div>

        <div className="pt-2">
          <Button
            variant="destructive"
            size="sm"
            className="cursor-pointer"
            onClick={async () => {
              const confirmed = confirm(
                "Are you sure you want to delete this booking?",
              );
              if (confirmed) {
                const { error } = await deleteBooking(id);
                if (!error) {
                  onDelete?.(id);
                } else {
                  alert("Failed to delete booking.");
                }
              }
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </CarouselItem>
  );
};

export default YourBookingCard;
