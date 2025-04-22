import React, { useEffect, useState } from "react";
import formatDate from "../../components/formatDate";
import useApiPost from "../hooks/postData";
import { Link } from "react-router-dom";
import Loader from '../../assets/Loader.gif'

function UsersList() 
{
  const [order,setOrder] = useState("")
  const [category,setCategory] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const { data, error, refetch,postData } = useApiPost()
const handleGetUserList = async () => {
  setIsLoading(true)
       try{
        const response = await postData("/get_all_user_pagination");}
     catch (error) {
        console.error("Error fetching user list:", error);
    } finally{
      setIsLoading(false)
    }
};

useEffect(() => {
  handleGetUserList()
},[refetch])

const AllUserList = data?.tag_users

    return(
        <>
          <div className="border border-[#D1D5DB] dark:border-[#1F1F1F] px-4 w-full py-5 rounded-lg">

        {/* Title and View All */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#000000] font-poppins text-base font-semibold dark:text-darkText">Latest Users List</h2>
            <Link to="/user-list"><p className="cursor-pointer text-[#484848] underline text-sm font-poppins">View All</p></Link>
          </div>

          {/* Users List Table */}
          <div className="border border-[#E3E3E3] dark:border-[#1F1F1F] rounded-lg overflow-hidden ">
            {/* table Header */}
            <div className="flex px-4 py-4 text-left border-b dark:border-b-[#1F1F1F] bg-header">
                {/* <div className="w-[10%] text-[#FFFFFF] font-poppins text-sm">S.L </div> */}
                <div className="w-[80%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">USERNAME 
                </div>
            
                {/* Date Time */}
                <div className="w-[45%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">CREATED DATE/TIME
                 
                </div>
            
                {/* Login Type */}
                <div className="w-[48%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">LOGIN TYPE
                 
                </div>
            
                {/* Platform Type */}
                <div className="w-[40%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">PLATFORM TYPE
                 
                </div>
            
                {/* Account Status */}
                <div className='w-[45%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2'> ACCOUNT STATUS
                
                </div>
            
                {/* Report Count */}
                <div className='w-[32%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2'> TOTAL REPORTS
              
                </div>
            
              </div>
          </div>

          {/* Data rows */}
          {AllUserList?.slice(0,5).map((user, index) => (
    <div key={user.id} 
    className={`${index % 2 === 0 ? 'bg-white dark:bg-primary' : 'bg-[#00162e0a] dark:bg-primary'} flex items-center dark:border-b-[#1F1F1F] py-3 px-4 border-b last:border-0`}>

      {/* Serial Number */}
      {/* <div className="w-[10%] text-[#000000] font-poppins text-sm">{index + 1}</div> */}

      {/* User name */}
      <div className='w-[80%] flex gap-2 items-center'>
        <img src={user.profile_pic} className='w-12 h-12 rounded-full'/>
        <div>
            <h2 className='text-[#00162e] font-poppins text-sm font-semibold cursor-pointer dark:text-darkText' >{user.username}</h2>
            <p className='text-xs text-[#939393] font-poppins'>{user.email === "" ? (user.mobile) : (user.email)}</p>
        </div>
      </div>

      {/* Created Date */}
      <div className='w-[45%]'>
        <p className='text-[#00162e] dark:text-darkText text-sm font-poppins'>{formatDate(user.created_at)}</p>
      </div>

      {/* LOGIN TYPE */}
      <div className="w-[48%]">
  <p className={`font-poppins text-sm rounded-lg w-fit px-2
      ${{
        Google: "text-[#00008B] bg-[#BCD2E8] bg-opacity-50",
        "Mobile Number": "text-[#452b7a] bg-[#452b7a] bg-opacity-10",
        Email: "text-[#FFB117] bg-yellow-200 bg-opacity-35",
      }[user.login_type] || "text-black bg-gray-300"}`}>
    {user.login_type}
  </p>
      </div>

      {/* PLATFORM TYPE */}
      <div className='w-[40%]'> 
        <h2 className='font-poppins text-[#00162e] text-sm dark:text-gray-500'>{user.platform_type}</h2>
      </div>

      {/* Account Status */}
      <div className='w-[45%]'>
        <h2 className={`${user.status === "1" ? "text-[#0D9947] bg-[#0D9947] bg-opacity-20" : "text-red-500 bg-opacity-20 bg-red-500"} font-poppins text-sm  w-fit rounded-lg px-2`}>
          {user.status === "1" ? "Active" : "Deactive"}
        </h2>
      </div>

      {/* Total Reports */}
      <div className='w-[32%]'>
        <p className='font-poppins text-[#00162e] text-sm dark:text-gray-500'>{user.user_report_count} {user.user_report_count > 1 ? "reports" : "report"}</p>
      </div>

    </div>
          ))}

{isLoading && (
                <div className='flex justify-center py-60'><img src={Loader} alt="loader" height={50} width={50}/></div>
               )}
          
          </div>
        </>
    )
}

export default UsersList