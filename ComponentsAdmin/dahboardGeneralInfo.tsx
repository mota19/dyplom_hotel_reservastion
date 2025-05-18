import { FC } from "react";
import DashboardDiv from "./dahboardDiv";
import money from "@/public/svg/money-bag.svg";
import briefcase from "@/public/svg/free-icon-briefcase-951681.svg";
import apartments from "@/public/svg/apartment-_1_.svg";
import checkMark from "@/public/svg/free-icon-check-mark-1442912.svg";
import bed from "@/public/svg/bed-icon.svg";
import cross from "@/public/svg/cross_1.svg";
import rate from "@/public/svg/bar-graph.svg";

const DashboardGeneralInfo: FC = () => {
  return (
    <>
      <div className="flex flex-wrap gap-10">
        <DashboardDiv icon={money} text="15000$" label="Sales" />
        <DashboardDiv icon={briefcase} text="456" label="Bookings" />
        <DashboardDiv icon={apartments} text="2" label="Apartments" />
        <DashboardDiv icon={checkMark} text="7" label="Confirmed" />
      </div>
      <div className="flex flex-wrap gap-10">
        <DashboardDiv icon={bed} text="16" label="Rooms" />
        <DashboardDiv icon={rate} text="48%" label="Occupancy Rate" />
        <DashboardDiv icon={cross} text="3" label="Unconfirmed" />
      </div>
    </>
  );
};

export default DashboardGeneralInfo;
