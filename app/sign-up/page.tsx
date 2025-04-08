"use client";
import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { postRegisterUser } from "../_supabase/apiUser";
import OauthButtons from "../_components/OauthButtons";
import { useRouter } from "next/navigation";

const Register: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!email) {
      newErrors.email = "Email is required.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    }
    if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      newErrors.email = "format: username@gmail.com";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (password && password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
    if (password && !/[A-Z]/.test(password)) {
      newErrors.password =
        "Password must include at least one uppercase letter.";
    }
    if (password && !/[!@#$%^&*]/.test(password)) {
      newErrors.password =
        "Password must include at least one special character.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      document.cookie = `userEmail=${email}; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
      postRegisterUser(email, password);
      router.push("sign-up/1");
    }
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
          <h2 className="poppins h-[60px] text-center text-[32px]">Sign Up</h2>
          <div className="mt-4 mb-6 flex justify-center space-x-4">
            {["0", "1", "2"].map((step) => (
              <div
                key={step}
                className={`h-4 w-4 rounded-full transition-all duration-300 ${
                  step === "0" ? "bg-white" : "bg-white/30"
                }`}
              ></div>
            ))}
          </div>
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
          {errors.email && <p className="mb-2 text-red-600">{errors.email}</p>}
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
          {errors.password && (
            <p className="mb-2 text-red-600">{errors.password}</p>
          )}
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
          {errors.confirmPassword && (
            <p className="mb-2 text-red-600">{errors.confirmPassword}</p>
          )}
          <button
            type="submit"
            className="my-6 h-10 w-full cursor-pointer rounded-[8px] bg-[#003465] hover:opacity-80"
          >
            Continue
          </button>
          <p className="text-center text-[12px]">or continue with</p>
          <OauthButtons />

          <p className="text-center">
            Have an account?
            <Link
              href="/sign-in"
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
