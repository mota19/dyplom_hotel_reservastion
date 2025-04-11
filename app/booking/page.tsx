import { FC } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";

const Booking: FC = () => {
  return (
    <>
      <div className="m-auto max-w-[1440px]">
        <Header />
        <div className="px-8"></div>
      </div>
      <Footer />
    </>
  );
};

export default Booking;
