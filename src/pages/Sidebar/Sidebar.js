import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";   //Ziogram logo 
import logo from '../../assets/SnaptaLogo.png' //
import Snapta from "../../assets/Snapta.png";
import Dashboard1 from "../../assets/dashboard1.png";
import Dashboard2 from "../../assets/dashboard2.png";
import Dashboardh from '../../assets/dahboardh.png'
import PostList1 from "../../assets/PostList1.png";
import PostList2 from '../../assets/PostList2.png';
import PostListh from '../../assets/PostListh.png'
// import PostListh from '../../assets/Post'
import ReelList1 from "../../assets/ReelList1.png";
import ReelList2 from "../../assets/ReelList2.png";
import ReelListh from '../../assets/ReelListh.png';
import StoriesList1 from "../../assets/StoriesList1.png";
import StoriesList2 from "../../assets/StoriesList2.png";
import StoriesListh from '../../assets/StoriesListh.png'
import ReportList1 from "../../assets/ReportList1.png";
import ReportList2 from "../../assets/ReportList2.png";
import UserList1 from '../../assets/UserList1.png';
import UserList2 from '../../assets/UserList2.png';
import CountryWise1 from '../../assets/CountryWise1.png'
import CountryWise2 from '../../assets/CountryWise2.png'
import HashtagList1 from "../../assets/HashtagList1.png";
import HashtagList2 from "../../assets/HashtagList2.png";
import LanguageList1 from '../../assets/LanguageList1.png';
import LanguageList2 from '../../assets/LanguageList2.png';
import MusicList1 from '../../assets/MusicList1.png';
import MusicList2 from '../../assets/MusicList2.png';
import BlockList1 from '../../assets/BlockList1.png';
import BlockList2 from '../../assets/BlockList2.png';
import AvatarList1 from '../../assets/AvatarList1.png';
import AvatarList2 from '../../assets/AvatarList2.png';
import Notification1 from '../../assets/Notification1.png';
import Notification2 from '../../assets/Notification2.png';
import Settings1 from "../../assets/settings1.png";
import Settings2 from "../../assets/settings2.png";
import Profile1 from "../../assets/profile1.png";
import Profile2 from "../../assets/profile2.png";
import cms1 from '../../assets/cms1.png';
import cms2 from '../../assets/cms2.png';
import Logout1 from "../../assets/logout1.png";
import Logout2 from "../../assets/logout2.png";

import LogoutDialog from '../Logout/LogoutPopup';
import Arrow from '../../assets/Arrow.png';
import Cookies from 'js-cookie'
import Frame from '../../assets/Frame.png'

