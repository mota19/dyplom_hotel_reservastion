"use client";
import { FC } from "react";
import DataTable, { Column } from "./DataTable";

const data = [
  {
    apartment: "hotel",
    guest: "Aziz Maghsuomi",
    email: "azizmasoomil@gmail.com",
    stay: "In over 4 years → 2 night stay",
    dates: "Oct 31 2029 — Nov 02 2029",
    status: "UNCONFIRMED",
    amount: "$800.00",
  },
  {
    apartment: "hotel",
    guest: "Kourone Kasende",
    email: "kourone@kasende.com",
    stay: "In over 5 years → 1 night stay",
    dates: "Dec 27 2030 — Dec 28 2030",
    status: "CONFIRMED",
    amount: "$325.00",
  },
  {
    apartment: "hotel",
    guest: "Aziz Maghsuomi",
    email: "azizmasoomil@gmail.com",
    stay: "In over 4 years → 2 night stay",
    dates: "Oct 31 2029 — Nov 02 2029",
    status: "UNCONFIRMED",
    amount: "$800.00",
  },
  {
    apartment: "hotel",
    guest: "Kourone Kasende",
    email: "kourone@kasende.com",
    stay: "In over 5 years → 1 night stay",
    dates: "Dec 27 2030 — Dec 28 2030",
    status: "CONFIRMED",
    amount: "$325.00",
  },
  {
    apartment: "hotel",
    guest: "Aziz Maghsuomi",
    email: "azizmasoomil@gmail.com",
    stay: "In over 4 years → 2 night stay",
    dates: "Oct 31 2029 — Nov 02 2029",
    status: "UNCONFIRMED",
    amount: "$800.00",
  },
  {
    apartment: "hotel",
    guest: "Kourone Kasende",
    email: "kourone@kasende.com",
    stay: "In over 5 years → 1 night stay",
    dates: "Dec 27 2030 — Dec 28 2030",
    status: "CONFIRMED",
    amount: "$325.00",
  },
  {
    apartment: "hotel",
    guest: "Aziz Maghsuomi",
    email: "azizmasoomil@gmail.com",
    stay: "In over 4 years → 2 night stay",
    dates: "Oct 31 2029 — Nov 02 2029",
    status: "UNCONFIRMED",
    amount: "$800.00",
  },
  {
    apartment: "hotel",
    guest: "Kourone Kasende",
    email: "kourone@kasende.com",
    stay: "In over 5 years → 1 night stay",
    dates: "Dec 27 2030 — Dec 28 2030",
    status: "CONFIRMED",
    amount: "$325.00",
  },
  {
    apartment: "hotel",
    guest: "Aziz Maghsuomi",
    email: "azizmasoomil@gmail.com",
    stay: "In over 4 years → 2 night stay",
    dates: "Oct 31 2029 — Nov 02 2029",
    status: "UNCONFIRMED",
    amount: "$800.00",
  },
  {
    apartment: "hotel",
    guest: "Kourone Kasende",
    email: "kourone@kasende.com",
    stay: "In over 5 years → 1 night stay",
    dates: "Dec 27 2030 — Dec 28 2030",
    status: "CONFIRMED",
    amount: "$325.00",
  },
  {
    apartment: "hotel",
    guest: "Aziz Maghsuomi",
    email: "azizmasoomil@gmail.com",
    stay: "In over 4 years → 2 night stay",
    dates: "Oct 31 2029 — Nov 02 2029",
    status: "UNCONFIRMED",
    amount: "$800.00",
  },
  {
    apartment: "hotel",
    guest: "Kourone Kasende",
    email: "kourone@kasende.com",
    stay: "In over 5 years → 1 night stay",
    dates: "Dec 27 2030 — Dec 28 2030",
    status: "CONFIRMED",
    amount: "$325.00",
  },
  {
    apartment: "hotel",
    guest: "Aziz Maghsuomi",
    email: "azizmasoomil@gmail.com",
    stay: "In over 4 years → 2 night stay",
    dates: "Oct 31 2029 — Nov 02 2029",
    status: "UNCONFIRMED",
    amount: "$800.00",
  },
  {
    apartment: "hotel",
    guest: "Kourone Kasende",
    email: "kourone@kasende.com",
    stay: "In over 5 years → 1 night stay",
    dates: "Dec 27 2030 — Dec 28 2030",
    status: "CONFIRMED",
    amount: "$325.00",
  },
  {
    apartment: "hotel",
    guest: "Aziz Maghsuomi",
    email: "azizmasoomil@gmail.com",
    stay: "In over 4 years → 2 night stay",
    dates: "Oct 31 2029 — Nov 02 2029",
    status: "UNCONFIRMED",
    amount: "$800.00",
  },
  {
    apartment: "hotel",
    guest: "Kourone Kasende",
    email: "kourone@kasende.com",
    stay: "In over 5 years → 1 night stay",
    dates: "Dec 27 2030 — Dec 28 2030",
    status: "CONFIRMED",
    amount: "$325.00",
  },

  {
    apartment: "hotel",
    guest: "Aziz Maghsuomi",
    email: "azizmasoomil@gmail.com",
    stay: "In over 4 years → 2 night stay",
    dates: "Oct 31 2029 — Nov 02 2029",
    status: "UNCONFIRMED",
    amount: "$800.00",
  },
  {
    apartment: "hotel",
    guest: "Kourone Kasende",
    email: "kourone@kasende.com",
    stay: "In over 5 years → 1 night stay",
    dates: "Dec 27 2030 — Dec 28 2030",
    status: "CONFIRMED",
    amount: "$325.00",
  },
];

const columns: Column<(typeof data)[0]>[] = [
  { label: "Apartment", accessor: "apartment" },
  {
    label: "Guest",
    accessor: "guest",
    render: (item) => (
      <div>
        <div>{item.guest}</div>
        <div className="text-muted-foreground text-xs">{item.email}</div>
      </div>
    ),
  },
  {
    label: "Dates",
    accessor: "stay",
    render: (item) => (
      <div>
        <div>{item.stay}</div>
        <div className="text-muted-foreground text-xs">{item.dates}</div>
      </div>
    ),
  },
  {
    label: "Status",
    accessor: "status",
    render: (item) => (
      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
        {item.status}
      </span>
    ),
  },
  {
    label: "Amount",
    accessor: "amount",
    align: "right",
  },
];

const TableBooking: FC = () => {
  return (
    <DataTable
      data={data}
      columns={columns}
      searchableFields={["guest", "email"]}
      statusField="status"
      statusOptions={["CONFIRMED", "UNCONFIRMED"]}
      sortableFields={["amount", "dates"]}
    />
  );
};

export default TableBooking;
