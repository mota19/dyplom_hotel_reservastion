"use client";
import { FC, useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { DateRangePicker } from "./DateRangePicker";
import { DateRange } from "react-day-picker";

import {
  setCity,
  setNumberOfGuests,
  setInDate,
  setOut,
} from "@/redux/slices/infoAboutBooking";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const ReservationMain: FC = () => {
  const [destination, setDestination] = useState<string>("");
  const [gueests, setGueests] = useState<string>("");
  const [range, setRange] = useState<DateRange | undefined>();
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (range?.from) {
      dispatch(setInDate(format(range.from, "MMM, d")));
    }
    if (range?.to) {
      dispatch(setOut(format(range.to, "d, MMM")));
    }
    dispatch(setNumberOfGuests(+gueests));
    dispatch(setCity(destination));
    router.push("/booking");
  }
  return (
    <main className="relative flex h-[400px] flex-col items-center">
      <Image
        src="/image/Switzerland_Lake_Mountains_Houses_Engelberg_Lake_520074_1920x1080.jpg"
        alt="background-switherland"
        width={1440}
        height={300}
        className="mb-[100px] h-[300px] w-full rounded-4xl object-cover"
      />
      <form
        className="absolute top-[60%] flex h-[100px] w-[800px] translate-y-2.5 justify-between rounded-4xl bg-white px-4 shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex">
          <div className="flex h-full flex-col justify-center border-gray-600">
            <label className="px-2 font-semibold text-gray-700">Location</label>
            <input
              type="text"
              placeholder="Where are you going?"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setDestination(e.target.value)
              }
              value={destination}
              className="bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md p-2 text-gray-600 placeholder-gray-400 transition-all focus:outline-none"
            />
          </div>
          <div className="flex h-full flex-col justify-center border-gray-600">
            <label className="px-2 font-semibold text-gray-700">
              Chek-in/Check-out
            </label>
            <DateRangePicker onDateChange={setRange}></DateRangePicker>
          </div>

          <div className="flex flex-col justify-center">
            <label className="font-semibold text-gray-700">Guests</label>
            <input
              type="text"
              placeholder="Number of guests?"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setGueests(e.target.value);
                }
              }}
              value={gueests}
              className="no-spinner bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md p-2 text-gray-600 placeholder-gray-400 transition-all focus:outline-none"
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
      </form>
    </main>
  );
};

export default ReservationMain;
