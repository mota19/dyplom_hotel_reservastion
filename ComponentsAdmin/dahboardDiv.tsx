import { FC } from "react";
import Image from "next/image";

const DashboardDiv: FC<{ text: string; icon: string; label: string }> = ({
  text,
  icon,
  label,
}) => {
  return (
    <div className="flex flex-1 items-center gap-4 rounded-xl bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
        <Image src={icon} width={24} height={24} alt={label} />
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-semibold text-gray-800">{text}</p>
      </div>
    </div>
  );
};

export default DashboardDiv;
