import Header from "./_components/Header";
import ReservationMain from "./_components/reseravtionMain";
import PopularDestination from "./_components/PopularDestination";
import Carousel from "./_components/Carousel";

export default function Home() {
  return (
    <div className="poppins m-auto flex h-screen max-w-[1440px] flex-col">
      <Header />
      <ReservationMain />
      <PopularDestination />
      <Carousel />
    </div>
  );
}
