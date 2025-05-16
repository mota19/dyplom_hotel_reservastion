import { FC } from "react";
import Header from "@/app/_components/Header";
import DetailInfo from "@/app/_components/detailInfo";
import Footer from "@/app/_components/Footer";

const BookingInfo: FC = () => {
  return (
    <>
      <div className="m-auto max-w-[1440px]">
        <Header />
        <div className="px-8">
          <DetailInfo />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default BookingInfo;
