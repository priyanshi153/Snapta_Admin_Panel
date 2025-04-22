import React, { useState } from 'react'
import Lock from '../../assets/lock.png'
import Eye from '../../assets/profile_eye.png'
import Profile1 from '../../assets/Profile.png'
import Plus from '../../assets/Plus.png'
import useApiPost from '../hooks/postData'
import toast from 'react-hot-toast'
import { CiLock } from "react-icons/ci";
import { LuLockKeyhole } from "react-icons/lu";

function ChangePassword() 
{
  const {data,error,postData} = useApiPost()
  const [formData,setFormData] = useState({
    password:"",
    npassword:"",
    cpassword:""
  })
  const handleChangePassword = () => {
    try{
      const response = postData("/change_password",formData)
      toast.success("Password Changed Successfully!")
    } catch(error) {
      
    }
  }
  console.log("Form Data !!!",formData)


    return(
        <>
        <div>
          <div className='flex justify-center'>
            <div className='w-[1000px]'>
              {/* All fields */}
              {/* Profile Image */}
            <div className="flex items-center justify-center w-full py-4">
              <div className="shadow-[9.3px_10.46px_64.96px_0px_rgba(0,0,0,0.2)] px-1 py-1 rounded-full">
                <div className="relative flex items-center justify-center w-24 h-24">
                  {/* User Image */}
                  <img src={Profile1}  alt="User" className="absolute inset-0 w-24 h-24 m-auto rounded-full"/>
                </div>
              </div>
            </div>

            {/* Name */}
            <h2 className='flex justify-center pb-3 text-base font-semibold font-poppins'>Desirae Siphron</h2>
                        <div className='grid grid-cols-2 gap-10 px-10 py-4'>
                            {/* Current Password */}
                       <div className="relative flex flex-col">
                        <label className="text-[#000000] font-poppins text-sm">Current Password<span className='text-sm text-red-600'>*</span></label>
                        <div className="relative">
                        <div className="absolute flex items-center justify-center p-3 transform -translate-y-1/2 rounded-lg bg-opacityGradient left-2 top-1/2">
                        {/* style={{background:' linear-gradient(213deg, rgba(108, 71, 183, 0.1) -27.59%, rgba(52, 31, 96, 0.1) 105.15%)'}}> */}
                          {/* <img src={Lock} alt="User" className="w-5 h-5"/> */}
                          <LuLockKeyhole className='w-5 h-5 text-sidebarText' />
                        </div>
                        <input type="text" className="border border-[#452B7A] border-opacity-10 rounded-lg w-full py-4 my-1 pl-16 placeholder:font-poppins placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-[#452B7A]"
                          placeholder="Enter Current Password"
                          required
                          autoComplete = "off"
                          autoCorrect="off"
                          spellCheck="false"
                          onChange={(e) =>  setFormData({...formData,password:e.target.value})}
                          value={formData.password}/>
                        </div>
                      </div>
            
                      {/* New Password */}
                      <div className="relative flex flex-col">
                        <label className="text-[#000000] font-poppins text-sm">New Password<span className='text-sm text-red-600'>*</span></label>
                        <div className="relative">
                        <div className="absolute flex items-center justify-center p-3 transform -translate-y-1/2 rounded-lg bg-opacityGradient left-2 top-1/2">
                        {/* style={{background:' linear-gradient(213deg, rgba(108, 71, 183, 0.1) -27.59%, rgba(52, 31, 96, 0.1) 105.15%)'}}> */}
                          {/* <img src={Lock} alt="User" className="w-5 h-5"/> */}
                          <LuLockKeyhole className='w-5 h-5 text-sidebarText' />

                        </div>
                        <input type="text" className="border border-[#452B7A] border-opacity-10 rounded-lg w-full py-4 my-1 pl-16 placeholder:font-poppins placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-[#452B7A]"
                          placeholder="Enter New Password"
                          required
                          autoComplete = "off"
                          autoCorrect="off"
                          spellCheck="false"
                          onChange={(e) => setFormData({...formData,npassword:e.target.value})}
                          value={formData.npassword}/>
                        </div>
                      </div>
                      </div>
            
                      {/* Confirm Password */}
                      <div className='grid grid-cols-2 gap-10 px-10 pb-4'>
                      <div className="relative flex flex-col">
                        <label className="text-[#000000] font-poppins text-sm">Confirm Password<span className='text-sm text-red-600'>*</span></label>
                        <div className="relative">
                        <div className="absolute flex items-center justify-center p-3 transform -translate-y-1/2 rounded-lg bg-opacityGradient left-2 top-1/2">
                        {/* style={{background:' linear-gradient(213deg, rgba(108, 71, 183, 0.1) -27.59%, rgba(52, 31, 96, 0.1) 105.15%)'}}> */}
                          {/* <img src={Lock} alt="User" className="w-5 h-5"/> */}
                          <LuLockKeyhole className='w-5 h-5 text-sidebarText' />

                        </div>
                        <input type="text" className="border border-[#452B7A] border-opacity-10 rounded-lg w-full py-4 my-1 pl-16 placeholder:font-poppins placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-[#452B7A]"
                          placeholder="Enter Confirm Password"
                          required
                          autoComplete = "off"
                          autoCorrect="off"
                          spellCheck="false"
                          onChange={(e) => setFormData({...formData,cpassword:e.target.value})}
                          value={formData.cpassword}/>
                        </div>
                      </div>        
                      </div>

            
                      {/* Submit Button */}
                      <div className='flex justify-center py-8'>
                        <button className='text-base font-poppins text-[#FFFFFF] px-16 py-2 rounded-lg bg-button-gradient'
                         onClick={handleChangePassword}>
                             Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
        </>
    )
}

export default ChangePassword