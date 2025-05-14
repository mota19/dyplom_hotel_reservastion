"use client";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { getAllInfoProfile } from "../_supabase/apiUser";
import { getCookie } from "../_supabase/apiUser";
import { User } from "@/types/supabaseTypes";
import { useAppSelector } from "@/redux/hooks/hooks";

const ProfileHeader: FC = () => {
  const [user, setUser] = useState<User[] | null>(null);

  const email = useAppSelector((state) => state.userProvider.email);
  const profileImage = useAppSelector(
    (state) => state.userProvider.profileImage,
  );
  useEffect(() => {
    const userId = getCookie("userId");
    (async function getInfo() {
      if (userId) {
        const data = await getAllInfoProfile(userId);
        setUser(data.data);
      }
      return;
    })();
  }, []);

  return (
    <div className="flex h-[100px] items-center justify-between">
      <div className="flex">
        <Image
          src={profileImage || "/image/default.jpg"}
          alt="background-switherland"
          width={100}
          height={100}
          className="h-[100px] w-[100px] rounded-full"
        ></Image>
        <div className="ml-2 flex flex-col justify-center">
          <p className="text-2xl font-[700]">
            {user && `${user[0].first_name} ${user[0].last_name}`}
          </p>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>
      <button className="h-[60px] w-[100px] rounded-[24px] bg-blue-600 p-4 text-center text-[16px] text-white">
        Edit
      </button>
    </div>
  );
};

export default ProfileHeader;
