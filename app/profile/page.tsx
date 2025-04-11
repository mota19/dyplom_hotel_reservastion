import { FC } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import ProfileHeader from "../_components/ProfileHeader";
import ProfileSettings from "../_components/ProfileSettings";

const Profile: FC = () => {
  return (
    <>
      <div className="m-auto max-w-[1440px]">
        <Header />
        <div className="px-8">
          <ProfileHeader />
          <ProfileSettings />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
