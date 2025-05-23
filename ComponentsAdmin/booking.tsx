"use client";
import { FC, useState, useEffect } from "react";
import DataTable, { Column } from "./DataTable";
import { getCookie } from "@/app/_supabase/apiUser";
import { getBookingByUser } from "@/app/_supabase/adminApi";

interface Booking {
  booking_id: number | null;
  accommodation_name: string | null;
  room_id: number | null;
  guest_name: string | null;
  guest_email: string | null;
  status: string | null;
  numberOfGuests: number | null;
  start_date: string | null;
  end_date: string | null;
  pricepernight: number | null;
  guest_full?: string | null;
  fullDate?: string | null;
  amount?: number | null;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day} ${year}`;
};

const columns: Column<Booking>[] = [
  { label: "id", accessor: "booking_id" },
  { label: "Accommodation", accessor: "accommodation_name" },
  { label: "room_id", accessor: "room_id" },
  {
    label: "Guest",
    accessor: "guest_full",
    render: (item) => (
      <div>
        <div>{item.guest_name}</div>
        <div className="text-muted-foreground text-xs">{item.guest_email}</div>
      </div>
    ),
  },
  {
    label: "Dates",
    accessor: "fullDate",
    render: (item) => (
      <div>
        <div>
          {`${Math.round(
            (new Date(item.end_date!).getTime() -
              new Date(item.start_date!).getTime()) /
              (1000 * 60 * 60 * 24),
          )} nights`}
        </div>
        <div className="text-muted-foreground text-xs">
          {`${formatDate(item.start_date)} -> ${formatDate(item.end_date)}`}
        </div>
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
    label: "Guests",
    accessor: "numberOfGuests",
    align: "right",
  },
  {
    label: "price Per Night",
    accessor: "pricepernight",
    render: (item) => <span>${item.pricepernight?.toFixed(2)}</span>,
    align: "right",
  },
  {
    label: "Amount",
    accessor: "amount",
    render: (item) => {
      if (!item.pricepernight || !item.start_date || !item.end_date)
        return "$0.00";

      const nights = Math.round(
        (new Date(item.end_date).getTime() -
          new Date(item.start_date).getTime()) /
          (1000 * 60 * 60 * 24),
      );

      const total = item.pricepernight * nights;

      return <span>${total.toFixed(2)}</span>;
    },
    align: "right",
  },
];

const TableBooking: FC = () => {
  const [data, setData] = useState<Booking[]>([]);

  useEffect(() => {
    const userId = getCookie("userId");

    const fetchData = async () => {
      if (userId) {
        const { data, error } = await getBookingByUser(userId);

        if (error) {
          console.error(error);
        }

        if (data) {
          const dataWithFull = data.map((b) => ({
            ...b,
            guest_full: (b.guest_name ?? "") + " " + (b.guest_email ?? ""),
            fullDate: (b.start_date ?? "") + " — " + (b.end_date ?? ""),
            amount:
              b.pricepernight && b.start_date && b.end_date
                ? b.pricepernight *
                  Math.round(
                    (new Date(b.end_date).getTime() -
                      new Date(b.start_date).getTime()) /
                      (1000 * 60 * 60 * 24),
                  )
                : 0,
          }));
          setData(dataWithFull);
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
      searchableFields={["guest_full"]}
      statusField="status"
      statusOptions={["CONFIRMED", "UNCONFIRMED"]}
      sortableFields={["pricepernight", "start_date", "amount"]}
    />
  );
};

export default TableBooking;
