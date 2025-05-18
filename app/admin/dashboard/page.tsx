import { FC } from "react";
import DashboardView from "@/ComponentsAdmin/dashboard";

const Dashboard: FC = () => {
  return (
    <>
      <div className="w-[1000px]">
        <h1 className="mb-4 text-[32px] font-bold">Dashboard</h1>
        <DashboardView />
      </div>
    </>
  );
};

export default Dashboard;
