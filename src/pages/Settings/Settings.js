import React, { useState } from "react";
import Searchbar from "../../components/Search";
import Search from '../../assets/search.png'
import { Link } from "react-router-dom";
import General from '../../assets/setting.png'
import sms from '../../assets/smsSetting.png'
import mail from '../../assets/messageSetting.png'
import purchase from '../../assets/key.png'
import General1 from '../../assets/setting1.png'
import sms1 from '../../assets/smsSetting1.png'
import mail1 from '../../assets/messageSetting1.png'
import purchase1 from '../../assets/key1.png'
import GeneralSetting from "./GeneralSetting";
import SMSConfiguration from './SMSConfiguration'
import MailSetup from "./MailSetup";
import PurchaseCode from "./PurchaseCodeField";

function Settings() 
{
    const [option,setOption] = useState("General");
    return(
        <>
         <div className="xl:pl-72 ">
            <Searchbar />

            <div className="flex justify-between border-[#F2F2F2] py-3 xl:px-6 2xl:px-6 px-4">
                <h2 className="text-[#000000] font-poppins text-xl font-semibold pt-3">Settings</h2>
                <div className="relative">
                    <div className="absolute flex items-center p-2 transform -translate-y-1/2 left-2 top-1/2">
                      <img src={Search} alt="Search" className="w-5 h-5" />
                    </div>

                    {/* <input type="text" className="border border-gray-500 bg-[#00000005] border-opacity-10 rounded-lg w-[250px] py-2 pl-12 placeholder:text-sm placeholder:text-[#0000004F] focus:outline-none focus:ring-1 focus:ring-gray-600"
                     placeholder="Search Title"/> */}
                </div>
            </div>
            
            {/* Navigation Path */}
            <div className="flex items-center justify-between px-4 xl:px-6">
                <div className="flex items-center gap-2">
                    <Link to="/dashboard"><h3 className="text-[#3A3A3A] font-poppins text-base font-semibold">Dashboard</h3></Link>
                    <div className="rounded-full w-1 h-1 bg-[#E0E0E0]"></div>
                    <h3 className="text-[#858585] font-poppins text-base">Settings</h3>
                </div>
            </div>

            {/* Main board */}
            <div className="border border-[#E3E3E3] h-fit mx-6 my-6 rounded-lg px-6 py-6">
                {/* Outer div */}
                <div className="flex gap-14">

                    {/* Option Buttons */}
                    <div className="flex flex-col gap-4">
                        {/* General Setting ================================== */}
                        <button className={`flex px-4 gap-2 w-[320px] py-3.5 2xl:py- rounded-xl 
                        ${option === "General" ? "bg-button-gradient" : "border border-opacity-gradient"}`}
                        onClick={() => setOption("General")}>
                            <img src={option === "General" ? General : General1} className="w-5 h-5"/>
                            <p className={`font-poppins text-sm font-normal ${option === "General" ? "text-[#FFFFFF]" : "text-[#000000]"}`}>General Settings</p>
                        </button>

                        {/* SMS Configuration Button =============================*/}
                        <button className={`font-poppins text-sm flex text-left font-normal px-4 gap-2 w-[320px] py-3.5 rounded-xl
                        ${option === "SMS" ? "bg-button-gradient" : "border border-opacity-gradient"}`}
                       
                        onClick={() => setOption("SMS")}>
                            <img src={option === "SMS" ? mail1 : mail} className="w-5 h-5"/>
                            <p className={`font-poppins text-sm font-normal ${option === "SMS" ? "text-[#FFFFFF]" : "text-[#000000]"}`}>SMS Configuration</p>
                        </button>

                        {/* Mail Setup ==================================*/}
                        <button className={`font-poppins text-sm flex text-left font-normal px-4 gap-2 w-[320px] py-3.5 rounded-xl
                        ${option === "Mail" ? "bg-button-gradient" : "border border-opacity-gradient"}`}
                        onClick={() => setOption("Mail")}>
                            <img src={option === "Mail" ? sms1 : sms} className="w-5 h-5"/>
                            <p className={`font-poppins text-sm font-normal ${option === "Mail" ? "text-[#FFFFFF]" : "text-[#000000]"}`}>Mail Setup</p>
                        </button>

                        {/* Purchase Code Field =========================== */}
                        <button className={`flex px-4 gap-2 w-[320px] py-3.5 rounded-xl
                        ${option === "Purchase" ? "bg-button-gradient" : "border border-opacity-gradient bg-[#FFFFFF]"}`}
                        
                        onClick={() => setOption("Purchase")}>
                            <img src={option === "Purchase" ? purchase1 : purchase} className="w-5 h-5"/>
                            <p className={`font-poppins text-sm font-normal ${option === "Purchase" ? "text-[#FFFFFF]" : "text-[#000000]"}`}>Purchase Code Field</p>
                        </button>
                    </div>

                    {/* Pages  */}
                    <div className="w-full">
                        
                    {option === "General" && 
                    <GeneralSetting />}

                    {option === "SMS" && 
                    <SMSConfiguration />}

                    {option === "Mail" && 
                    <MailSetup />}

                    {option === "Purchase" && 
                    <PurchaseCode />}

                    </div>
                    
                </div>
            </div>
         </div>
        </>
    )
}

export default Settings;