// All Icons from React 
import { RxDashboard } from "react-icons/rx";
import { PiUserListLight } from "react-icons/pi";
import { TbCircleDashedPlus } from "react-icons/tb";
import { HiOutlineHashtag } from "react-icons/hi2";
import { FiFolderPlus } from "react-icons/fi";
import { BsMusicNoteList } from "react-icons/bs";
import { IoLanguageOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { PiUsersFourLight } from "react-icons/pi";
import { MdOutlineBlock } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io"
import { IoSettingsOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { RiPagesLine } from "react-icons/ri";

const options1 = [
  {
    name: "DASHBOARD",
    subOptions: [
      { name: "Dashboard", path: "/dashboard", src:Dashboard1,src1:Dashboard2,srch:Dashboardh },
    ],
  },
  {
    name: "POST",src:ReportList1,src1:ReportList2,
    subOptions: [
      { name: "Post List", path: "/post-list", src:PostList1,src1:PostList2,srch:PostListh },
      { name: "Reel List", path: "/reel-list", src:ReelList1, src1:ReelList2,srch:ReelListh },
      { name: "Stories List", path: "/stories-list", src:StoriesList1,src1:StoriesList2, srch:StoriesListh },
    ],
  },
  {
    name: "LIST",src:ReportList1,src1:ReportList2,
    subOptions: [
      {
        name: "Report List", src: ReportList1, src1: ReportList2,
        sub: [
          { name: "User Report List", path: "/user-report-list" },
          { name: "Post Report List", path: "/post-report-list" },
          { name: "Reel Report List", path: "/reel-report-list" },
        ],
      },
      { name: "User List", path:'/user-list', src:UserList1, src1:UserList2},
      { name: "Countrywise Users", path:'/country-wise-users', src:CountryWise1,src1:CountryWise2 },
      { name: "Hashtag List", path: "/hashtag-list", src:HashtagList1, src1:HashtagList2 },
      { name: "Language List", path: "/language-list", src:LanguageList1, src1:LanguageList2 },
      // { name: "Music List", path: "/music-list", src:MusicList1, src1:MusicList2 },
      { name: "Block List", path: "/block-list", src:BlockList1, src1:BlockList2 },
      { name: "Avatar List", path: "/avatar-list", src:AvatarList1, src1:AvatarList2 },
    ],
  },
  {
    name: "NOTIFICATION",icon:IoIosNotificationsOutline,
    subOptions: [
      { name: "Push Notification",path:'/push-notification', src:Notification1, src1:Notification2  },
    ],
  },
  {
    name: "SETTING",icon:IoSettingsOutline,
    subOptions: [
      { name: "Settings",path:"/settings", src:Settings1,src1:Settings2 },
      { name: "Profile",path:'/profile', src:Profile1, src1:Profile2 },
      { name: "CMS Pages", path:'/cms', src:cms1, src1:cms2},
      { name: "Logout",path:"/logout", src: Logout1, src1: Logout2 },
    ],
  },
];

function Sidebar() {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = () => {
    console.log("Item deleted");
    handleClose();
  };
  
  const toggleSubMenu = (name) => {
    setOpenSubMenu(openSubMenu === name ? null : name);
  };

  const handleRemove = () => {
    Cookies.remove("userId")
  }
  
  return (
    <>
      <div className="xl:w-72 h-screen text-[#5B5B5B] dark:bg-primary dark:text-darkText flex flex-col gap-10 fixed border border-[#F2F2F2] dark:border-[#1F1F1F]">
        {/* Logo Section */}
        <div className="flex gap-2 px-6 pt-8 place-items-center">
          <img src={logo} className="w-8 h-8"/>
          {/* <img src={Logo} alt="logo" height={40} width={40} className="w-[120px]" />  Ziogram logo */}
          <img src={Snapta} alt="snapta" height={0} width={75} className="hidden pt-1 xl:block" />
        </div>
        
{/* Menu Options */}
<div className="hidden space-y-2 hover:overflow-y-auto xl:block">
  {options1.map((section,index) => (
    <div key={section.name}>
      {/* Section Title */}
      <div className="px-6 text-base font-semibold tracking-wide text-[#000000] dark:text-darkText text-opacity-[53%]">
        {section.name}
      </div>

      {/* Section Items */}
      {section.subOptions.map((item,index) => {
        if (item.name === "Logout") {
          return (
            <>
            <button
              key={item.name}
              onClick={handleOpen}
              className="flex items-center w-full px-6 py-3 transition-all duration-200"
            >
              <img src={Logout1} className="w-5 h-5" alt="Logout" />
              <span className="hidden ml-3 text-base xl:ml-3 font-poppins xl:block">Logout</span>
            </button>
            </>
          );
        }

        return (
          <div key={item.name} className="relative ml-2">
            {/* Main Option (with nested sub if exists) */}
            <div
              className="left-0 flex items-center justify-between w-full px-6 py-3 transition-all duration-200 cursor-pointer"
              onClick={() => item.sub ? toggleSubMenu(item.name) : null}
            >
              
              {item.sub ? (
                <div className="flex items-center w-full">
                  <img src={item.src} className="w-5 h-5" alt={item.name} /> 
                  {/* {item.sub  && <item.icon className={`w-5 h-5 ${isActive ? "text-header" : "text-gray-500"}`}/>} */}
                  <span className="hidden ml-3  xl:text-[#5B5B5B] dark:text-darkText text-base font-poppins xl:block text-[#5B5B5B] dark:text-[#AAAAAA]">{item.name}</span>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center w-full ${
                      isActive
                        ? "text-transparent bg-clip-text bg-header font-semibold"
                        : ""
                    }`
                  }
                  onClick={handleRemove}
                >
                  {({ isActive }) => (
                    <div className="flex items-center group ">
                    {isActive && (
                       <div className="absolute w-1 h-5 rounded-r -left-2 top-3 bottom-3 bg-header"/>  //for the left line of active button
                    )}
                      <div className="w-5 h-5 dark:group">
                        <img src={isActive ? item.src1 : item.src} className="w-5 h-5 group-hover:hidden" alt="default"/>
                        {/* hover image */}
                        <img src={isActive ? item.src1 : item.srch} className="hidden w-5 h-5 dark:group-hover:block" alt="hover"/>
                      </div>

                      <span className={`hidden ml-3 text-base font-poppins xl:block  ${isActive ? "text-header" : "text-[#5B5B5B] dark:text-[#AAAAAA]"}`}>{item.name}</span>
                    </div>
                  )}
                </NavLink>
              )}

              {/* Arrow icon */}
              {item.sub && (
                <img
                  src={Arrow}
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openSubMenu === item.name ? "" : "-rotate-90"
                  }`}
                  alt="Toggle Submenu"
                />
              )}
            </div>

            {/* Sub-options if present */}
            {item.sub && openSubMenu === item.name && (
              <div className="relative ml-6">
                <div className="absolute left-2 top-0 bottom-0 w-0.5 h-[87px] bg-gray-300"></div>
                <div className="pl-4">
                  {item.sub.map((subItem) => (
                    <div key={subItem.name} className="relative flex items-center">
                      <div className="absolute w-4 h-2 border-b-2 border-l-2 border-gray-300 dark:border-[#1F1F1F] rounded-bl-lg -left-2"></div>
                      <NavLink
                        to={subItem.path}
                        className={({ isActive }) =>
                          `flex items-center w-full px-6 py-2 transition-all duration-200 ${
                            isActive
                              ? "text-transparent bg-clip-text bg-header font-semibold"
                              : ""
                          }`
                        }
                        onClick={handleRemove}
                      >
                        <span className="text-sm font-poppins">{subItem.name}</span>
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  ))}
</div>
      </div>

      <LogoutDialog open={open} handleClose={handleClose} handleDelete={handleDelete} />
    </>
  );
}

export default Sidebar;



