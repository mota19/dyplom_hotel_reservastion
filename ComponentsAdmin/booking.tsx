"use client";
import { FC } from "react";
import DataTable, { Column } from "./DataTable";

const data = [
  {
    apartment: "motel",
    guest: "Emma Johnson",
    email: "emma.johnson@example.com",
    stay: "First time → 3 night stay",
    dates: "Jun 12 2025 — Jun 15 2025",
    status: "CONFIRMED",
    amount: "$450.00",
  },
  {
    apartment: "cabin",
    guest: "Liam Smith",
    email: "liam.smith@example.com",
    stay: "Returning guest → 5 night stay",
    dates: "Jul 05 2025 — Jul 10 2025",
    status: "UNCONFIRMED",
    amount: "$1,200.00",
  },
  {
    apartment: "hotel",
    guest: "Olivia Davis",
    email: "olivia.davis@example.com",
    stay: "Frequent guest → 2 night stay",
    dates: "Aug 01 2025 — Aug 03 2025",
    status: "CONFIRMED",
    amount: "$300.00",
  },
  {
    apartment: "motel",
    guest: "Noah Wilson",
    email: "noah.wilson@example.com",
    stay: "First time → 1 night stay",
    dates: "Sep 15 2025 — Sep 16 2025",
    status: "CANCELLED",
    amount: "$100.00",
  },
  {
    apartment: "cabin",
    guest: "Ava Martinez",
    email: "ava.martinez@example.com",
    stay: "Returning guest → 4 night stay",
    dates: "Oct 10 2025 — Oct 14 2025",
    status: "CONFIRMED",
    amount: "$600.00",
  },
  {
    apartment: "motel",
    guest: "William Taylor",
    email: "william.taylor@example.com",
    stay: "Frequent guest → 3 night stay",
    dates: "Nov 20 2025 — Nov 23 2025",
    status: "UNCONFIRMED",
    amount: "$750.00",
  },
  {
    apartment: "motel",
    guest: "Sophia Brown",
    email: "sophia.brown@example.com",
    stay: "First time → 2 night stay",
    dates: "Dec 25 2025 — Dec 27 2025",
    status: "CONFIRMED",
    amount: "$400.00",
  },
  {
    apartment: "hotel",
    guest: "James Anderson",
    email: "james.anderson@example.com",
    stay: "In over 2 years → 2 night stay",
    dates: "Jan 10 2026 — Jan 12 2026",
    status: "CONFIRMED",
    amount: "$350.00",
  },
  {
    apartment: "hotel",
    guest: "Isabella Thomas",
    email: "isabella.thomas@example.com",
    stay: "New guest → 1 night stay",
    dates: "Feb 14 2026 — Feb 15 2026",
    status: "UNCONFIRMED",
    amount: "$180.00",
  },
  {
    apartment: "cabin",
    guest: "Benjamin Moore",
    email: "benjamin.moore@example.com",
    stay: "Frequent guest → 5 night stay",
    dates: "Mar 05 2026 — Mar 10 2026",
    status: "CONFIRMED",
    amount: "$900.00",
  },
  {
    apartment: "motel",
    guest: "Mia Jackson",
    email: "mia.jackson@example.com",
    stay: "In over 3 years → 3 night stay",
    dates: "Apr 18 2026 — Apr 21 2026",
    status: "CONFIRMED",
    amount: "$700.00",
  },
  {
    apartment: "hotel",
    guest: "Elijah Harris",
    email: "elijah.harris@example.com",
    stay: "Returning guest → 2 night stay",
    dates: "May 09 2026 — May 11 2026",
    status: "UNCONFIRMED",
    amount: "$300.00",
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
