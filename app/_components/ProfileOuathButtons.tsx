"use client";
import { FC } from "react";
import Image from "next/image";
import google from "@/public/svg/flat-color-icons_google.svg";
import facebook from "@/public/svg/bi_facebook.svg";
import discord from "@/public/svg/discord-icon-svgrepo-com.svg";
import {
  signInWithDiscord,
  signInWithFacebook,
  signInWithGoogle,
  signOut,
} from "../_supabase/apiUser";
import { useAppSelector } from "@/redux/hooks/hooks";

const ProfileOauthButtons: FC = () => {
  const googleAuth = useAppSelector((state) => state.userProvider.google);
  const discordAuth = useAppSelector((state) => state.userProvider.discord);
  const facebookAuth = useAppSelector((state) => state.userProvider.facebook);

  return (
    <div className="my-6 flex h-auto flex-wrap justify-between gap-[32px]">
      {/* Google */}
      <button
        className="flex h-10 min-w-[200px] flex-1 cursor-pointer items-center justify-center rounded-[8px] bg-blue-200 hover:opacity-80"
        onClick={(e) => {
          e.preventDefault();
          if (googleAuth) {
            signOut();
            window.location.reload();
          } else {
            signInWithGoogle();
          }
        }}
      >
        <span className="mr-2">{googleAuth ? "Log out" : "Sign in"}</span>
        <Image src={google} alt="google" width={16} height={16} />
      </button>

      {/* Discord */}
      <button
        className="flex h-10 min-w-[200px] flex-1 cursor-pointer items-center justify-center rounded-[8px] bg-blue-200 hover:opacity-80"
        onClick={(e) => {
          e.preventDefault();
          if (discordAuth) {
            signOut();
            window.location.reload();
          } else {
            signInWithDiscord();
          }
        }}
      >
        <span className="mr-2">{discordAuth ? "Log out" : "Sign in"}</span>
        <Image src={discord} alt="discord" width={16} height={16} />
      </button>

      {/* Facebook */}
      <button
        className="flex h-10 min-w-[200px] flex-1 cursor-pointer items-center justify-center rounded-[8px] bg-blue-200 hover:opacity-80"
        onClick={(e) => {
          e.preventDefault();
          if (facebookAuth) {
            signOut();
            window.location.reload();
          } else {
            signInWithFacebook();
          }
        }}
      >
        <span className="mr-2">{facebookAuth ? "Log out" : "Sign in"}</span>
        <Image src={facebook} alt="facebook" width={16} height={16} />
      </button>
    </div>
  );
};

export default ProfileOauthButtons;
