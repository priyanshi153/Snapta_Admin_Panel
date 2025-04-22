import React, { useState,useEffect } from 'react'
import Name from '../../assets/name.png'
import Mobile from '../../assets/mobile.png'
import Calendar from '../../assets/calendar.png'
import Profile1 from '../../assets/Profile.png'
import Plus from '../../assets/Plus.png'
import useApiPost from '../hooks/postData'
// import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import toast from 'react-hot-toast'
import { useGetDetailsQuery } from '../../store/api/GetProfileDetails'
import Cookies from 'js-cookie'
import axios from 'axios'
import { CiUser } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { PiCalendarDotsLight } from "react-icons/pi";
import { PiPhoneLight } from "react-icons/pi";

function ProfileDetails() 
{
  const{data,error,postData} = useApiPost()
  const [startDate, setStartDate] = useState(null);
  const [formData,setFormData] = useState({
    profile_pic:"",
    first_name:"",
    last_name:"",
    email:"",
    mobile:"",
    dob:"",
    gender:""
  })

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formDataToUpload = new FormData();
    formDataToUpload.append("profile_pic", file);
  
    const token = Cookies.get("token"); 
  
    try {
      const response = await axios.post("http://192.168.0.5:8002/api/user_profile", formDataToUpload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
        setFormData((prev) => ({
          ...prev,
          profile_pic: response.data.user_data.profile_pic,
        }));
   
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong")
    }
  };
  
  
  console.log("Form Data !!!",formData)

  const token = Cookies.get("token")
  const {data:ProfileData,refetch} = useGetDetailsQuery({token:token})
  const Data = ProfileData?.user_data
  console.log("User Details !!!",Data)
  
  const handleEditProfile = async () => {
    try {
      const formDataToUpload = new FormData();
      formDataToUpload.append("first_name", formData.first_name);
      formDataToUpload.append("last_name", formData.last_name);
      formDataToUpload.append("email", formData.email);
      formDataToUpload.append("mobile", formData.mobile);
      formDataToUpload.append("dob", formData.dob);
      formDataToUpload.append("gender", formData.gender);
  
      // Only append a new profile pic if it's a File object
      if (formData.profile_pic instanceof File) {
        formDataToUpload.append("profile_pic", formData.profile_pic);
      }
  
      const response = await axios.post("http://192.168.0.5:8002/api/user_profile",formDataToUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      toast.success("Profile updated successfully");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  
  // Set the dob 
  useEffect(() => {
    if (formData.dob) {
      setStartDate(new Date(formData.dob)); // Must convert string to Date object
    }
  }, [formData.dob]);
  
  
  
  console.log("Form Data !!!@",formData)

  useEffect(() => {
    if(Data) {
      setFormData({
        profile_pic:Data.profile_pic || "",
        first_name: Data.first_name || "",
        last_name: Data.last_name || "",
        email: Data.email || "",
        mobile: Data.mobile || "",
        dob: Data.dob || "",
        gender: Data.gender || ""
      })
    }
  },[Data])

  console.log("Start Date !!!",startDate)

    return(
        <>
          <div className='flex justify-center'>
            <div className='w-[1000px]'>
              {/* Profile Image */}
                          <div className="flex items-center justify-center w-full py-4">
                            <div className="shadow-[9.3px_10.46px_64.96px_0px_rgba(0,0,0,0.2)] px-1 py-1 rounded-full">
                            <div className="relative flex items-center justify-center w-28 h-28">
                              {/* User Image */}
                              <img src={formData.profile_pic}  alt="User" className="absolute inset-0 m-auto rounded-full w-28 h-28"/>
                              <img
  src={Plus}
  alt="plus"
  className="absolute bottom-0 right-0 cursor-pointer w-7 h-7"
  onClick={() => document.getElementById("profilePicInput").click()}
/>
<input
  type="file"
  accept="image/*"
  id="profilePicInput"
  className="hidden"
  onChange={handleProfilePicChange}
/>

                            </div>
                            </div>
                          </div>

                          
              
                          {/* Name */}
                          <h2 className='flex justify-center pb-3 text-base font-semibold font-poppins'>{formData.first_name} {formData.last_name}</h2>
                 <div className='grid grid-cols-2 gap-10 px-10 py-4'>
                
                            {/* First Name */}
                           <div className="relative flex flex-col">
                            <label className="text-[#000000] font-poppins text-sm">First Name<span className='text-sm text-red-600'>*</span></label>
                            <div className="relative">
                            <div className="absolute flex items-center justify-center p-3 transform -translate-y-1/2 rounded-lg bg-opacityGradient left-2 top-1/2"
                                >
                              {/* <img src={Name} alt="User" className="w-5 h-5"/> */}
                              <CiUser className='w-5 h-5 text-sidebarText' />
                      {/* {item.icon && <item.icon className={`w-5 h-5 ${isActive ? "text-sidebarText" : "text-gray-500"}`} />} */}

                            </div>
                            <input type="text" className="border border-[#452B7A] border-opacity-10 rounded-lg w-full py-4 my-1 pl-16 placeholder:font-poppins placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-[#452B7A]"
                              placeholder="Enter First Name"
                              required
                              autoComplete = "off"
                              autoCorrect="off"
                              spellCheck="false"
                              value={formData.first_name}
                              onChange={(e) => setFormData({...formData,first_name:e.target.value})}/>
                            </div>
                          </div>
                
                          {/* Last Name */}
                          <div className="relative flex flex-col">
                            <label className="text-[#000000] font-poppins text-sm">Last Name<span className='text-sm text-red-600'>*</span></label>
                            <div className="relative">
                            <div className="absolute flex items-center justify-center p-3 transform -translate-y-1/2 rounded-lg bg-opacityGradient left-2 top-1/2">
                            {/* style={{background:' linear-gradient(213deg, rgba(108, 71, 183, 0.1) -27.59%, rgba(52, 31, 96, 0.1) 105.15%)'}} */}
                              {/* <img src={Name} alt="User" className="w-5 h-5"/> */}
                              <CiUser className='w-5 h-5 text-sidebarText' />

                            </div>
                            <input type="text" className="border border-[#452B7A] border-opacity-10 rounded-lg w-full py-4 my-1 pl-16 placeholder:font-poppins placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-[#452B7A]"
                              placeholder="Enter Last Name"
                              required
                              autoComplete = "off"
                              autoCorrect="off"
                              spellCheck="false"
                              value={formData.last_name}
                              onChange={(e) => setFormData({...formData,last_name:e.target.value})}/>
                            </div>
                          </div>
                            
                          </div>
                
                          {/* 2nd row */}
                          <div className='grid grid-cols-2 gap-10 px-10 pb-4'>
                            {/* Email */}
                          <div className="relative flex flex-col">
                            <label className="text-[#000000] font-poppins text-sm">Email<span className='text-sm text-red-600'>*</span></label>
                            <div className="relative">
                            <div className="absolute flex items-center justify-center p-3 transform -translate-y-1/2 rounded-lg bg-opacityGradient left-2 top-1/2">
                            {/* // style={{background:' linear-gradient(213deg, rgba(108, 71, 183, 0.1) -27.59%, rgba(52, 31, 96, 0.1) 105.15%)'}}> */}
                              {/* <img src={Name} alt="User" className="w-5 h-5"/> */}
                              <CiUser className='w-5 h-5 text-sidebarText' />
                              
                            </div>
                            <input type="text" className="border border-[#452B7A] border-opacity-10 rounded-lg w-full py-4 my-1 pl-16 placeholder:font-poppins placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-[#452B7A]"
                              placeholder="Enter Email"
                              required
                              autoComplete = "off"
                              autoCorrect="off"
                              spellCheck="false"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData,email:e.target.value})}/>
                            </div>
                          </div>
                
                          {/* Mobile Number */}
                          <div className="relative flex flex-col">
                            <label className="text-[#000000] font-poppins text-sm">Mobile Number<span className='text-sm text-red-600'>*</span></label>
                            <div className="relative">
                            <div className="absolute flex items-center justify-center p-3 transform -translate-y-1/2 rounded-lg bg-opacityGradient left-2 top-1/2">
                            {/* // style={{background:' linear-gradient(213deg, rgba(108, 71, 183, 0.1) -27.59%, rgba(52, 31, 96, 0.1) 105.15%)'}}> */}
                              {/* <img src={Mobile} alt="User" className="w-5 h-5"/> */}
                              <PiPhoneLight className='w-5 h-5 text-sidebarText' />
                              
                            </div>
                            <input type="text" className="border border-[#452B7A] border-opacity-10 rounded-lg w-full py-4 my-1 pl-16 placeholder:font-poppins placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-[#452B7A]"
                              placeholder="Enter Mobile Number"
                              required
                              autoComplete = "off"
                              autoCorrect="off"
                              spellCheck="false"
                              value={formData.mobile}
                              onChange={(e) => setFormData({...formData,mobile:e.target.value})}/>
                            </div>
                          </div>
                          </div>
                
                          {/* 3rd row */}
                          <div className='grid grid-cols-2 gap-10 px-10'>
                            {/* DOB */}
                            <div className="relative flex flex-col">
                              <label className="text-[#000000] font-poppins text-sm text-left">Date Of Birth</label>
                              {/* Hidden Input Field for DatePicker */}
                              <div className='relative'>
                                <div className="absolute z-10 flex items-center justify-center p-3 transform -translate-y-1/2 rounded-lg bg-opacityGradient left-2 top-1/2">
                                    {/* //  style={{ background: "linear-gradient(213deg, rgba(108, 71, 183, 0.1) -27.59%, rgba(52, 31, 96, 0.1) 105.15%)",}} */}
                                  {/* <img src={Calendar} alt="Calendar Icon" className="w-5 h-5" /> */}
                                  <PiCalendarDotsLight className='w-5 h-5 text-sidebarText'/>
                                </div>
                                
                                <DatePicker selected={startDate} onChange={(date) => { if (date) { setStartDate(date);
                                // Convert to "YYYY-MM-DD" format before updating formData
                               
                                const formattedDate = date.toISOString().split("T")[0];
                                 setFormData((formData) => ({ ...formData, dob: formattedDate,}));}}}
                                  dateFormat="dd/MM/yyyy"
                                  placeholderText="DD/MM/YYYY"
                                  className="custom-datepicker-input border 2xl:w-[438px] border-[#452B7A] placeholder:text-[#000000] border-opacity-10 pl-16 rounded-lg w-full py-3 my-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#452B7A]"/></div>
                            </div>
                
                            {/* Gender */}
                            <div>
                              <label className="text-[#000000] font-poppins text-sm">Gender<span className='text-red-600'>*</span></label>
                              <div className="flex py-2 space-x-6">
                           
                            {["Male", "Female"].map((option) => (
                              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="gender" className="custom-radio" value={option} checked={formData.gender === option}
                                 onChange={(e) => setFormData({ ...formData, gender: e.target.value })}/>
                                 <span className="text-gray-700">{option}</span>
                              </label>
                            ))}
                          </div>
                          </div>
                          </div>
                
                          {/* Submit Button */}
                          <div className='flex justify-center py-8 '>
                          <button className='text-base font-poppins text-[#FFFFFF] px-16 py-2 rounded-lg bg-button-gradient'
                          //  style={{ background: "linear-gradient(213deg, #6C47B7 -27.59%, #341F60 105.15%)",}}
                           onClick={handleEditProfile}>
                            Submit
                          </button>
                          </div>
            </div>
          </div>
        </>
    )
}

export default ProfileDetails