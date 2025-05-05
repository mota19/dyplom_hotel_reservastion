"use client";
import { useState, useEffect } from "react";
import { checkSession } from "../_supabase/apiUser";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "../_supabase/apiUser";

const CheckAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      const { data, error } = await checkSession(); // Викликаємо функцію перевірки сесії
      if (error) {
        console.error("Session check failed:", error);
      } else {
        setIsLoggedIn(!!data?.session); // Якщо є сесія, то користувач залогінений
      }
    };

    verifySession(); // Перевіряємо сесію після рендеру
  }, []); // Порожній масив залежностей, щоб викликати один раз після рендеру

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
