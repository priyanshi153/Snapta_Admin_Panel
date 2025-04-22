import React,{useState} from 'react'
import Profile1 from '../../assets/Profile.png'
import Searchbar from '../../components/Search'
import { Link } from 'react-router-dom'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'
import Plus from '../../assets/Plus.png'

function Profile() 
{
    const [selectedOption,setSelectedOption] = useState("edit")
    return(
        <>
        <div className='mb-10 pl-72'>
            <Searchbar />

            {/* Title */}
            <div className="flex justify-between border-t-[#F2F2F2] py-8 px-6">
                <h2 className="text-[#000000] font-poppins text-xl font-semibold pt-3">My Profile</h2>
            </div>

            {/* Navigation Path */}
            {/* <div className="flex items-center justify-between px-6 mb-3">
        <div className="flex items-center gap-2">
          <Link to="/dashboard"><h3 className="text-[#3A3A3A] font-poppins text-base font-semibold">Dashboard</h3></Link>
          <div className="rounded-full w-1 h-1 bg-[#E0E0E0]"></div>
          <h3 className="text-[#858585] font-poppins text-base">Profile</h3>
        </div>
      </div> */}
            
             {/* Profile Details */}
             <div className='border border-[#E3E3E3] mx-12 rounded-lg'>
                
          <div className='border-b border-[#E3E3E3] rounded-lg'>
             <button onClick={() => setSelectedOption("edit")}
                className={`${selectedOption === "edit" ? "bg-opacityGradient text-header rounded-tl-lg" : "text-[#999999]"} font-poppins text-left px-6 py-3`}

                 >Edit Profile</button>
                
                <button onClick={() => setSelectedOption("password")}
                className={`${selectedOption === "password" ? "bg-opacityGradient text-header" : "text-[#999999]"} font-poppins text-left px-6 py-3`}
                >Change Password</button>
          </div>
           
             <div className='flex justify-center'>

            <div className='w-[1000px]'>

            {/* Change Password or Profile Details Page */}
            {selectedOption === "edit" ? (<EditProfile />) : (<ChangePassword />)}

            </div>
            </div>
            </div>

         </div>
        </>
    )
}

export default Profile