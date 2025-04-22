import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Calendar from "../../../assets/bar_calendar.png";
import ArrowDown from "../../../assets/bar_arrow.png";
import { useGetGrowthQuery } from "../../../store/api/GetUserByMonthDashboard";
import Cookies from 'js-cookie'
import Loader from '../../../assets/Loader.gif'
import { useTheme } from "../../../context/ThemeProvider";

function BarGraph() {

  const token = Cookies.get("token")
  const {data:BarData,isLoading} = useGetGrowthQuery({token:token})

  console.log("Data !!!",BarData)
  const theme = useTheme().theme
  console.log("Theme !!!",theme)

  const rawData = [
    { name: "Jan", value: 7500 },
    { name: "Feb", value: 6000 },
    { name: "Mar", value: 8000 },
    { name: "Apr", value: 3500 },
    { name: "May", value: 7000 },
    { name: "Jun", value: 6500 },
    { name: "Jul", value: 8500 },
    { name: "Aug", value: 7000 },
    { name: "Sep", value: 9000 },
    { name: "Oct", value: 7600 },
    { name: "Nov", value: 8800 },
    { name: "Dec", value: 9700 },
  ];


  // Add a remaining part and custom color
  // const data = rawData.map((d) => ({
  //   name: d.name,
  //   value: d.value,
  //   remaining: max - d.value,
  //   color: d.name === "Apr" ? "#00C49F" : "#59A7FF",
  // }));
  const max = 20
  const monthMap = {
    January: "Jan",
    February: "Feb",
    March: "Mar",
    April: "Apr",
    May: "May",
    June: "Jun",
    July: "Jul",
    August: "Aug",
    September: "Sep",
    October: "Oct",
    November: "Nov",
    December: "Dec",
  };
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  console.log("Month !!",currentMonth)
  const data = BarData?.data?.map((d) => ({
    name: monthMap[d.month] || d.month, // convert to short form
    value: d.total,
    remaining: max - d.total,
    color: d.month === currentMonth ? "#00C49F" : "#59A7FF",
  }));

  if (isLoading || !BarData) {
    return (
      <div className="border border-[#D1D5DB] rounded-lg p-4 w-full h-[440px] flex items-center justify-center">
        <img src={Loader} className="w-12 h-12" alt="Loading..." />
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
      // Only show the actual value, not "remaining"
      const valueData = payload.find(p => p.dataKey === "value");
      return (
        <div className="px-3 py-2 bg-white border border-gray-200 rounded shadow-sm">
          <p className="text-sm text-gray-700 font-poppins">{label}</p>
          <p className="text-sm font-semibold text-black font-poppins">Users: {valueData?.value}</p>
        </div>
      );
    }
  
    return null;
  };
  
  
  return (
    <div className="border border-[#D1D5DB] dark:border-[#1F1F1F] rounded-lg p-4 w-fit">
      <div className="flex justify-between ">
        <h2 className="text-[#000000] font-poppins text-base font-semibold dark:text-darkText">
          User Growth Summary Graph
        </h2>
         <div className="flex items-center gap-2">
                        <img src={Calendar} className="w-5 h-5" />
                        <div className="flex items-center gap-2">
                            <h2 className="font-poppins text-[#8C8C8C] text-base font-medium">2025</h2>
                            <img src={ArrowDown} className="w-4 h-4 cursor-pointer" />
                        </div>
                       </div>
      </div>
      <p className="text-[#737373] font-poppins text-sm pb-12">
        Revealing risk and growth in investment
      </p>

      <ResponsiveContainer width={1020} height={350}>
        <BarChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="name" />
          <YAxis domain={[0, max]} axisLine={false} />
          {/* Tooltip for hover */}
         

<Tooltip
  content={<CustomTooltip />}
  cursor={{ fill: "rgba(0, 0, 0, 0)" }}
/>


          {/* 1. Foreground actual value (at bottom) */}
          <Bar
            dataKey="value"
            stackId="a"
            barSize={20}
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>

          {/* 2. Remaining gray bar (on top) */}
          <Bar
            dataKey="remaining"
            stackId="a"
            // fill="#F0F0F0"
            fill={theme === 'dark' ? '#333333' : '#F0F0F0'}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default BarGraph;
