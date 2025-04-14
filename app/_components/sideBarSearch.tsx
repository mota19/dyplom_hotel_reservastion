import { FC } from "react";
import Image from "next/image";
import Arrow from "@/public/svg/reshot-icon-arrow-diagonal-up-right-Y2ND6FM3RW.svg";
import Destination from "@/public/svg/map-spot-svgrepo-com.svg";
import CheckIn from "@/public/svg/calendar-check-fill.svg";
import CheckOut from "@/public/svg/reshot-icon-schedule-not-successful-LPUSR9G8F5-a214b.svg";
import Man from "@/public/svg/1699635.svg";

const SideBarSearch: FC = () => {
  return (
    <form className="flex max-w-[400px] flex-col gap-3 bg-gray-100 p-8">
      <Image
        src={Arrow}
        alt="arrow"
        className="rotate-225 cursor-pointer"
      ></Image>
      <h2 className="text-2xl font-[600]">Your search</h2>
      <div className="flex flex-col">
        <label htmlFor="oo">Destination</label>
        <div className="relative w-full">
          <input
            type="text"
            id="oo"
            className="h-[40px] w-full rounded-4xl bg-white pr-2 pl-10"
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
        <div className="relative w-full">
          <input
            type="text"
            id="oo"
            className="h-[40px] w-full rounded-4xl bg-white pr-2 pl-10"
          />
          <Image
            src={CheckIn}
            width={16}
            height={16}
            alt="CheckIn"
            className="absolute top-1/2 left-3 -translate-y-1/2"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="oo">Check-out-date</label>
        <div className="relative w-full">
          <input
            type="text"
            id="oo"
            className="h-[40px] w-full rounded-4xl bg-white pr-2 pl-10"
          />
          <Image
            src={CheckOut}
            width={16}
            height={16}
            alt="CheckOut"
            className="absolute top-1/2 left-3 -translate-y-1/2"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="oo">Guests</label>
        <div className="relative w-full">
          <input
            type="text"
            id="oo"
            className="h-[40px] w-full rounded-4xl bg-white pr-2 pl-10"
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
