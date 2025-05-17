import Header from "../_components/Header";
import Footer from "../_components/Footer";
import SideNav from "@/ComponentsAdmin/sideNav";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <div className="m-auto max-w-[1440px]">
        <Header />
        <div className="flex px-8">
          <SideNav />
          <div className="mx-auto max-w-[1000px]">{children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
