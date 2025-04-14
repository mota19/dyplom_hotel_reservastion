import { FC } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import SideBarSearch from "../_components/sideBarSearch";
import FilterPanel from "../_components/FilterPanel";
import ListOfBooking from "../_components/listOfBooking";

const Booking: FC = () => {
  return (
    <>
      <div className="m-auto max-w-[1440px]">
        <Header />
        <div className="flex w-full px-8">
          <div className="max-w-[400px]">
            <SideBarSearch />
            <FilterPanel />
          </div>
          <ListOfBooking />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Booking;
