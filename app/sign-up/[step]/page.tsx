"use client";
import { useParams } from "next/navigation";
import RegisterSecond from "@/app/_components/registerSecond";
import VerifyEmail from "@/app/_components/VerifyEmail";

const NextStepSignUp = () => {
  const { step } = useParams();

  return (
    <>
      {step === "1" && <RegisterSecond />}
      {step === "2" && <VerifyEmail />}
    </>
  );
};

export default NextStepSignUp;
