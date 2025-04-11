"use client";
import { FC } from "react";
import ProfileOauthButtons from "./ProfileOuathButtons";

const ProfileSettings: FC = () => {
  return (
    <form className="mt-8 flex flex-col">
      <div className="mb-8 flex w-full flex-wrap gap-8">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Bohdan"
            className="h-12 rounded-[8px] bg-gray-200 px-2"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="firstName">Last Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Bohdan"
            className="h-12 rounded-[8px] bg-gray-200 px-2"
          />
        </div>
      </div>
      <div className="mb-8 flex w-full flex-wrap gap-8">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="firstName">Email</label>
          <input
            type="text"
            id="firstName"
            placeholder="Bohdan"
            className="h-12 rounded-[8px] bg-gray-200 px-2"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="firstName">Password</label>
          <input
            type="text"
            id="firstName"
            placeholder="Bohdan"
            className="h-12 rounded-[8px] bg-gray-200 px-2"
          />
        </div>
      </div>
      <div className="mb-8 flex w-full flex-wrap gap-8">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="firstName">Country</label>
          <input
            type="text"
            id="firstName"
            placeholder="Bohdan"
            className="h-12 rounded-[8px] bg-gray-200 px-2"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="firstName">Language</label>
          <input
            type="text"
            id="firstName"
            placeholder="Bohdan"
            className="h-12 rounded-[8px] bg-gray-200 px-2"
          />
        </div>
      </div>
      <h3 className="text-2xl font-[700]">Providers</h3>
      <ProfileOauthButtons />
    </form>
  );
};

export default ProfileSettings;
