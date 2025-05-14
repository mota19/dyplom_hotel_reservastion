"use client";
import { FC, useEffect, useState } from "react";
import ProfileOauthButtons from "./ProfileOuathButtons";
import { getAllInfoProfile, getCookie } from "../_supabase/apiUser";
import { User } from "@/types/supabaseTypes";

const ProfileSettings: FC = () => {
  const [formData, setFormData] = useState<User | null>({
    first_name: "",
    last_name: "",
    country: "",
    phone_number: "",
    nationality: "",
    birthday: "",
    role: "user",
    id: "",
    profile_image: "",
  });

  useEffect(() => {
    const userId = getCookie("userId");
    (async function getInfo() {
      if (userId) {
        const response = await getAllInfoProfile(userId);
        const user = response.data?.[0];
        if (user) {
          setFormData(user);
        }
      }
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleRoleChange = (role: "user" | "host") => {
    setFormData((prev) => (prev ? { ...prev, role } : prev));
  };

  if (!formData) return null;

  return (
    <form className="mt-8 flex flex-col">
      <div className="mb-8 flex w-full flex-wrap gap-8">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="First Name"
            className="h-12 rounded-[8px] bg-gray-200 px-2"
            value={formData.first_name ?? ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            className="h-12 rounded-[8px] bg-gray-200 px-2"
            value={formData.last_name ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-8 flex w-full flex-wrap gap-8">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Country"
            className="h-12 rounded-[8px] bg-gray-200 px-2"
            value={formData.country ?? ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="phone_number">Phone number</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            placeholder="Phone number"
            className="h-12 rounded-[8px] bg-gray-200 px-2"
            value={formData.phone_number ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-8 flex w-full flex-wrap gap-8">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="nationality">Nationality</label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            placeholder="Nationality"
            className="h-12 rounded-[8px] bg-gray-200 px-2"
            value={formData.nationality ?? ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="birthday">Birthday</label>
          <input
            type="text"
            id="birthday"
            name="birthday"
            placeholder="Birthday"
            className="h-12 rounded-[8px] bg-gray-200 px-2"
            value={formData.birthday ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-6 flex items-center justify-center gap-4">
        {["user", "host"].map((option) => (
          <label
            key={option}
            className={`w-full cursor-pointer rounded-lg border px-4 py-2 text-center text-sm font-medium transition-all duration-200 ${
              formData.role === option
                ? "border-transparent bg-[#003465] text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-[#003465]"
            }`}
          >
            <input
              type="radio"
              name="role"
              value={option}
              checked={formData.role === option}
              onChange={() => handleRoleChange(option as "user" | "host")}
              className="hidden"
            />
            {option === "user" ? "User" : "Host"}
          </label>
        ))}
      </div>

      <h3 className="text-2xl font-[700]">Providers</h3>
      <ProfileOauthButtons />
    </form>
  );
};

export default ProfileSettings;
