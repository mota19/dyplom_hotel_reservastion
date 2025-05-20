"use client";
import { FC, useState } from "react";
import RoomsTable from "@/ComponentsAdmin/rooms";
import ModalRooms from "@/ComponentsAdmin/modalRooms";

const Rooms: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="w-[1000px]">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-[32px] font-bold">Rooms</h1>
          <button
            className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            onClick={() => setIsModalOpen(true)}
          >
            Add New Room
          </button>
        </div>
        <RoomsTable />
      </div>
      {isModalOpen && <ModalRooms onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Rooms;
