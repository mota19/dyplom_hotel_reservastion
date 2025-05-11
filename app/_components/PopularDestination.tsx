import { FC } from "react";
import Image from "next/image";
import { getPopularDestinations } from "../_supabase/hotelApi";

const PopularDestination: FC = async () => {
  const { data: destinations, error } = await getPopularDestinations();

  return (
    <div className="flex-1 px-8">
      <h2 className="mb-4 text-2xl font-semibold">Popular destinations</h2>

      <div className="grid h-[400px] grid-cols-4 grid-rows-2 gap-2 pb-10">
        {error && <div>some error</div>}

        {destinations?.map((item, index) => {
          const colSpan = "col-span-1";
          let rowSpan = "row-span-1";
          let colStart = 1;

          if (index % 3 === 0) {
            rowSpan = "row-span-2";
          } else if (index === 1 || index === 2) {
            rowSpan = "row-span-1";
            colStart = 1;
          }

          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl ${colSpan} ${rowSpan} col-start-${colStart} `}
            >
              <Image
                src={item.image || "/image/default.jpg"}
                alt={item.country ?? "Unknown"}
                layout="fill"
                objectFit="cover"
              />
              <span className="absolute bottom-2 left-2 rounded-full bg-white/80 px-3 py-1 text-sm">
                {item.country ?? "-"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularDestination;
