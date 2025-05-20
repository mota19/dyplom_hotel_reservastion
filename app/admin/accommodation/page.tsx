"use client";
import { FC, useState } from "react";
import AccommodationTable from "@/ComponentsAdmin/accomodationTable";
import ModalAccommodation from "@/ComponentsAdmin/modalAccommodation";

const Accommodation: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-[1000px]">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-[32px] font-bold">Accommodation</h1>
          <button
            className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            onClick={() => setIsModalOpen(true)}
          >
            Add New Accommodation
          </button>
        </div>
        <AccommodationTable />
      </div>
      {isModalOpen && (
        <ModalAccommodation onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default Accommodation;
