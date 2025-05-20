"use client";
import { FC, useState, useEffect } from "react";
import DataTable, { Column } from "./DataTable";
import Image from "next/image";

import { getCookie } from "@/app/_supabase/apiUser";
import { getRoomsByUser } from "@/app/_supabase/adminApi";

interface IRooms {
  accommodation_id: number | null;
  capacity: number | null;
  description: string | null;
  discount: number | null;
  id: number | null;
  image: string | null;
  name: string | null;
  owner_id: string | null;
  pricepernight: number | null;
  room_type: string | null;
  sqm: number | null;
}

const columns: Column<IRooms>[] = [
  { label: "ID", accessor: "id" },
  { label: "Name", accessor: "name" },
  { label: "Accom_id", accessor: "accommodation_id" },
  {
    label: "Description",
    accessor: "description",
    render: (item) => (
      <div
        style={{
          maxWidth: "200px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={item.description!}
      >
        {item.description}
      </div>
    ),
  },
  { label: "SQM", accessor: "sqm" },
  { label: "Capacity", accessor: "capacity" },
  { label: "Price/Night", accessor: "pricepernight" },
  { label: "Room Type", accessor: "room_type" },
  {
    label: "Image",
    accessor: "image",
    render: (item) => (
      <Image
        src={item.image || "/image/default.jpg"}
        alt={item.name || "undefined"}
        className="h-12 w-12 rounded border object-cover"
        width={48}
        height={48}
      />
    ),
  },
  { label: "Discount (%)", accessor: "discount" },
];

const RoomsTable: FC = () => {
  const [data, setData] = useState<IRooms[]>([]);

  useEffect(() => {
    const userId = getCookie("userId");

    const fetchData = async () => {
      if (userId) {
        const { data, error } = await getRoomsByUser(userId);

        if (error) {
          console.error(error);
        }

        if (data) {
          setData(data);
        } else {
          setData([]);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <DataTable
      data={data}
      columns={columns}
      searchableFields={["name", "description", "room_type"]}
      sortableFields={[
        "pricepernight",
        "capacity",
        "discount",
        "accommodation_id",
      ]}
    />
  );
};

export default RoomsTable;
