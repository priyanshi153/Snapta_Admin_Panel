import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Cell } from "recharts";
import Cookies from 'js-cookie';
// import { useGetUsersByCountryQuery } from "../../../store/api/GetUserCountryWiseDashboard";
import { useGetCountryWiseUserQuery } from "../../store/api/CountryWiseUserDashboard";
import Loader from '../../assets/Loader.gif'
import { Link } from "react-router-dom";
import Add from '../../assets/add.png'
import Searchbar from '../../components/Search'

const COLORS = ["#46BFDA", "#3DD0B7", "#F3CC5C", "#59A7FF"];

function UsersByCountry() {
  const token = Cookies.get("token");
  const { data: countryData, isLoading } = useGetCountryWiseUserQuery({ token });

  const data = (countryData?.data?.map((item) => ({
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
    <div className="xl:pl-72 dark:bg-primary">
        <Searchbar />
         {/* Title */}
         <div className="flex justify-between border-t-[#F2F2F2] py-3 xl:px-6 2xl:px-6 px-4">
        <h2 className="text-[#000000] font-poppins text-xl font-semibold pt-3">Country Wise Users</h2>
      </div>

      {/* Navigation Path */}
      <div className="flex items-center justify-between px-4 xl:px-6">
        <div className="flex items-center gap-2">
          <Link to="/dashboard"><h3 className={`text-[#3A3A3A] font-poppins text-base font-semibold`}>Dashboard</h3></Link>
          <div className="rounded-full w-1 h-1 bg-[#E0E0E0]"></div>
          <h3 className="text-[#858585] font-poppins text-base">Country Wise Users</h3>
        </div>
      </div>

        
        
    <div className="border border-[#D1D5DB] p-4 rounded-lg bg-white dark:bg-primary mx-5 my-10">
      <div className="items-start gap-6 2xl:flex-row">

        <div className=" w-full h-[210px] mt-5">
          <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data} barCategoryGap={10} margin={{ top: 25, right: 50, left: 20, bottom: 25 }}>
              <XAxis type="number" hide />
              <Bar
                dataKey="users"
                background={{ fill: "#E5E7EB", radius: [10, 10, 10, 10] }}
                radius={[10, 10, 10, 10]}
                label={({ x, y, width, height, value, index }) => {
                  const country = data[index].country;
                  return (
                    <g>
                      <text x={x} y={y - 6} fontSize="14" fill="#4B5563" fontFamily="Poppins">
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
  x={x + width + 10}
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
    </div>
  );
}

export default UsersByCountry;
