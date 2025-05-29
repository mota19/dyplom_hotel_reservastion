import { FC } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";

import ListOfBooking from "../_components/listOfBooking";
import SideBooking from "../_components/sideBooking";

const Booking: FC = () => {
  return (
    <>
      <div className="m-auto max-w-[1440px]">
        <Header />
        <div className="flex w-full flex-col px-2 lg:flex-row lg:px-8">
          <div className="max-w-[400px]">
            <SideBooking />
          </div>
          <ListOfBooking />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Booking;
