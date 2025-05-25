"use client";
import { FC, useState, useEffect } from "react";
import DashboardView from "@/ComponentsAdmin/dashboard";
import { getCookie } from "@/app/_supabase/apiUser";
import { getDashboardInfo } from "@/app/_supabase/adminApi";
import { IDashboarInfo } from "@/types/supabaseTypes";

const defaultData: IDashboarInfo = {
  apartmentId: [],
  bookingDetails: [],
};

const Dashboard: FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const [data, setData] = useState<IDashboarInfo | undefined>();

  useEffect(() => {
    const id = getCookie("userId");
    async function getData() {
      if (id !== null) {
        const { dat } = await getDashboardInfo(
          id,
          selectedFilter === "All"
            ? "All"
            : (parseInt(selectedFilter) as 7 | 30 | 90),
        );
        console.log(dat);
        setData(dat);
      }
    }
    getData();
  }, [selectedFilter]);

  const filterOptions = ["7", "30", "90", "All"];

  return (
    <div className="w-[1000px]">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[32px] font-bold">Dashboard</h1>
        <div className="flex gap-2">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedFilter(option)}
              className={`rounded-md border px-4 py-1 text-sm font-medium ${
                selectedFilter === option
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              {option} days
            </button>
          ))}
        </div>
      </div>

      {/* Передаємо фільтр у DashboardView */}
      <DashboardView data={data ?? defaultData} />
    </div>
  );
};

export default Dashboard;
