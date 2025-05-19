"use client";
import { FC } from "react";
import DataTable, { Column } from "./DataTable";
import Image, { StaticImageData } from "next/image";
import room1 from "@/public/image/pic (1).jpg";
import room2 from "@/public/image/pic (2).jpg";
import room3 from "@/public/image/pic (3).jpg";
import room4 from "@/public/image/pic (4).jpg";

interface Room {
  id: number;
  accommodation_id: number;
  name: string;
  description: string;
  capacity: number;
  pricepernight: number;
  room_type: string;
  image: StaticImageData;
  discount: number;
  sqm: number;
}

const mockRooms: Room[] = [
  {
    id: 1,
    accommodation_id: 1,
    name: "Deluxe Suite",
    description: "A luxurious suite with sea view",
    capacity: 4,
    pricepernight: 250,
    room_type: "Suite",
    image: room1,
    discount: 10,
    sqm: 30,
  },
  {
    id: 2,
    accommodation_id: 102,
    name: "Standard Room",
    description: "Comfortable and affordable",
    capacity: 2,
    pricepernight: 1,
    room_type: "Standard",
    image: room2,
    discount: 0,
    sqm: 70,
  },
  {
    id: 3,
    accommodation_id: 2,
    name: "Family Room",
    description: "Spacious room for families",
    capacity: 5,
    pricepernight: 180,
    room_type: "Family",
    image: room3,
    discount: 15,
    sqm: 25,
  },
  {
    id: 4,
    accommodation_id: 3,
    name: "Business Room",
    description: "Ideal for business travelers",
    capacity: 2,
    pricepernight: 200,
    room_type: "Business",
    image: room4,
    discount: 5,
    sqm: 40,
  },
  {
    id: 5,
    accommodation_id: 3,
    name: "Romantic Suite",
    description: "Perfect for couples",
    capacity: 2,
    pricepernight: 220,
    room_type: "Suite",
    image: room2,
    discount: 20,
    sqm: 30,
  },
  {
    id: 6,
    accommodation_id: 3,
    name: "Penthouse",
    description: "Top-floor luxury with panoramic view",
    capacity: 3,
    pricepernight: 400,
    room_type: "Luxury",
    image: room3,
    discount: 25,
    sqm: 19,
  },
  {
    id: 7,
    accommodation_id: 3,
    name: "Economy Room",
    description: "Basic comfort at the best price",
    capacity: 1,
    pricepernight: 80,
    room_type: "Economy",
    image: room4,
    discount: 0,
    sqm: 18,
  },
  {
    id: 8,
    accommodation_id: 2,
    name: "Executive Suite",
    description: "Elegant and functional",
    capacity: 3,
    pricepernight: 300,
    room_type: "Executive",
    image: room1,
    discount: 18,
    sqm: 17,
  },
  {
    id: 9,
    accommodation_id: 1,
    name: "Garden View Room",
    description: "View to the beautiful gardens",
    capacity: 2,
    pricepernight: 150,
    room_type: "Standard",
    image: room2,
    discount: 8,
    sqm: 35,
  },
  {
    id: 10,
    accommodation_id: 1,
    name: "Terrace Room",
    description: "Private terrace included",
    capacity: 2,
    pricepernight: 170,
    room_type: "Standard",
    image: room3,
    discount: 12,
    sqm: 30,
  },
  {
    id: 11,
    accommodation_id: 1,
    name: "Loft Room",
    description: "Modern and open-space design",
    capacity: 3,
    pricepernight: 190,
    room_type: "Loft",
    image: room4,
    discount: 10,
    sqm: 21,
  },
  {
    id: 12,
    accommodation_id: 2,
    name: "Rustic Cabin",
    description: "A cozy wooden cabin",
    capacity: 4,
    pricepernight: 160,
    room_type: "Cabin",
    image: room1,
    discount: 7,
    sqm: 34,
  },
  {
    id: 13,
    accommodation_id: 1,
    name: "Skyline Suite",
    description: "Overlook the city skyline",
    capacity: 2,
    pricepernight: 280,
    room_type: "Suite",
    image: room2,
    discount: 14,
    sqm: 40,
  },
  {
    id: 14,
    accommodation_id: 1,
    name: "Twin Room",
    description: "Two separate beds for convenience",
    capacity: 2,
    pricepernight: 140,
    room_type: "Standard",
    image: room1,
    discount: 5,
    sqm: 10,
  },
];

const columns: Column<Room>[] = [
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
        title={item.description}
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
        src={item.image}
        alt={item.name}
        className="h-12 w-12 rounded border object-cover"
      />
    ),
  },
  { label: "Discount (%)", accessor: "discount" },
];

const AccommodationTable: FC = () => {
  return (
    <DataTable
      data={mockRooms}
      columns={columns}
      searchableFields={["name", "description", "room_type"]}
      sortableFields={["pricepernight", "capacity", "discount"]}
    />
  );
};

export default AccommodationTable;
