"use client";
import { IDashboarInfo } from "@/types/supabaseTypes";
import { FC } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { transformData } from "./dashboardTransof";

const DashboardCharts: FC<{ datas: IDashboarInfo }> = ({ datas }) => {
  const dataChart = transformData(datas);

  return (
    <div className="mt-8 grid grid-cols-1 gap-8">
      <div className="h-80 rounded-xl bg-white p-8 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Sales per Month</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
