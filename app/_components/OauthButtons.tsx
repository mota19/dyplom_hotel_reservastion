import { FC } from "react";
import Image from "next/image";
import google from "@/public/svg/flat-color-icons_google.svg";
import facebook from "@/public/svg/bi_facebook.svg";
import discord from "@/public/svg/discord-icon-svgrepo-com.svg";
import {
  signInWithDiscord,
  signInWithFacebook,
  signInWithGoogle,
} from "../_supabase/apiUser";

const OauthButtons: FC = () => {
  return (
    <div className="my-6 flex h-10 justify-between space-x-[16px]">
      <button
        className="flex flex-1 cursor-pointer items-center justify-center rounded-[8px] bg-white hover:opacity-80"
        onClick={(e) => {
          e.preventDefault();
          signInWithGoogle();
        }}
      >
        <Image src={google} alt="google" width={16} height={16}></Image>
      </button>
      <button
        className="flex flex-1 cursor-pointer items-center justify-center rounded-[8px] bg-white hover:opacity-80"
        onClick={(e) => {
          e.preventDefault();
          signInWithDiscord();
        }}
      >
        <Image src={discord} alt="discord" width={16} height={16}></Image>
      </button>
      <button
        className="flex flex-1 cursor-pointer items-center justify-center rounded-[8px] bg-white hover:opacity-80"
        onClick={(e) => {
          e.preventDefault();
          signInWithFacebook();
        }}
      >
        <Image src={facebook} alt="facebook" width={16} height={16}></Image>
      </button>
    </div>
  );
};

export default OauthButtons;
