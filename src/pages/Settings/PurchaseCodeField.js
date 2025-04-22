import React from "react";
import { useGetAllSettingsQuery } from "../../store/api/GetAllGeneralSettings";
import Cookies from 'js-cookie'

function PurchaseCode() 
{
  const token = Cookies.get("token")
  const {data:SettingData,refetch} = useGetAllSettingsQuery({token:token})
  const PurchaseCode = SettingData?.setting_list
    return(
        <>
          <div className="border border-[#543691] border-opacity-15 rounded-lg px-8 py-6">
            <p className="text-[#000000] font-semibold text-base pb-2">Purchase Code(This is From Demo Account)</p>
            <input type="text" placeholder="" value={PurchaseCode?.purchase_code} readOnly
            className="border border-[#452B7A] border-opacity-10 font-poppins text-[#000000]  rounded-md w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-[#452B7A]"/>
                             
            {/* Deactive Button */}
            <div className="flex justify-center pt-14 place-items-center">
                <button className="px-24 py-3 font-medium text-white rounded-xl bg-[#FF3838]">
                   Deactive
                </button>
               </div>
          </div>
        </>
    )
}

export default PurchaseCode