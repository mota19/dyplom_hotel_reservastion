"use client";
import { useState, useEffect } from "react";
import {
  checkSession,
  getUser,
  getProfileImage,
  userGetRole,
} from "../_supabase/apiUser";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "../_supabase/apiUser";
import {
  setGoogle,
  setDiscord,
  setFacebook,
  resetProviders,
  setEmail,
  setProfileImageRedux,
} from "@/redux/slices/userProviderSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";

const CheckAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(
    "/images/default.jpg",
  );
  const [role, setRole] = useState<"user" | "host">("user");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const verifySession = async () => {
      const { data, error } = await checkSession();

      if (error) {
        console.error("Session check failed:", error);
        return;
      }

      const userId = await getUser();

      if (userId !== null) {
        document.cookie = `userId=${userId.id}; path=/; max-age=604800`;
        const profileImage = await getProfileImage(userId.id);
        const { data } = await userGetRole(userId.id);
        if (data?.role === "user" || data?.role === "host") {
          setRole(data.role);
        }
        setProfileImage(profileImage.data);
        dispatch(setProfileImageRedux(profileImage.data!));
      }

      const session = data?.session;
      const provider = session?.user?.app_metadata?.providers;

      if (session) {
        setIsLoggedIn(true);

        dispatch(resetProviders());
        provider.forEach((el: string) => {
          if (el == "google") {
            dispatch(setGoogle(true));
          }
          if (el == "discord") {
            dispatch(setDiscord(true));
          }
          if (el == "facebook") {
            dispatch(setFacebook(true));
          }
          if (el == "email") {
            dispatch(setEmail(session?.user.email ?? ""));
          }
        });
      }
    };

    verifySession();
  }, [dispatch]);

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="flex gap-4 text-lg">
      {isLoggedIn ? (
        <>
          <Image
            src={profileImage || "/image/default.jpg"}
            alt="profile"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full"
          ></Image>
          <button
            onClick={handleLogout}
            className="w-[100px] cursor-pointer rounded-[24px] bg-blue-600 p-4 text-center text-[12px] text-white md:text-[12px] lg:text-[16px]"
          >
            Log out
          </button>
          {role === "host" && (
            <Link
              href="/admin/dashboard"
              className="w-[100px] cursor-pointer rounded-[24px] bg-red-600 p-4 text-center text-[12px] text-white md:text-[12px] lg:text-[16px]"
            >
              Admin
            </Link>
          )}
        </>
      ) : (
        <>
          <Link
            href="sign-up"
            className="w-[100px] rounded-[24px] border-[1px] border-blue-600 bg-white p-4 text-center text-[12px] text-blue-600 md:text-[12px] lg:text-[16px]"
          >
            Sign up
          </Link>
          <Link
            href="sign-in"
            className="w-[100px] rounded-[24px] bg-blue-600 p-4 text-center text-[12px] text-white md:text-[12px] lg:text-[16px]"
          >
            Log in
          </Link>
        </>
      )}
    </div>
  );
};

export default CheckAuth;
