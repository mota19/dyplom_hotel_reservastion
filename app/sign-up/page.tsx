"use client";
import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { postRegisterUser } from "../supabase/apiUser";
import OauthButtons from "../_components/OauthButtons";

const Register: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

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
          className="flex h-[600px] w-[500px] flex-col rounded-4xl bg-blue-500/30 px-[50px] py-[40px] text-white backdrop-blur-[16px]"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            postRegisterUser(email, password);
          }}
        >
          <h2 className="poppins h-[60px] text-center text-[32px]">Sign Up</h2>
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
          <label htmlFor="fname" className="text-[16px]">
            Password
          </label>
          <input
            id="frame"
            type="password"
            className="mt-2 mb-2 h-[40px] w-full rounded-[8px] bg-white px-2 text-gray-600"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <label htmlFor="fname" className="text-[16px]">
            Repeat password
          </label>
          <input
            id="frame"
            type="password"
            className="mt-2 mb-2 h-[40px] w-full rounded-[8px] bg-white px-2 text-gray-600"
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
          <button
            type="submit"
            className="my-6 h-10 w-full cursor-pointer rounded-[8px] bg-[#003465] hover:opacity-80"
          >
            Sign Up
          </button>
          <p className="text-center text-[12px]">or continue with</p>
          <OauthButtons />

          <p className="text-center">
            Have an account?
            <Link
              href="sign-in"
              className="cursor-pointer text-black hover:opacity-80"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
