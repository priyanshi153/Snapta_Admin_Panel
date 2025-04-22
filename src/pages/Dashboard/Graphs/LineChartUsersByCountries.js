import React from "react";
import World from '../../../assets/worldMap.png';
import { ResponsiveContainer, BarChart, Bar, XAxis, Cell } from "recharts";
import Cookies from 'js-cookie';
// import { useGetUsersByCountryQuery } from "../../../store/api/GetUserCountryWiseDashboard";
import { useGetCountryWiseUserQuery } from "../../../store/api/CountryWiseUserDashboard";
import Loader from '../../../assets/Loader.gif'
import {Link} from 'react-router-dom'

const COLORS = ["#46BFDA", "#3DD0B7", "#F3CC5C", "#59A7FF"];

function UsersByCountry() {
  const token = Cookies.get("token");
  const { data: countryData, isLoading } = useGetCountryWiseUserQuery({ token });

  const data = (countryData?.data?.slice(0,4).map((item) => ({
    country: item.country,
    users: item.total_users,
  })) || []).sort((a, b) => b.users - a.users);

   if (isLoading || !countryData) {
      return (
        <div className="border border-[#D1D5DB] rounded-lg p-4 w-full h-[440px] flex items-center justify-center">
          <img src={Loader} className="w-12 h-12" alt="Loading..." />
        </div>
      );
    }

  return (
    <div className="border border-[#D1D5DB] dark:bg-primary p-4 w-full rounded-lg bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#000000] font-poppins text-base font-semibold dark:text-darkText">Users by Countries</h2>
        <Link to="/country-wise-users"><a className="cursor-pointer text-[#484848] text-sm underline font-poppins">View All</a></Link>
      </div>

      <div className="flex flex-col items-start gap-6 2xl:flex-row">
        <img src={World} className="object-contain w-1/2 h-auto" alt="World Map" />

        <div className="2xl:w-1/2 w-full h-[210px] mt-5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              barCategoryGap={10}
              margin={{ top: 10, right: 50, left: 20, bottom: 10 }}
            >
              <XAxis type="number" hide />
              <Bar
                dataKey="users"
                background={{ fill: "#E5E7EB", radius: [10, 10, 10, 10] }}
                radius={[10, 10, 10, 10]}
                label={({ x, y, width, height, value, index }) => {
                  const country = data[index].country;
                  return (
                    <g>
                      <text x={x} y={y - 6} fontSize="12" fill="#4B5563" fontFamily="Poppins">
                        {country}
                      </text>
                
                      <circle
                        cx={x + width}
                        cy={y + height / 2}
                        r={6}
                        fill={COLORS[index % COLORS.length]}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                
                      <text
                        x={x + width + 20}
                        y={y + height / 2 + 4}
                        fontSize="12"
                        fill="#111827"
                        fontFamily="Poppins"
                        textAnchor="start"
                      >
                        {value}
                      </text>
                    </g>
                  );
                }}
                
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default UsersByCountry;
