"use client";
import { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getAllInfoProfile } from "../_supabase/apiUser";
import { getCookie } from "../_supabase/apiUser";
import { User } from "@/types/supabaseTypes";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { isSave, isEdit } from "@/redux/slices/profileSettings";
// import {
//   setProfileImageRedux,
//   setFileImage,
// } from "@/redux/slices/userProviderSlice";

const ProfileHeader: FC = () => {
  const [user, setUser] = useState<User[] | null>(null);
  // const [localImage, setLocalImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditt = useAppSelector((state) => state.profileSettings.edit);

  const email = useAppSelector((state) => state.userProvider.email);
  const profileImage = useAppSelector(
    (state) => state.userProvider.profileImage,
  );

  const dispatch = useAppDispatch();

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

  const handleChangeIsSave = () => {
    dispatch(isSave(true));
    dispatch(isEdit(!isEditt));
  };

  const handleEdit = () => {
    dispatch(isEdit(!isEditt));
  };

  const handleImageClick = () => {
    if (isEditt) {
      fileInputRef.current?.click();
    }
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setLocalImage(URL.createObjectURL(file)); // Щоб показати превʼю
  //     dispatch(setProfileImageRedux(file.name));
  //     dispatch(setFileImage(file));
  //   }
  // };

  return (
    <div className="flex h-[100px] items-center justify-between">
      <div className="flex">
        <div className="relative">
          <Image
            src={profileImage || "/image/default.jpg"}
            alt="profile"
            width={100}
            height={100}
            className="h-[100px] w-[100px] cursor-pointer rounded-full object-cover"
            onClick={handleImageClick}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            // onChange={handleFileChange}
          />
          {/* {isEditt && (
            <div
              onClick={handleImageClick}
              className="bg-opacity-50 absolute right-0 bottom-0 left-0 cursor-pointer rounded-b-full bg-black py-1 text-center text-xs text-white"
            >
              Change
            </div>
          )} */}
        </div>
        <div className="ml-2 flex flex-col justify-center">
          <p className="text-2xl font-[700]">
            {user && `${user[0].first_name} ${user[0].last_name}`}
          </p>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>
      {!isEditt ? (
        <button
          className="h-[60px] w-[100px] rounded-[24px] bg-blue-600 p-4 text-center text-[16px] text-white"
          onClick={handleEdit}
        >
          Edit
        </button>
      ) : (
        <div className="space-x-4">
          <button
            className="h-[60px] w-[100px] rounded-[24px] bg-red-600 p-4 text-center text-[16px] text-white"
            onClick={handleEdit}
          >
            Cancel
          </button>
          <button
            className="h-[60px] w-[100px] rounded-[24px] bg-blue-600 p-4 text-center text-[16px] text-white"
            onClick={handleChangeIsSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
