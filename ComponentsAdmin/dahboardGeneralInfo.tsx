import { FC } from "react";
import DashboardDiv from "./dahboardDiv";
import money from "@/public/svg/money-bag.svg";
import briefcase from "@/public/svg/free-icon-briefcase-951681.svg";
import apartments from "@/public/svg/apartment-_1_.svg";
import checkMark from "@/public/svg/free-icon-check-mark-1442912.svg";
import bed from "@/public/svg/bed-icon.svg";
import cross from "@/public/svg/cross_1.svg";
import rate from "@/public/svg/bar-graph.svg";
import { IDashboarInfo } from "@/types/supabaseTypes";

const DashboardGeneralInfo: FC<{ data: IDashboarInfo }> = ({ data }) => {
  function calculateOccupancyRate(data: IDashboarInfo, end_Period: string) {
    const startPeriod = new Date();
    const endPeriod = new Date(end_Period);

    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const daysInPeriod =
      Math.ceil((endPeriod.getTime() - startPeriod.getTime()) / MS_PER_DAY) + 1;

    const totalRooms = data.apartmentId.reduce(
      (acc, apt) => acc + apt.rooms.length,
      0,
    );

    const occupiedNights = data.bookingDetails.reduce((acc, el) => {
      if (el.start_date && el.end_date) {
        const start = new Date(el.start_date);
        const end = new Date(el.end_date);

        const actualStart = start > startPeriod ? start : startPeriod;
        const actualEnd = end < endPeriod ? end : endPeriod;

        const overlap =
          (actualEnd.getTime() - actualStart.getTime()) / MS_PER_DAY;
        const nights = Math.max(Math.ceil(overlap), 0);

        return acc + nights;
      }
      return acc;
    }, 0);

    const occupancyRate =
      totalRooms > 0 && daysInPeriod > 0
        ? (occupiedNights / (totalRooms * daysInPeriod)) * 100
        : 0;

    return occupancyRate;
  }

  const today = new Date().toISOString().split("T")[0];

  const occupancyRate = calculateOccupancyRate(data, "2025-06-02");

  const uniqueRoomIds = new Set(
    data.bookingDetails
      .filter((el) => el.start_date === today)
      .map((el) => el.room_id),
  );

  console.log(uniqueRoomIds);

  return (
    <>
      <div className="flex flex-wrap gap-10">
        <DashboardDiv
          icon={money}
          text={
            data?.bookingDetails?.reduce((acc, el) => {
              if (el.pricepernight !== null && el.start_date && el.end_date) {
                const start = new Date(el.start_date);
                const end = new Date(el.end_date);

                const nights = Math.max(
                  Math.ceil(
                    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
                  ),
                  0,
                );

                return acc + el.pricepernight * nights;
              }
              return acc;
            }, 0) ?? 0
          }
          label="Sales"
        />
        <DashboardDiv
          icon={briefcase}
          text={data.bookingDetails.length}
          label="Bookings"
        />
        <DashboardDiv
          icon={apartments}
          text={data.apartmentId.length}
          label="Apartments"
        />
        <DashboardDiv
          icon={checkMark}
          text={
            data.bookingDetails.filter((el) => el.status === "confirmed").length
          }
          label="Confirmed"
        />
      </div>
      <div className="flex flex-wrap gap-10">
        <DashboardDiv
          icon={bed}
          text={data.apartmentId.reduce((acc, el) => acc + el.rooms.length, 0)}
          label="Rooms"
        />
        <DashboardDiv
          icon={rate}
          text={`${occupancyRate.toFixed(1)}%`}
          label="Occupancy Rate"
        />
        <DashboardDiv
          icon={cross}
          text={
            data.bookingDetails.filter((el) => el.status === "unconfirmed")
              .length
          }
          label="Unconfirmed"
        />
      </div>
    </>
  );
};

export default DashboardGeneralInfo;
