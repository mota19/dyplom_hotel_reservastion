"use client";
import { FC, useState } from "react";
import Image from "next/image";
import { recoverPassword } from "@/app/_supabase/apiUser";

const ResetPassword: FC = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recoverPassword(email);
    
  };

  return (
    <div className="h-screen w-full">
      <Image
        src="/image/Switzerland_Lake_Mountains_Houses_Engelberg_Lake_520074_1920x1080.jpg"
        alt="background-switherland"
        fill
        className="object-cover object-top"
      />
      <div className="relative flex h-screen w-full items-center justify-center">
        <form
          className="flex h-auto w-[500px] flex-col rounded-4xl bg-blue-500/30 px-[50px] py-[40px] text-white backdrop-blur-[16px]"
          onSubmit={handleSubmit}
        >
          <h2 className="poppins h-[60px] text-center text-[32px]">
            Recovere your Password
          </h2>
          <label htmlFor="fname" className="text-[16px]">
            Email
          </label>
          <input
            id="frame"
            type="text"
            className="mt-2 mb-2 h-[40px] w-full rounded-[8px] bg-white px-2 text-gray-600"
            placeholder="username@gmail.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <button
            type="submit"
            className="my-6 h-10 w-full cursor-pointer rounded-[8px] bg-[#003465] hover:opacity-80"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
