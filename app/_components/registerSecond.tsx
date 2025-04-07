"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const RegisterSecond: FC = () => {
  const [fisrtName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>();
  const [country, setCountry] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [errors, setErrors] = useState<{
    fisrtName?: string;
    lastName?: string;
    phoneNumber?: string;
    birthday?: string;
    country?: string;
  }>({});

  const router = useRouter();
  const { step } = useParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: {
      fisrtName?: string;
      lastName?: string;
      phoneNumber?: string;
      birthday?: string;
      country?: string;
    } = {};

    if (!fisrtName) {
      newErrors.fisrtName = "First name is required.";
    }
    if (!lastName) {
      newErrors.lastName = "Last name is required.";
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
    }
    if (!birthday) {
      newErrors.birthday = "Birthday is required.";
    }
    if (!country) {
      newErrors.country = "Country is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      router.push("2");
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
            {["0", "1", "2"].map((steps) => (
              <div
                key={steps}
                className={`h-4 w-4 rounded-full transition-all duration-300 ${
                  steps === step ? "bg-white" : "bg-white/30"
                }`}
              ></div>
            ))}
          </div>
          <div className="flex space-x-10">
            <div className="flex flex-col">
              <label htmlFor="fname" className="text-[16px]">
                First Name
              </label>
              <input
                id="frame"
                type="text"
                className="mt-2 mb-2 h-[40px] w-full rounded-[8px] bg-white px-2 text-gray-600"
                placeholder="John"
                value={fisrtName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFirstName(e.target.value)
                }
              />
              {errors.fisrtName && (
                <p className="mb-2 text-red-600">{errors.fisrtName}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="fname" className="text-[16px]">
                Last Name
              </label>
              <input
                id="frame"
                type="text"
                className="mt-2 mb-2 h-[40px] w-full rounded-[8px] bg-white px-2 text-gray-600"
                placeholder="Doe"
                value={lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLastName(e.target.value)
                }
              />
              {errors.lastName && (
                <p className="mb-2 text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>
          <label htmlFor="fname" className="text-[16px]">
            Date of birthday
          </label>
          <input
            id="frame"
            type="date"
            className="mt-2 mb-2 h-[40px] w-full rounded-[8px] bg-white px-2 font-light text-gray-600"
            value={birthday}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBirthday(e.target.value)
            }
          />
          {errors.birthday && (
            <p className="mb-2 text-red-600">{errors.birthday}</p>
          )}
          <label htmlFor="fname" className="text-[16px]">
            Phone number
          </label>
          <input
            id="frame"
            type="tel"
            className="mt-2 mb-2 h-[40px] w-full rounded-[8px] bg-white px-2 text-gray-600"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value)
            }
          />
          {errors.phoneNumber && (
            <p className="mb-2 text-red-600">{errors.phoneNumber}</p>
          )}
          <label htmlFor="fname" className="text-[16px]">
            Country
          </label>
          <input
            id="frame"
            type="text"
            className="mt-2 mb-2 h-[40px] w-full rounded-[8px] bg-white px-2 text-gray-600"
            placeholder="Country"
            value={country}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCountry(e.target.value)
            }
          />
          {errors.country && (
            <p className="mb-2 text-red-600">{errors.country}</p>
          )}
          <div className="flex flex-row space-x-10">
            <button
              className="my-6 h-10 w-full cursor-pointer rounded-[8px] bg-[#003465] hover:opacity-80"
              onClick={() => router.back()}
            >
              Previous
            </button>
            <button
              type="submit"
              className="my-6 h-10 w-full cursor-pointer rounded-[8px] bg-[#003465] hover:opacity-80"
            >
              Continue
            </button>
          </div>
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

export default RegisterSecond;
