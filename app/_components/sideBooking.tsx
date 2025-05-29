"use client";

import { FC, useState } from "react";
import SideBarSearch from "./sideBarSearch";
import FilterPanel from "./FilterPanel";

const SideBooking: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <button
        className="mx-4 rounded-lg bg-blue-600 px-4 py-2 text-white lg:hidden"
        onClick={() => setIsMenuOpen(true)}
      >
        Filters
      </button>

      <div className="hidden gap-4 lg:flex lg:w-[400px] lg:shrink-0 lg:flex-col">
        <SideBarSearch />
        <FilterPanel />
      </div>

      <div
        className={`fixed inset-0 z-50 transition-transform duration-300 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="bg-opacity-50 absolute backdrop-blur-[16px]"
          onClick={() => setIsMenuOpen(false)}
        />
        <div className="relative z-50 h-full w-4/5 max-w-[400px] overflow-y-auto bg-white p-4 shadow-lg">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-3 right-3 text-2xl text-gray-500"
          >
            ✕
          </button>

          <div className="mt-8 flex flex-col gap-4">
            <SideBarSearch />
            <FilterPanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBooking;
