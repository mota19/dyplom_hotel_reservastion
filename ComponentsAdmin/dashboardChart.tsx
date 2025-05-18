"use client";
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

const data = [
  { name: "Jan", bookings: 30, sales: 4000 },
  { name: "Feb", bookings: 45, sales: 5000 },
  { name: "Mar", bookings: 60, sales: 7500 },
  { name: "Apr", bookings: 40, sales: 6200 },
  { name: "May", bookings: 70, sales: 8900 },
  { name: "Jun", bookings: 55, sales: 7000 },
];

const DashboardCharts: FC = () => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-8">
      <div className="h-80 rounded-xl bg-white p-8 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Sales per Month</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
