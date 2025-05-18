import { FC } from "react";
import DashboardGeneralInfo from "./dahboardGeneralInfo";
import DashboardCharts from "./dashboardChart";
import StayDurationDonutChart from "./stayDurationColorChart";

const DashboardView: FC = () => {
  return (
    <div className="mb-8 space-y-10">
      <DashboardGeneralInfo />
      <DashboardCharts />
      <StayDurationDonutChart />
    </div>
  );
};

export default DashboardView;
