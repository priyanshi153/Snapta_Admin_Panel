import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bars from '../assets/bars.png';
import countryFlag from '../assets/country_flag.png';
import notification from '../assets/notification.png';
import mode from '../assets/mode.png';
import ProfileImage from '../assets/Post1.png';
import Search1 from '../assets/search.png';
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import { useGetDetailsQuery } from '../store/api/GetProfileDetails';
import Cookies from 'js-cookie'
import { useTheme } from '../context/ThemeProvider'; //For Light Dark Mode
import Moon from '../assets/moon.png'
import { IoIosNotificationsOutline } from "react-icons/io";
import { TbSunLow } from "react-icons/tb";
import { AiOutlineMoon } from "react-icons/ai";

const searchOptions = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "User List", path: "/user-list" },
    { name: "Post List", path: "/post-list" },
    { name: "Reel List", path: "/reel-list" },
    { name: "User Report List", path: "/user-report-list" },
    { name: "Post Report List", path: "/post-report-list" },
    { name: "Reel Report List", path: "/reel-report-list" },
    { name: "Profile", path: "/profile" },
    { name: "Stories List", path: "/stories-list" },
    { name: "Push Notification", path: "/push-notification" },
    { name: "Hashtag List", path: "/hashtag-list"},
    { name: "Language List", path: "/language-list"},
    { name: "Music List", path:'/music-list'},
    { name: "Block List", path:'/block-list'},
    { name: "Avtar List", path:'/avtar-list'},
    // { name: "Profile", path:"/profile"}
];

function Search() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [Mode,setMode] = useState("Light")

    const filteredOptions = search
        ? searchOptions.filter(option =>
            option.name.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    const token = Cookies.get("token")
    const {data:ProfileData,error,refetch} = useGetDetailsQuery({token:token})
    const profile = ProfileData?.user_data
    console.log("data profile !!!",profile)

    // For Theme Toggle 
    const {theme,toggleTheme} = useTheme();
    console.log("Theme @@@",theme)

    return (
        <>
            <div className='flex justify-between px-4 py-4 border-b dark:border-[#1F1F1F] xl:px-6 2xl:px-6'>
                {/* Left Section: Bars and Search Bar */}
                <div className='flex gap-3'>
                    {/* Bars */}
                    <button>
                        <img src={bars} className='w-5 h-5' />
                    </button>

                    <div className='flex justify-center block sm:hidden place-items-center'>
                    <img src={Logo} className='w-4 h-4'/>
                    </div>

                    {/* Search Bar */}
                    <div className="sm:relative">
                        <div className="flex items-center py-2 sm:p-2 sm:transform sm:-translate-y-1/2 sm:absolute sm:left-2 sm:top-1/2">
                            <img src={Search1} alt="Search" className="w-5 h-5" />
                        </div>

                        <input
                            type="text"
                            // className="border sm:block hidden border-gray-500 bg-[#00000005] font-poppins border-opacity-10 w-[350px] rounded-lg py-1 pl-12 placeholder:text-sm placeholder:text-[#0000004F] bg-white focus:outline-none focus:ring-1 focus:ring-gray-600"
            className="border border-gray-500 bg-[#00000005] border-opacity-10 rounded-lg w-[350px] py-1 pl-12 placeholder:text-sm placeholder:text-[#0000004F] placeholder:dark:text-tableDarkLarge focus:outline-none focus:ring-1 focus:ring-gray-600"
                            
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}/>

                        {/* Dropdown Options */}
                        {search && filteredOptions.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 border border-gray-300 rounded-lg shadow-md dark:bg-primary">
                                {filteredOptions.map((option) => (
                                    <p
                                        key={option.name}
                                        onClick={() => navigate(option.path)}
                                        className="px-4 py-2 text-sm cursor-pointer font-poppins hover:bg-gray-100"
                                    >
                                        {option.name}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Section: Country, Notifications, Profile */}
                <div className='flex gap-2'>
                    {/* Country Flag */}
                    <button className='p-2 rounded-full bg-opacityGradient'>
                        <img src={countryFlag} className='w-6 h-6 rounded-full' />
                    </button>

                    {/* Dark/Light Mode */}
                    <button className="flex items-center gap-2 p-2 rounded-full bg-opacityGradient" onClick={toggleTheme}>
      {theme === "light" ? (
        // <img className="h-5" src={mode} alt="" />
     
        <span className='text-iconColor'><TbSunLow style={{ fontSize: '25px',color:'text-[#452B7A]' }} /> </span>
      ) : (
        // <img className="h-5" src={Moon} alt="" />
        <AiOutlineMoon className='text-iconColor' style={{ fontSize: '25px',color:'text-[#452B7A]' }} /> 
      )}
    </button>

                    {/* Notifications */}
                    <button className='p-2 rounded-full bg-opacityGradient'>
                        {/* <img src={notification} className='w-5 h-5 rounded-full' /> */}
                        <IoIosNotificationsOutline className='text-header' style={{ fontSize: '25px' }} />
                    </button>

                    {/* Profile */}
                    <button className='rounded-full'>
                        <Link to="/profile"><img src={profile?.profile_pic} className='w-8 h-8 rounded-full cursor-pointer' /></Link>
                    </button> 
                </div>
            </div>
        </>
    );
}

export default Search;


