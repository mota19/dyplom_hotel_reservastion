import { FC } from "react";
import Image from "next/image";

const BookingCard: FC = () => {
  return (
    <div className="box-content flex h-[200px] rounded-2xl p-4 shadow-[0px_10px_50px_rgba(0,0,0,0.25)]">
      <Image
        src="/image/Switzerland_Lake_Mountains_Houses_Engelberg_Lake_520074_1920x1080.jpg"
        alt="background-switherland"
        width={200}
        height={200}
        className="rounded-2xl object-cover"
      />
      <div className="flex w-full justify-between">
        <div className="ml-4 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-[600]">Hotel Norrebro</h3>
            <p className="text-gray-600">0.4 km from city centre</p>
          </div>
          <div>
            <p className="font-[600]">comfort room</p>
            <p className="">1x king size bed</p>
            <p className="">1x bathroom</p>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex h-auto items-center space-x-2">
            <div>
              <p>Excelent</p>
              <p>1,920 reviews</p>
            </div>
            <p className="rounded-md bg-blue-900 px-2 py-1 font-semibold text-white">
              9.8
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold">$180</p>
            <p>3 nights, 2 guests</p>
            <button className="mt-2 h-[50px] w-full rounded-4xl bg-blue-600 text-white">
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
