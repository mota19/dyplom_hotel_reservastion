import { FC } from "react";
import DashboardGeneralInfo from "./dahboardGeneralInfo";
import DashboardCharts from "./dashboardChart";
import StayDurationDonutChart from "./stayDurationColorChart";
import { IDashboarInfo } from "@/types/supabaseTypes";

const DashboardView: FC<{ data: IDashboarInfo }> = ({ data }) => {
  return (
    <div className="mb-8 space-y-10">
      <DashboardGeneralInfo data={data} />
      <DashboardCharts datas={data} />
      <StayDurationDonutChart data={data} />
    </div>
  );
};

export default DashboardView;
