import { FC } from "react";
import Image from "next/image";

const PopularDestination: FC = () => {
  return (
    <div className="flex-1 px-8">
      <h2 className="mb-4 text-2xl font-semibold">Popular destinations</h2>

      <div className="grid h-[400px] grid-cols-4 grid-rows-2 gap-2 pb-10">
        <div className="relative col-span-1 row-span-2 overflow-hidden rounded-2xl">
          <Image
            src="/image/Switzerland_Lake_Mountains_Houses_Engelberg_Lake_520074_1920x1080.jpg"
            alt="Switzerland"
            layout="fill"
            objectFit="cover"
          />
          <span className="absolute bottom-2 left-2 rounded-full bg-white/80 px-3 py-1 text-sm">
            Spain
          </span>
        </div>
        <div className="relative col-start-2 row-start-1 overflow-hidden rounded-2xl">
          <Image
            src="/image/Switzerland_Lake_Mountains_Houses_Engelberg_Lake_520074_1920x1080.jpg"
            alt="Switzerland"
            layout="fill"
            objectFit="cover"
          />
          <span className="absolute bottom-2 left-2 rounded-full bg-white/80 px-3 py-1 text-sm">
            Spain
          </span>
        </div>
        <div className="relative col-start-2 row-start-2 overflow-hidden rounded-2xl">
          <Image
            src="/image/Switzerland_Lake_Mountains_Houses_Engelberg_Lake_520074_1920x1080.jpg"
            alt="Switzerland"
            layout="fill"
            objectFit="cover"
          />
          <span className="absolute bottom-2 left-2 rounded-full bg-white/80 px-3 py-1 text-sm">
            Spain
          </span>
        </div>
        <div className="relative col-start-3 col-end-4 row-start-1 row-end-3 overflow-hidden rounded-2xl">
          <Image
            src="/image/Switzerland_Lake_Mountains_Houses_Engelberg_Lake_520074_1920x1080.jpg"
            alt="Switzerland"
            layout="fill"
            objectFit="cover"
          />
          <span className="absolute bottom-2 left-2 rounded-full bg-white/80 px-3 py-1 text-sm">
            Spain
          </span>
        </div>
        <div className="relative col-start-4 row-start-1 overflow-hidden rounded-2xl">
          <Image
            src="/image/Switzerland_Lake_Mountains_Houses_Engelberg_Lake_520074_1920x1080.jpg"
            alt="Switzerland"
            layout="fill"
            objectFit="cover"
          />
          <span className="absolute bottom-2 left-2 rounded-full bg-white/80 px-3 py-1 text-sm">
            Spain
          </span>
        </div>
        <div className="relative col-start-4 row-start-2 overflow-hidden rounded-2xl">
          <Image
            src="/image/Switzerland_Lake_Mountains_Houses_Engelberg_Lake_520074_1920x1080.jpg"
            alt="Switzerland"
            layout="fill"
            objectFit="cover"
          />
          <span className="absolute bottom-2 left-2 rounded-full bg-white/80 px-3 py-1 text-sm">
            Spain
          </span>
        </div>
      </div>
    </div>
  );
};

export default PopularDestination;
