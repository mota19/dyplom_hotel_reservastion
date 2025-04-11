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

const ProfileOauthButtons: FC = () => {
  return (
    <div className="my-6 flex h-auto flex-wrap justify-between gap-[32px]">
      <button
        className="flex h-10 min-w-[200px] flex-1 cursor-pointer items-center justify-center rounded-[8px] bg-blue-200 hover:opacity-80"
        onClick={(e) => {
          e.preventDefault();
          signInWithGoogle();
        }}
      >
        <span className="mr-2">Sign in</span>
        <Image src={google} alt="google" width={16} height={16}></Image>
      </button>
      <button
        className="flex h-10 min-w-[200px] flex-1 cursor-pointer items-center justify-center rounded-[8px] bg-blue-200 hover:opacity-80"
        onClick={(e) => {
          e.preventDefault();
          signInWithDiscord();
        }}
      >
        <span className="mr-2">Sign in</span>
        <Image src={discord} alt="discord" width={16} height={16}></Image>
      </button>
      <button
        className="flex h-10 min-w-[200px] flex-1 cursor-pointer items-center justify-center rounded-[8px] bg-blue-200 hover:opacity-80"
        onClick={(e) => {
          e.preventDefault();
          signInWithFacebook();
        }}
      >
        <span className="mr-2">Sign in</span>
        <Image src={facebook} alt="facebook" width={16} height={16}></Image>
      </button>
    </div>
  );
};

export default ProfileOauthButtons;
