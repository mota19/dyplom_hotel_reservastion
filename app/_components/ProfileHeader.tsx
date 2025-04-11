import { FC } from "react";
import Image from "next/image";

const ProfileHeader: FC = () => {
  return (
    <div className="flex h-[100px] items-center justify-between">
      <div className="flex">
        <Image
          src="/image/Switzerland_Lake_Mountains_Houses_Engelberg_Lake_520074_1920x1080.jpg"
          alt="background-switherland"
          width={100}
          height={100}
          className="h-[100px] w-[100px] rounded-full"
        ></Image>
        <div className="ml-2 flex flex-col justify-center">
          <p className="text-2xl font-[700]">Bohdan Mota</p>
          <p className="text-gray-600">mota82589@gmail.com</p>
        </div>
      </div>
      <button className="h-[60px] w-[100px] rounded-[24px] bg-blue-600 p-4 text-center text-[16px] text-white">
        Edit
      </button>
    </div>
  );
};

export default ProfileHeader;
