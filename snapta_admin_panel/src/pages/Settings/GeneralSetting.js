import React, { useState,useEffect } from "react";
import Logo from '../../assets/logo.png'
import Cookies from 'js-cookie'
import useApiPost from "../hooks/postData";
import toast from "react-hot-toast";
import {useGetAllSettingsQuery} from '../../store/api/GetAllGeneralSettings'
import axios from 'axios'

function GeneralSetting() 
{
    const token = Cookies.get("token")
    const {data:SettingData,refetch} = useGetAllSettingsQuery({token:token})
    const {data,error,postData} = useApiPost()
    const SettingsData = SettingData?.setting_list
    console.log("Settings !!!",SettingsData)

    // handle Image Select from system 
  

      const handleImageSelect = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;
      
        const formDataToUpload = new FormData();
        formDataToUpload.append(type, file); // key name depends on the type (light_logo, etc.)
      
        const token = Cookies.get("token");
      
        try {
          const response = await axios.post("http://192.168.0.5:8002/api/update_settings", formDataToUpload, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
      
          const updatedData = response.data.setting_list;
      
          setFormData((prev) => ({
            ...prev,
            [type]: updatedData[type],
          }));
      
          toast.success("Image updated successfully");
      
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong");
        }
      };
    
    const [formData,setFormData] = useState({
        app_name: "",
        copyright_text:"",
        color_code:"",
        dark_logo:"",
        light_logo:"",
        fav_icon:"",
        banner_image:""
    })


    const handleSettingsUpdate = async () => {
        try {
          const response = await postData("/update_settings", formData);
            toast.success(response.message || "Settings updated!");
            refetch(); // Refetch new settings if needed
      
        } catch (err) {
          toast.error("Something went wrong");
          console.error(err);
        }
      };
      
    
    // Inside your component:
    const [fileNames, setFileNames] = useState({
        dark_logo: "No File Chosen",
        light_logo: "No File Chosen",
        fav_icon: "No File Chosen",
        banner_image: "No File Chosen",
      });
      
    useEffect(() => {
        if (SettingsData) {
          setFormData({
            app_name: SettingsData.app_name || "",
            copyright_text: SettingsData.copyright_text || "",
            color_code: SettingsData.color_code || "",
            dark_logo: SettingsData.dark_logo || "",
            light_logo: SettingsData.light_logo || "",
            fav_icon: SettingsData.fav_icon || "",
            banner_image: SettingsData.banner_image || "",
          });
      
          setFileNames({
            dark_logo: getFileName(SettingsData.dark_logo),
            light_logo: getFileName(SettingsData.light_logo),
            fav_icon: getFileName(SettingsData.fav_icon),
            banner_image: getFileName(SettingsData.banner_image),
          });
        }
      }, [SettingsData]);
      
      const getFileName = (url) => {
        return url ? url.split("/").pop() : "No File Chosen";
      };
      
      


console.log("Form Data @@@",formData)
    return(
        <>
         <div className="border border-opacity-gradient bg-[#FFFFFF] rounded-lg p-4">
            {/* Input Fields */}
            <div className="grid grid-cols-2 gap-4 pb-5">
                {/* App/Website Name =============== */}
                <div>
                    <label className="text-[#000000] font-poppins font-semibold text-sm">App/Website Name</label>
                    <input type="text" placeholder="Enter App/Website Name"
                     className="border border-opacity-gradient rounded-lg w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                     onChange={(e) => setFormData({ ...formData, app_name: e.target.value })}
                     value={formData.app_name}/>
                </div>
                
                {/* Contact Email ========= */}
                <div>
                    <label className="text-[#000000] font-poppins font-semibold text-sm">Contact Email</label>
                    <input type="text" placeholder="Enter Email"
                     className="border border-opacity-gradient rounded-lg w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value}) }/>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-5">
                {/* Dark Logo =============== */}
                <div>
                    <label className="text-[#000000] font-poppins font-semibold text-sm">Dark Logo</label>
                    <div className="relative">
                        <div style={{ background: "linear-gradient(213deg, rgba(108, 71, 183, 0.1) -27.59%, rgba(52, 31, 96, 0.1) 105.15%)"}} onClick={handleImageSelect}
                             className="absolute left-2 top-3 bottom-3 h-[32px] text-[#000000] font-poppins text-xs flex items-center justify-center px-3 cursor-pointer border-r border-header py-3 ">
                             Choose File
                        </div>
                        
                        <input type="text" placeholder={fileNames.dark_logo} className="border border-opacity-gradient rounded-lg w-full py-3 pl-[110px] my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header" 
                               style={{height: '48px'}}/>  
                        <img src={formData.dark_logo} className="w-10 h-10" />
                    </div>
                </div>
                
                {/* Light Logo ========= */}
                <div>
                    <label className="text-[#000000] font-poppins font-semibold text-sm">Light Logo</label>
                    <div className="relative">
                        <div style={{ background: "linear-gradient(213deg, rgba(108, 71, 183, 0.1) -27.59%, rgba(52, 31, 96, 0.1) 105.15%)"}} onClick={handleImageSelect}
                             className="absolute left-2 top-3 bottom-3 h-[32px] text-[#000000] font-poppins text-xs flex items-center justify-center px-3 cursor-pointer border-r border-header py-3 ">
                            Choose File
                        </div>
                        <input type="text" placeholder={fileNames.light_logo}
                               className="border border-opacity-gradient rounded-lg w-full py-3 pl-[110px] my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header" style={{height: '48px'}}  // Make sure both elements have the same height
                               />
                    </div>
                    <img src={formData.light_logo} className="w-10 h-10" />
                </div>
            </div>

            {/*  */}
            <div className="grid grid-cols-2">
                {/* Copyright Text */}
                <div>
                    <label className="text-[#000000] font-poppins font-semibold text-sm">Copyright Text</label>
                    <input type="text" placeholder="Enter Language Name"
                    className="border border-opacity-gradient rounded-lg w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                    value={formData.copyright_text}
                    onChange={(e) => setFormData({...formData,copyright_text:e.target.value})}/>
                </div>
            </div>
         </div>

         {/* App Color */}
         <div className="border border-opacity-gradient bg-[#FFFFFF] rounded-lg px-4 py-8 my-8">
            <h2 className="text-base font-semibold font-poppins text-header" style={{color:""}}>App Settings</h2>
            <p className="text-[#000000] text-sm font-semibold py-3 font-poppins">App Color</p>
            <div className="p-2 border border-opacity-gradient rounded-2xl">
                <div className="w-full py-2 rounded-2xl" style={{ backgroundColor: formData.color_code }}></div>

            </div>
         </div>

         {/* Logic Banner and Favicon */}
         <div className="border border-opacity-gradient bg-[#FFFFFF] rounded-lg px-4 py-6">
            <h2 className="text-base font-semibold text-header font-poppins">App Settings</h2>

            <div className="grid grid-cols-2 gap-4 py-4">
                {/* Logic Banner */}
                <div>
                    <label className="text-[#000000] font-poppins font-semibold text-sm">Logic Banner</label>
                    <div className="relative">
                        <div style={{ background: "linear-gradient(213deg, rgba(108, 71, 183, 0.1) -27.59%, rgba(52, 31, 96, 0.1) 105.15%)"}} onClick={handleImageSelect}
                             className="absolute left-2 top-3 bottom-3 h-[32px] text-[#000000] font-poppins text-xs flex items-center justify-center px-3 cursor-pointer border-r border-header py-3 ">
                                Choose File
                        </div>
                        
                        <input type="text" placeholder={fileNames.banner_image}
                         className="border border-opacity-gradient rounded-lg w-full py-3 pl-[110px] my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header" 
                         style={{height: '48px'}}  // Make sure both elements have the same height
                        />
                        <img src={formData.banner_image} className="w-10 h-10" />
                    </div>
                </div>

                {/* FavIcon */}
                <div>
                    <label className="text-[#000000] font-poppins font-semibold text-sm">Favicon</label>
                    <div className="relative">
                        <div style={{background: "linear-gradient(213deg, rgba(108, 71, 183, 0.1) -27.59%, rgba(52, 31, 96, 0.1) 105.15%)"}} onClick={handleImageSelect}
                            className="absolute left-2 top-3 bottom-3 h-[32px] text-[#000000] font-poppins text-xs flex items-center justify-center px-3 cursor-pointer border-r border-header py-3 ">
                                Choose File
                        </div>
                        <input type="text" placeholder={fileNames.fav_icon}
                         className="border border-opacity-gradient rounded-lg w-full py-3 pl-[110px] my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header" 
                         style={{height: '48px'}} /> 
                        <img src={formData.fav_icon} className="w-10 h-10" />
                    </div>
                </div>
            </div>
         </div>

         {/* Submit Button */}
         <div className="flex justify-center py-6 place-items-center">
            <button className="px-24 py-3 font-medium text-white rounded-xl bg-button-gradient"
            onClick={handleSettingsUpdate}>
                Submit
            </button>
         </div>
        </>
    )
}

export default GeneralSetting
















