"use client";
import { FC, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const fullStayData = [
  { name: "2 nights", value: 30 },
  { name: "3 nights", value: 25 },
  { name: "4-5 nights", value: 20 },
  { name: "8-14 nights", value: 25 },
];

const stayOptions = ["All", "Short (2-3)", "Medium (4-5)", "Long (8-14)"];

const fullBookingsData = [
  { name: "Jan", bookings: 40 },
  { name: "Feb", bookings: 30 },
  { name: "Mar", bookings: 50 },
  { name: "Apr", bookings: 20 },
  { name: "May", bookings: 60 },
  { name: "Jun", bookings: 35 },
];

const COLORS = ["#fb923c", "#eab308", "#84cc16", "#14b8a6"];

const StayDurationDonutChart: FC = () => {
  const [stayFilter, setStayFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");

  const filteredStayData =
    stayFilter === "All"
      ? fullStayData
      : fullStayData.filter((item) => {
          if (stayFilter === "Short (2-3)")
            return item.name === "2 nights" || item.name === "3 nights";
          if (stayFilter === "Medium (4-5)") return item.name === "4-5 nights";
          if (stayFilter === "Long (8-14)") return item.name === "8-14 nights";
        });

  const filteredBookingsData =
    monthFilter === "All"
      ? fullBookingsData
      : fullBookingsData.filter((item) => item.name === monthFilter);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Donut Chart */}
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Stay duration summary
          </h2>
          <select
            value={stayFilter}
            onChange={(e) => setStayFilter(e.target.value)}
            className="rounded-md border-gray-300 text-sm"
          >
            {stayOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={filteredStayData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {filteredStayData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-gray-700">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="h-[400px] w-full rounded-xl bg-white p-8 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Bookings per Month
          </h2>
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="rounded-md border-gray-300 text-sm"
          >
            <option value="All">All</option>
            {fullBookingsData.map((month) => (
              <option key={month.name} value={month.name}>
                {month.name}
              </option>
            ))}
          </select>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredBookingsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StayDurationDonutChart;
