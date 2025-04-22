import React,{useState,useEffect,useRef, use} from 'react';
import Search from '../../assets/search.png';
import Filter from '../../assets/filters.png';
import Searchbar from '../../components/Search';
import Dropdown from '../../assets/dropdown.png';
import DeactiveArrow from '../../assets/deactive_Arrow.png'
import UserProfile from '../../assets/user_profile.png'
import Eye from '../../assets/eye.png'
import Edit from '../../assets/edit.png'
import Delete from '../../assets/trash.png'
import Post1 from '../../assets/Post1.png'
import Post2 from '../../assets/Post1.png'
import Report from '../../assets/report_action.png'
import { Link, useLocation } from 'react-router-dom';
import Arrow from '../../assets/Showing_Arrow.png'
import useApiPost from '../hooks/postData';
import formatDate from '../../components/formatDate';
import formatTime from '../../components/formatTime';
import Loader from '../../assets/Loader.gif'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import ReelDetail from '../ReelList/ReelDetail';

function ReelReportList() {
  // Sample data for posts
  const [activePage,setActivePage] = useState(1)
  const [selectedValue, setSelectedValue] = useState("10");
  const [order,setOrder] = useState("")
  const [category,setCategory] = useState("")
  const [search,setSearch] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const { data, error,refetch,postData } = useApiPost()
  const [selectedPostId,setSelectedPostId] = useState("")
const handleGetReportList = () => {
  setIsLoading(true)
  try{
    const response =  postData("/get_all_reel_reportlist_pagination",{page_no:activePage,per_page:selectedValue,order:order,search:search,category:category})
  } catch(error){}
  finally{
    setIsLoading(false)
  }
}

// Refetch data when page number changes
useEffect(() => {
  handleGetReportList()
}, [activePage,selectedValue,order,category,search,refetch]);

const ActivePage = data?.report_post
console.log("Post @@@ !!!",ActivePage)

const pagination = data?.pagination;
const lastPage = pagination?.last_page || 1;
const currentPage = pagination?.current_page
const AllReelReportList = data?.report_reel || [];
  
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const dropdownRef = useRef(null);

console.log("Report @@@",AllReelReportList)

// Options for dropdown
const options = ["10","25","50","100"];

// Function to handle option selection
const handleSelect = (value) => {
  setSelectedValue(value);
  setIsDropdownOpen(false);
};

// Close dropdown if clicked outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
const [toggleStates, setToggleStates] = useState(() => {
  return AllReelReportList.reduce((acc, post) => {
    acc[post.reel_id] = post.status === 1; // set to true if status is 1
    return acc;
  }, {});
});

useEffect(() => {
  if (AllReelReportList.length > 0) {
    const initialStates = AllReelReportList.reduce((acc, post) => {
      acc[post.reel_id] = post.status === 1;
      return acc;
    }, {});
    setToggleStates(initialStates);
  }
}, [AllReelReportList]);

const handleCheckboxChange = (postId) => {
  setToggleStates((prevStates) => {
    const newValue = !prevStates[postId];
    const newStatus = newValue ? 1 : 0
    return {
      ...prevStates,
      [postId]: newValue,
    };
  });
};
const {data:reportData,postData:reelReportData} = useApiPost()
const handleReelStatus = (postId) => {
  try{
    const response = reelReportData("/reel_edit_status",{reel_id:postId})
    toast.success("Reel Status Updated Successfully!")
    handleCheckboxChange()
    handleGetReportList()
  } catch(error){}
}

// To open user profile
const [userId,setUserId] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const handleOpenUserProfile = (userId) => {
      const currentPath = location.pathname.split("/")[1]; // gets 'reel-list', 'user-list', etc.
      setUserId(userId);
      Cookies.set("userId", userId);
      navigate(`/${currentPath}/user-profile`);
    };
  // To open Reel 
  const [openDetail,setOpenDetail] = useState(false)
  const handleReelDetailOpen = (postId) => {
    setOpenDetail(true)
    setSelectedPostId(postId);
  };
  const handleReelDetailClose = () => {
     setOpenDetail(false)
     setSelectedPostId(null)
  }

  return (
    <>
    {/* <div className="mb-10 xl:pl-72"> */}
    <div className="light:mb-10 xl:pl-72 dark:bg-primary bg-secondary">

      <Searchbar />

      {/* Title */}
      <div className="flex justify-between border-t-[#F2F2F2] py-3 px-6">
        <h2 className="text-[#000000] dark:text-darkText font-poppins text-xl font-semibold pt-3">Reel Report List</h2>
        <div className="relative">
          <div className="absolute flex items-center p-2 transform -translate-y-1/2 left-2 top-1/2">
            <img src={Search} alt="Search" className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="border border-gray-500 bg-[#00000005] dark:text-darkText placeholder:dark:text-tableDarkLarge w-[250px] border-opacity-10 rounded-lg py-2 pl-12 placeholder:text-sm placeholder:text-[#0000004F] focus:outline-none focus:ring-1 focus:ring-gray-600"
            placeholder="Search by reported username..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}/>
        </div>
      </div>

      {/* Navigation Path */}
      <div className="flex items-center justify-between px-6 mb-3">
        <div className="flex items-center gap-2">
          <Link to="/dashboard"><h3 className="text-[#3A3A3A] dark:text-darkText font-poppins text-base font-semibold">Dashboard</h3></Link>
          <div className="rounded-full w-1 h-1 bg-[#E0E0E0]"></div>
          <h3 className="text-[#858585] font-poppins text-base">Reel Report List</h3>
        </div>
      </div>

      {/* Header Bar */}
      <div className="border border-[#E3E3E3] dark:border-[#1F1F1F] rounded-lg overflow-hidden mt-8 mx-6">
  {/* Table Header */}
   <div className="flex px-4 py-4 pl-4 text-left border-b dark:border-b-[#1F1F1F] bg-header sm:pl-16">
      <div className="w-[10%] text-[#FFFFFF] font-poppins text-sm">S.L </div>
      <div className="w-[20%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">CREATED DATE/TIME
        <div className='flex flex-col'>
          <button onClick={() => {setOrder("0"); setCategory("Date/Time")}}>
                <img src={category === "Date/Time" && order === "0" ? Dropdown : DeactiveArrow} className='w-2 h-2 rotate-180'/>
          </button>
          <button onClick={() => {setOrder("1"); setCategory("Date/Time")}}>
                <img src={category === "Date/Time" && order === "1" ? Dropdown : DeactiveArrow} className='w-2 h-2'/>
              </button>
            </div>
      </div>
      {/* Reel Image */}
      <div className='w-[15%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2'> REEL IMAGE </div>
      
      {/* Reported Username */}
      <div className="w-[25%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">REPORTED USER NAME 
        <div className='flex flex-col'>
          <button onClick={() => {setOrder("0"); setCategory("Post User")}}>
            <img src={category === "Post User" && order === "0" ? Dropdown : DeactiveArrow} className='w-2 h-2 rotate-180'/>
          </button>
          <button onClick={() => {setOrder("1"); setCategory("Post User")}}>
            <img src={category === "Post User" && order === "1" ? Dropdown : DeactiveArrow} className='w-2 h-2'/>
          </button>
        </div>
      </div>
      {/* Reason */}
      <div className="w-[27%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">REASON</div>

      {/* Reported By */}
      <div className="w-[25%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">REPORTED BY 
        <div className='flex flex-col'>
          <button onClick={() => {setOrder("0"); setCategory("Report User")}}>
            <img src={category === "Report User" && order === "0" ? Dropdown : DeactiveArrow} className='w-2 h-2 rotate-180'/>
          </button>
          <button onClick={() => {setOrder("1"); setCategory("Report User")}}>
            <img src={category === "Report User" && order === "1" ? Dropdown : DeactiveArrow} className='w-2 h-2'/>
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="w-[10%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">STATUS </div>
    </div>

  {/* Data Rows */}
  {AllReelReportList.map((report, index) => (
    <div key={report.id}
    className={`${index % 2 === 0 ? 'bg-white dark:bg-primary' : 'bg-[#00162e0a] dark:bg-primary'} flex dark:border-b-[#1F1F1F] items-center px-4 py-3 sm:pl-16 pl-4 border-b last:border-0`}>

      {/* Serial Number */}
      <div className="w-[10%] dark:text-darkText text-[#000000] font-poppins text-sm">{(currentPage - 1) * selectedValue + index + 1}</div>

      {/* Date/Time */}
      <div className="w-[20%]">
        <h2 className="text-[#00162e] dark:text-darkText font-poppins text-sm">{formatDate(report.created_at)}</h2>
        <h2 className="text-[#7A7A7A] dark:text-tableDarkLarge font-poppins text-xs">{formatTime(report.created_at)}</h2> 
      </div>

      {/* Reel Image */}
      <div className='w-[15%] cursor-pointer' onClick={() => handleReelDetailOpen(report.reel_id)}>
        <img src={report.post_videos?.map((reel) => (reel.post_video_thumbnail))} className='object-cover rounded-lg w-14 h-14'/>
      </div>

      {/* Reported username */}
      <div className="w-[25%] flex gap-2 items-center">
        <img src={report.post_profile_pic} className="w-12 h-12 rounded-full"/>
        <div>
          <h2 className="text-[#000000] dark:text-darkText font-poppins text-sm font-semibold cursor-pointer" onClick={() => handleOpenUserProfile(report.reel_userid)}>{report.post_username}</h2>
          <p className="text-xs dark:text-tableDarkLarge text-tableLightLarge text-[#939393] font-poppins">{report.post_email}</p>
        </div>
      </div>

      {/* Reason */}
      <div className="w-[27%] text-[#939393] font-poppins text-sm">{report.report_text}</div>

      {/* Reported By */}
      <div className="w-[25%] flex gap-2 items-center">
        <img src={report.report_profile_pic} className="w-12 h-12 rounded-full"/>
        <div>
          <h2 className="text-[#000000] font-poppins dark:text-darkText text-sm font-semibold cursor-pointer" onClick={() => handleOpenUserProfile(report.user_id)}>{report.report_username}</h2>
          <p className="text-xs text-[#939393] dark:text-tableDarkLarge text-tableLightLarge font-poppins">{report.report_email}</p>
        </div>
      </div>

      {/* status */}
      <div key={report.reel_id} className="w-[10%]">
  <label className="flex items-center cursor-pointer select-none">
    <div className="relative">
      <input
        type="checkbox"
        checked={toggleStates[report.reel_id]}
        onChange={() => {handleReelStatus(report.reel_id)}}
        className="sr-only"
      />
      {/* Toggle Background */}
      <div
        className={`block h-6 w-10 rounded-full border transition duration-300 ${
          toggleStates[report.reel_id]
            ? "bg-header border-header"
            : "bg-transparent border-header"
        }`}
      ></div>

      {/* Toggle Dot */}
      <div
        className={`absolute top-1 h-4 w-4 rounded-full transition duration-300 ${
          toggleStates[report.reel_id]
            ? "right-1 bg-white"
            : "left-1 bg-header"
        }`}
      ></div>
    </div>
  </label>
      </div>
    </div>
  ))}

  {isLoading && (
      <div className='flex justify-center py-60'><img src={Loader} alt="loader" height={50} width={50}/></div>
    )}

  {/* Pagination and Results Count */}
  <div className="flex justify-between px-10 py-6 bg-white dark:bg-primary">
  {/* Results Count */}
  <div className="relative flex gap-2 place-items-center" ref={dropdownRef}>
    {/* Dropdown Button */}
    <div
      className="border border-[#9C9C9C] dark:bg-primary bg-[#edeff166] rounded-xl flex gap-2 items-center px-3 py-1 cursor-pointer relative"
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      <p className="text-[#00162e] dark:text-darkText font-poppins">{selectedValue}</p>
      <button>
        <img src={Arrow} className="w-4 h-4" />
      </button>
    </div>
  
    {/* Dropdown Menu - Positioned Above */}
    {isDropdownOpen && (
      <div className="absolute left-0 z-50 mb-2 bg-white border border-gray-300 rounded-lg shadow-lg bottom-full w-max">
        {options.map((option) => (
          <p
            key={option}
            className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
            onClick={() => handleSelect(option)}>
            {option}
          </p>
        ))}
      </div>
    )}
  
    {/* Results Text */}
    <p className="text-[#333333] font-poppins text-sm dark:text-gray-600">
      Showing <span className="font-semibold dark:text-darkText text-[#000000] text-sm">{pagination?.total}</span> results
    </p>
  </div>
  
      {/* Pagination Buttons */}
  
    <div className="flex items-center">
    {/* Previous Button */}
    <button 
      className={`text-[#000000] dark:text-darkText text-sm font-poppins px-3 py-1 rounded-full transition-all duration-200 
        ${pagination?.prev_page === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
      onClick={() => setActivePage(prev => (prev > 1 ? prev - 1 : prev))}
      disabled={pagination?.prev_page === 0}>
      Previous
    </button>
  
    {/* Page Numbers */}
    {[...Array(lastPage)].map((_, index) => {
      const page = index + 1;
      return (
        <button 
          key={page} 
          className={`text-sm font-poppins px-3 py-1 rounded-full transition-all duration-200 
            ${activePage === page ? "text-white bg-button-gradient" : "text-black dark:text-darkText hover:bg-gray-200"}`}
          onClick={() => setActivePage(page)}
        >
          {page}
        </button>
      );
    })}
  
    {/* Next Button */}
    <button 
      className={`text-[#000000] dark:text-darkText text-sm font-poppins px-3 py-1 rounded-full transition-all duration-200 
        ${pagination?.next_page > lastPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
      onClick={() => setActivePage(prev => (prev < lastPage ? prev + 1 : prev))}
      disabled={pagination?.next_page > lastPage}
    >
      Next
    </button>
  </div>
  
    </div>
      </div>


      
    </div>

    {selectedPostId && (
      <ReelDetail open={openDetail} postId={selectedPostId} handleClose={handleReelDetailClose}/>
    )}
    </>
  );
}

export default ReelReportList;

