"use client";

import { FC, useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import Arrow from "@/public/svg/reshot-icon-arrow-diagonal-up-right-Y2ND6FM3RW.svg";
import Destination from "@/public/svg/map-spot-svgrepo-com.svg";
import Man from "@/public/svg/1699635.svg";
import { getBookingSearch } from "../_supabase/hotelApi";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { useAppSelector } from "@/redux/hooks/hooks";
import { allBookingSearch } from "@/redux/slices/bookingSlice";
import {
  setCity,
  setNumberOfGuests,
  setInDate,
  setOut,
} from "@/redux/slices/infoAboutBooking";
import { DateRangePicker } from "./DateRangePicker";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const SideBarSearch: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [destination, setDestination] = useState<string>(
    useAppSelector((state) => state.info.destination) ?? "",
  );
  const [gueests, setGueests] = useState<string>("");
  const [range, setRange] = useState<DateRange | undefined>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const filters = useAppSelector((state) => state.filters);

  useEffect(() => {
    (async function fetchData() {
      const { data, error } = await getBookingSearch(destination, filters);

      if (error) {
        console.error(error);
      } else {
        dispatch(allBookingSearch(data));
        dispatch(setCity(destination));
      }
    })();
  }, [destination, dispatch, filters]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDestination(inputValue);
    if (range?.from) {
      dispatch(setInDate(format(range.from, "MMM, d")));
    }
    if (range?.to) {
      dispatch(setOut(format(range.to, "d, MMM")));
    }
    dispatch(setNumberOfGuests(+gueests));
  }

  return (
    <form
      className="flex max-w-[400px] flex-col gap-3 bg-gray-100 p-8"
      onSubmit={handleSubmit}
    >
      <Image
        src={Arrow}
        alt="arrow"
        className="rotate-225 cursor-pointer"
        onClick={router.back}
      ></Image>
      <h2 className="text-2xl font-[600]">Your search</h2>
      <div className="flex flex-col">
        <label htmlFor="oo">Destination</label>
        <div className="relative w-full">
          <input
            type="text"
            id="oo"
            className="h-[40px] w-full rounded-4xl bg-white pr-2 pl-10"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            value={inputValue}
          />
          <Image
            src={Destination}
            width={16}
            height={16}
            alt="Destination"
            className="absolute top-1/2 left-3 -translate-y-1/2"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="oo">Check-in-date</label>
        <div className="relative w-[400px]">
          <DateRangePicker onDateChange={setRange}></DateRangePicker>
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="guests">Guests</label>
        <div className="relative w-full">
          <input
            type="text"
            id="guests"
            className="h-[40px] w-full rounded-4xl bg-white pr-2 pl-10"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setGueests(e.target.value);
              }
            }}
            value={gueests}
          />
          <Image
            src={Man}
            width={16}
            height={16}
            alt="Man"
            className="absolute top-1/2 left-3 -translate-y-1/2"
          />
        </div>
      </div>
      <button className="h-[50px] cursor-pointer rounded-4xl bg-blue-600 text-white">
        Search
      </button>
    </form>
  );
};

export default SideBarSearch;
