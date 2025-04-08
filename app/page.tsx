import Header from "./_components/Header";
import ReservationMain from "./_components/reseravtionMain";
import PopularDestination from "./_components/PopularDestination";
import BrowseByPropertyType from "./_components/BrowseByPropertyType";
import Hotels from "./_components/Hotels";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <>
      <div className="poppins m-auto flex h-auto max-w-[1440px] flex-col">
        <Header />
        <ReservationMain />
        <PopularDestination />
        <BrowseByPropertyType />
        <Hotels />
      </div>
      <Footer />
    </>
  );
}
