import { FC } from "react";
import LinkBLock from "./linkBlock";
import dashoardIcon from "@/public/svg/dashboard.svg";
import bookingIcon from "@/public/svg/calendar.svg";
import roomsIcon from "@/public/svg/bed-icon.svg";
import apartmentIcon from "@/public/svg/apartment-_1_.svg";

const SideNav: FC = () => {
  return (
    <div className="h-auto max-w-[250px]">
      <LinkBLock
        href="/dashboard"
        alt="dashboard"
        imageSource={dashoardIcon}
        text="Dashboard"
      />
      <LinkBLock
        href="/booking"
        alt="booking"
        imageSource={bookingIcon}
        text="Booking"
      />
      <LinkBLock
        href="/rooms"
        alt="rooms"
        imageSource={roomsIcon}
        text="Rooms"
      />
      <LinkBLock
        href="/Accommodation"
        alt="Accommodation"
        imageSource={apartmentIcon}
        text="Accommodation"
      />
    </div>
  );
};

export default SideNav;
