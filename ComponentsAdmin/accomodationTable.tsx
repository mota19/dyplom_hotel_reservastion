"use client";
import { FC, useEffect, useState } from "react";
import DataTable, { Column } from "./DataTable";
import Image from "next/image";
import {
  getAccomodationById,
  getAccomodationByUser,
} from "@/app/_supabase/adminApi";
import { getCookie } from "@/app/_supabase/apiUser";
import { deleteAccommodation } from "@/app/_supabase/adminApi";
import ModalAccommodation from "./modalAccommodation";

export interface IAccommodation {
  id: number;
  name: string;
  type_id: { name: string; id?: number };
  description: string | null;
  city: string | null;
  country: string | null;
  star_rating: number | null;
  image: string | null;
  imageUrl?: string;
  accommodation_amenities?: {
    amenity_id: {
      id: number;
    };
  }[];
}

const columns: Column<IAccommodation>[] = [
  { label: "ID", accessor: "id" },
  { label: "Name", accessor: "name" },
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
  { label: "Type", accessor: "type_id", render: (item) => item.type_id.name },
  { label: "City", accessor: "city" },
  { label: "Country", accessor: "country" },
  { label: "Star Rating", accessor: "star_rating" },
  {
    label: "Image",
    accessor: "image",
    render: (item) => (
      <Image
        src={item.image!}
        alt={item.name}
        width={48}
        height={48}
        className="rounded border object-cover"
      />
    ),
  },
];

const AccommodationTable: FC = () => {
  const [data, setData] = useState<IAccommodation[]>([]);
  const [modalData, setModalData] = useState<IAccommodation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userId = getCookie("userId");

    const fetchData = async () => {
      if (userId) {
        const { data, error } = await getAccomodationByUser(userId);

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
    <>
      <DataTable
        data={data}
        columns={columns}
        searchableFields={["name", "description", "type_id", "city", "country"]}
        sortableFields={["id", "star_rating"]}
        text="Edit"
        onEdit={async (accommodation: IAccommodation) => {
          setIsModalOpen(true);
          const { data } = await getAccomodationById(accommodation.id || 0);
          console.log(data);
          if (data && Array.isArray(data) && data.length > 0) {
            setModalData(data);
          } else {
            setModalData([]);
          }
        }}
        onDelete={(accommodation: IAccommodation) => {
          if (accommodation.id == null) return;
          deleteAccommodation(accommodation.id).then(() => {
            setData((prev) => prev.filter((r) => r.id !== accommodation.id));
          });
        }}
      />
      {isModalOpen && (
        <ModalAccommodation
          onClose={() => setIsModalOpen(false)}
          data={modalData[0]}
        />
      )}
    </>
  );
};

export default AccommodationTable;
