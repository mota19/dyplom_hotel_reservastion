"use client";
import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OauthButtons from "../_components/OauthButtons";
import { signInWithEmailPassword } from "../_supabase/apiUser";
import { useRouter } from "next/navigation";

const Login: FC = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errors, setError] = useState<boolean>(false);

  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await signInWithEmailPassword(email, password);

    if (!error) {
      router.push("/");
    } else {
      setError(true);
    }
  }

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
          <h2 className="poppins h-[60px] text-center text-[32px]">Login</h2>
          <label htmlFor="fname" className="text-[16px]">
            Email
          </label>
          <input
            id="frame"
            type="text"
            className="mt-2 mb-2 h-[40px] w-full rounded-[8px] bg-white px-2 text-gray-600"
            placeholder="username@gmail.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="fname" className="text-[16px]">
            Password
          </label>
          <input
            id="frame"
            type="text"
            className="mt-2 mb-2 h-[40px] w-full rounded-[8px] bg-white px-2 text-gray-600"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <input
                type="checkbox"
                name="check"
                id="check"
                className="cursor-pointer"
              />
              <label htmlFor="check" className="cursor-pointer text-[16px]">
                Remember me
              </label>
            </div>
            <Link href="sign-in/reset-password">Forgot password?</Link>
          </div>
          {errors && (
            <p className="mb-2 text-center text-red-600">
              Password or emaile are wrong. Please try again.
            </p>
          )}
          <button
            type="submit"
            className="my-6 h-10 w-full cursor-pointer rounded-[8px] bg-[#003465] hover:opacity-80"
          >
            Sign in
          </button>
          <p className="text-center text-[12px]">or continue with</p>
          <OauthButtons />
          <p className="text-center">
            Don’t have an account yet?
            <Link
              href="sign-up"
              className="cursor-pointer text-black hover:opacity-80"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
