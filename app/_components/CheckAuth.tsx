"use client";
import { useState, useEffect } from "react";
import { checkSession } from "../_supabase/apiUser";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "../_supabase/apiUser";
import {
  setGoogle,
  setDiscord,
  setFacebook,
  resetProviders,
} from "@/redux/slices/userProviderSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";

const CheckAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const verifySession = async () => {
      const { data, error } = await checkSession();

      if (error) {
        console.error("Session check failed:", error);
        return;
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
            src="/image/Switzerland_Lake_Mountains_Houses_Engelberg_Lake_520074_1920x1080.jpg"
            alt="profile"
            width={56}
            height={56}
            className="rounded-full"
          ></Image>
          <button
            onClick={handleLogout}
            className="w-[100px] cursor-pointer rounded-[24px] bg-blue-600 p-4 text-center text-[16px] text-white"
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <Link
            href="sign-up"
            className="w-[100px] rounded-[24px] border-[1px] border-blue-600 bg-white p-4 text-center text-[16px] text-blue-600"
          >
            Sign up
          </Link>
          <Link
            href="sign-in"
            className="w-[100px] rounded-[24px] bg-blue-600 p-4 text-center text-[16px] text-white"
          >
            Log in
          </Link>
        </>
      )}
    </div>
  );
};

export default CheckAuth;
