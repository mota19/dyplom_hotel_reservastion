import { FC } from "react";
import RoomsTable from "@/ComponentsAdmin/rooms";

const Rooms: FC = () => {
  return (
    <div className="w-[1000px]">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-[32px] font-bold">Rooms</h1>
        <button className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
          Add New Room
        </button>
      </div>
      <RoomsTable />
    </div>
  );
};

export default Rooms;
