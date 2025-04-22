import React from "react";
import { ResponsiveContainer, Pie, PieChart, Cell, Label, LabelList } from "recharts";
import { useGetPlatformQuery } from "../../../store/api/PlatformDashboard";
import Cookies from 'js-cookie'
import Loader from '../../../assets/Loader.gif'

function PlatformActivity() {

  const COLORS = ["#29CCB1", "#34B3F1"];
  const token = Cookies.get("token")
  const {data:PlatformData,isLoading} = useGetPlatformQuery({token:token})

  console.log("Platform !!",PlatformData)

  const data = PlatformData ? [
    { name: "Login by Website", value:PlatformData?.total_website_platform, percent:PlatformData?.website_percentage},
    { name: "Login by Mobile", value:PlatformData?.total_mobile_platform, percent:PlatformData?.mobile_percentage}
  ] : [];

   if (isLoading || !PlatformData) {
      return (
        <div className="border border-[#D1D5DB] rounded-lg p-4 w-[60%] h-[440px] flex items-center justify-center">
          <img src={Loader} className="w-12 h-12" alt="Loading..." />
        </div>
      );
    }

  return (
    <>
      <div className="border border-[#D1D5DB] p-4 2xl:w-[60%] rounded-lg">
        {/* Title */}
        <h2 className="text-[#000000] font-poppins text-base font-semibold dark:text-darkText">
          Platform Activity
        </h2>

        {/* Semi-circle Pie Chart */}
        <div className="relative flex">
        <ResponsiveContainer height={240} width="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="90%" // Moves it slightly higher to avoid label cut off
              startAngle={180}
              endAngle={0}
              innerRadius={80}
              outerRadius={100}
              dataKey="value"
              paddingAngle={2}
              label={({ percent }) => `${percent}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}

              {/* Percentage Labels on Arcs */}
              <LabelList
                dataKey="percent"
                position="outside"
                fill="#484848"
                style={{ fontSize: 12, fontFamily: "Poppins" }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute text-center transform -translate-x-1/2 bottom-7 left-1/2">
          <h2 className="text-[#000000] text-xl font-semibold font-poppins dark:text-darkText">100%</h2>
          <p className="text-[#000000] text-sm font-medium font-poppins dark:text-gray-500">Completed</p>
        </div>
        </div>
        
        {/* Custom Legend */}
        <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
          {data.map((entry, index) => (
            <div
              key={index}
              style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  backgroundColor: COLORS[index],
                  marginTop: 4,
                }}
              />
              <div className="flex flex-col items-start">
                <span className="font-poppins text-[#727272] text-sm">
                  {entry.name}
                </span>
                <span className="text-[#484848] font-poppins text-sm">
                  {entry.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PlatformActivity;
