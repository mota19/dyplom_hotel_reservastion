import { FC } from "react";
import Image from "next/image";

import { DateRangePicker } from "./DateRangePicker";

const ReservationMain: FC = () => {
  return (
    <main className="relative flex h-[400px] flex-col items-center">
      <Image
        src="/image/Switzerland_Lake_Mountains_Houses_Engelberg_Lake_520074_1920x1080.jpg"
        alt="background-switherland"
        width={1440}
        height={300}
        className="mb-[100px] h-[300px] w-full rounded-4xl object-cover"
      />
      <div className="absolute top-[60%] flex h-[100px] w-[800px] translate-y-2.5 justify-between rounded-4xl bg-white px-4 shadow-lg">
        <div className="flex">
          <div className="flex h-full flex-col justify-center border-gray-600">
            <label className="px-2 font-semibold text-gray-700">Location</label>
            <input
              type="text"
              placeholder="Where are you going?"
              className="bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md p-2 text-gray-600 placeholder-gray-400 transition-all focus:outline-none"
            />
          </div>
          <div className="flex h-full flex-col justify-center border-gray-600">
            <label className="px-2 font-semibold text-gray-700">
              Chek-in/Check-out
            </label>
            <DateRangePicker></DateRangePicker>
          </div>

          <div className="flex flex-col justify-center">
            <label className="font-semibold text-gray-700">Guests</label>
            <input
              type="text"
              placeholder="Number of guests?"
              className="bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md p-2 text-gray-600 placeholder-gray-400 transition-all focus:outline-none"
            />
          </div>
        </div>
        <button className="my-2.5 flex w-[100px] items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </main>
  );
};

export default ReservationMain;
