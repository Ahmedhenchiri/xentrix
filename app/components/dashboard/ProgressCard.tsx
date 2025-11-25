import DonutChart from "./DonutChart";

interface ProgressCardProps {
  title: string;
  percent: number;
  linkText?: string;
}

export default function ProgressCard({ title, percent, linkText = "View More" }: ProgressCardProps) {
  const completed = percent;
  const remaining = 100 - percent;

  return (
    <div className="shadow-md bg-white p-6 rounded-xl space-y-6">
      <div className="flex justify-between border-b border-gray-400 pb-4 items-center">
        <h3 className="font-bold  font-workSans text-[18px] text-[#151B38]">{title}</h3>
        <a className="text-[#27C499] font-semibold font-workSans text-[16px] underline cursor-pointer">{linkText}</a>
      </div>

      <div className="flex flex-row lg:flex-col items-center gap-6">
        <DonutChart percent={percent} />

        <div className="text-[16px] space-y-3  gap-25 flex ">
          <p className="font-medium flex items-center gap-3 text-[#151B38] mt-3">
            <span className="bg-gray-800 w-3 h-3 block rounded-full"></span>
            {completed}% Completed
          </p>

          <p className="font-medium flex items-center gap-3 text-[#151B38]">
            <span className="bg-[#14B58B] w-3 h-3 block rounded-full"></span>
            {remaining}% Remaining
          </p>
        </div>
      </div>
    </div>
  );
}
