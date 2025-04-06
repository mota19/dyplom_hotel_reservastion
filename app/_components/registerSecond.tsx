"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const RegisterSecond: FC = () => {
  // const [fisrtName, setFirstName] = useState<string>("");
  // const [lastName, setLastName] = useState<string>("");
  // const [birthday, setBirthday] = useState<Date>();
  // const [Country, setCountry] = useState<string>("");
  const router = useRouter();

  const handleClick = () => {
    router.push("2");
  };
  const { step } = useParams();

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
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
          }}
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
              />
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
              />
            </div>
          </div>
          <label htmlFor="fname" className="text-[16px]">
            Date of birthday
          </label>
          <input
            id="frame"
            type="date"
            className="mt-2 mb-2 h-[40px] w-full rounded-[8px] bg-white px-2 font-light text-gray-600"
            placeholder="ss"
          />
          <label htmlFor="fname" className="text-[16px]">
            Phone number
          </label>
          <input
            id="frame"
            type="password"
            className="mt-2 mb-2 h-[40px] w-full rounded-[8px] bg-white px-2 text-gray-600"
            placeholder="Phone number"
          />
          <label htmlFor="fname" className="text-[16px]">
            Country
          </label>
          <input
            id="frame"
            type="password"
            className="mt-2 mb-2 h-[40px] w-full rounded-[8px] bg-white px-2 text-gray-600"
            placeholder="Country"
          />
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
              onClick={handleClick}
            >
              Continue
            </button>
          </div>
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

export default RegisterSecond;
