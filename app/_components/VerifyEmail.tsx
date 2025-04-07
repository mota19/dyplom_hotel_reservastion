"use client";
import { FC, useState, useRef, useEffect, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { resendEmailOtp, verifyEmailOtp } from "../supabase/apiUser";
import { useRouter } from "next/navigation";

const VerifyEmail: FC = () => {
  const { step } = useParams();

  const [code, setCode] = useState<string>("");
  const [timer, setTimer] = useState<number>(60);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const router = useRouter();

  useEffect(() => {
    const getEmailFromCookies = () => {
      const cookieArr = document.cookie.split("; ");
      for (let i = 0; i < cookieArr.length; i++) {
        const cookie = cookieArr[i].split("=");
        if (cookie[0] === "userEmail") {
          return cookie[1];
        }
      }
      return "";
    };

    const emailFromCookies = getEmailFromCookies();
    if (emailFromCookies) {
      setEmail(emailFromCookies);
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { error } = await verifyEmailOtp(email, code);

    if (!error) {
      router.push("/sign-in");
    } else {
      setError(true);
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const input = e.target;
    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    const newCode = [...code];
    if (/^[a-z]+$/.test(input.value)) {
      const uc = input.value.toUpperCase();
      newCode[index] = uc;
      inputRefs[index].current!.value = uc;
    } else {
      newCode[index] = input.value;
    }
    setCode(newCode.join(""));

    if (input.value === "" && previousInput) {
      previousInput.current!.focus();
    } else if (input.value !== "" && nextInput) {
      nextInput.current!.focus();
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    const input = e.target as HTMLInputElement;
    const previousInput = inputRefs[index - 1];

    if ((e.key === "Backspace" || e.key === "Delete") && input.value === "") {
      e.preventDefault();
      setCode(
        (prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1),
      );
      if (previousInput) {
        previousInput.current!.focus();
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedCode = e.clipboardData.getData("text");
    if (pastedCode.length === 6) {
      setCode(pastedCode);
      inputRefs.forEach((inputRef, index) => {
        inputRef.current!.value = pastedCode.charAt(index);
      });
    }
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (email) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [email]);

  function handleClickResend() {
    setTimer(100);
    startTimer();
    resendEmailOtp(email);
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
          <p className="text-center text-[16px]">
            Enter the verification code we sent to
            <br />
            <span className="text-center text-[16px] text-black">{email}</span>
          </p>
          <div className="flex flex-row gap-4">
            {Array(6)
              .fill("")
              .map((_, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength={1}
                  className="mt-2 mb-2 h-[100px] w-full rounded-[8px] bg-white px-2 text-center text-5xl text-gray-600"
                  placeholder={`${index + 1}`}
                  value={code[index] || ""}
                  onChange={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                />
              ))}
          </div>
          {error && (
            <p className="mb-2 text-center text-red-600">
              The verification code is incorrect. Please try again.
            </p>
          )}
          {timer > 0 && (
            <p className="text-center">
              Resend code in{" "}
              {timer >= 60
                ? `${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`
                : `00:${String(timer).padStart(2, "0")}`}
            </p>
          )}
          {timer === 0 && (
            <p className="text-center">
              <button
                onClick={handleClickResend}
                className="h-10 w-full cursor-pointer rounded-[8px] bg-[#003465] hover:opacity-80"
              >
                Resend code
              </button>
            </p>
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
              Sign Up
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

export default VerifyEmail;
