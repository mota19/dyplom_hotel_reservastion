import { FC } from "react";
import AccommodationTable from "@/ComponentsAdmin/accomodationTable";

const Accommodation: FC = () => {
  return (
    <div className="w-[1000px]">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-[32px] font-bold">Accommodation</h1>
        <button className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
          Add New Room
        </button>
      </div>
      <AccommodationTable />
    </div>
  );
};

export default Accommodation;
