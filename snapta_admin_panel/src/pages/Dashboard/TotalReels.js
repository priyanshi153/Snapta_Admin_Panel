import React from "react";
import Arrow from '../../assets/GrowArrow.png'
import ArrowDecrease from '../../assets/GrowArrowBrown.png'
import Cookies from 'js-cookie'
import { useGetAllTotalQuery } from "../../store/api/AllTotalDashboard";

function TotalReels() 
{
    const token = Cookies.get("token")
    const {data:TotalData,isLoading} = useGetAllTotalQuery({token:token || ""})
    console.log("Total !!",TotalData)

    const ReelRatio = TotalData?.post_last_month
    
    return(
        <>
         

         <div className="border border-[#D1D5DB] dark:border-[#1F1F1F] rounded-lg px-4 py-5">
                     <div className="flex justify-between py-1">
                         <h2 className="font-poppins text-[#000000] font-semibold text-base dark:text-gray-500">Total Reels</h2>
                         
                         <h2 className={` ${ReelRatio < 0 ? "text-[#EE6D3D] bg-[#FCECD6]" : "text-[#22973F] bg-[#D1F9DB]"} px-5 py-0.5 rounded-2xl font-medium flex gap-1 place-items-center`}>
                    {TotalData?.reel_last_month}
                    <span className="pt-0.5">
                        {ReelRatio < 0 ? <svg stroke="currentColor" fill="#EE6D3D" stroke-width="0" viewBox="0 0 256 256" class="size-3" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M244,128v64a12,12,0,0,1-12,12H168a12,12,0,0,1,0-24h35l-67-67-31.51,31.52a12,12,0,0,1-17,0l-72-72a12,12,0,0,1,17-17L96,119l31.51-31.52a12,12,0,0,1,17,0L220,163V128a12,12,0,0,1,24,0Z"></path></svg>
                         : <svg stroke="currentColor" fill="#22973F" stroke-width="0" viewBox="0 0 256 256" class="size-3" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M244,56v64a12,12,0,0,1-24,0V85l-75.51,75.52a12,12,0,0,1-17,0L96,129,32.49,192.49a12,12,0,0,1-17-17l72-72a12,12,0,0,1,17,0L136,135l67-67H168a12,12,0,0,1,0-24h64A12,12,0,0,1,244,56Z"></path></svg>}
                    </span>
                </h2>
                     </div>
         
                     <h1 className="text-[#000000] font-poppins text-2xl font-semibold dark:text-darkText">{TotalData?.total_reel}</h1>
                     <p className="text-[#9B9B9B] font-poppins text-sm py-1">vs last month: <span className="text-[#000000] font-semibold text-sm dark:text-gray-500">{TotalData?.reel_permonth}</span></p>
                  </div>
        </>
    )
}

export default TotalReels