import React,{useState,useEffect,useRef} from 'react';
import Search from '../../assets/search.png';
import Filter from '../../assets/filters.png';
import Searchbar from '../../components/Search';
import Dropdown from '../../assets/dropdown.png';
import UserProfile from '../../assets/user_profile.png'
import Eye from '../../assets/eye.png'
import Edit from '../../assets/edit.png'
import Delete from '../../assets/trash.png'
import Cookies from 'js-cookie'
import useApiPost from '../hooks/postData';
import formatTime from '../../components/formatTime'
import formatDate from '../../components/formatDate';
import { Link } from 'react-router-dom';
import Arrow from '../../assets/Showing_Arrow.png'
import formatDateTime from '../../components/formatDateTime';
import DeleteUser from './DeleteUser'
import DeactiveArrow from '../../assets/deactive_Arrow.png'
import Block from '../../assets/Block.png'
import BlockUser from './BlockUser';
import { useNavigate,useLocation,useParams } from 'react-router-dom';
import Loader from '../../assets/Loader.gif'

function UserList() {
  // Sample data for posts
  const [activePage,setActivePage] = useState(1)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("10");
  const [order,setOrder] = useState("")
  const [category,setCategory] = useState()
  const dropdownRef = useRef(null);
  const [text,setText] = useState("")
  const [searchResults,setSearchResults] = useState([])
  const navigate = useNavigate()
  const [userId,setUserId] = useState()
  const [isLoading,setIsLoading] = useState(false)
  
  const {source} = useParams()
  const location = useLocation()
  const handleOpenUserProfile = (userId) => {
    const currentPath = location.pathname.split("/")[1]; // gets 'reel-list', 'user-list', etc.
    setUserId(userId);
    Cookies.set("userId", userId);
    navigate(`/${currentPath}/user-profile`);
  };

// Options for dropdown
const options = ["10", "25", "50","100"];

// Function to handle option selection
const handleSelect = (value) => {
  setSelectedValue(value);
  setIsDropdownOpen(false);
};

// for order and category
const token = Cookies.get("token")
console.log("Tokennnnnnnnnnnnnn",token)

const { data, error, refetch,postData } = useApiPost()

const handleGetUserList = async () => {
  setIsLoading(true)
    try {
        const payload = { page_no:activePage,per_page:selectedValue,order:order,category:category};
        if (text.trim() !== "") {
            payload.text = text;
        }
        const response = await postData("/get_all_user_pagination", payload);
        setSearchResults(response?.tag_users || []);
    } catch (error) {
        console.error("Error fetching user list:", error);
    } finally{
      setIsLoading(false)
    }
};

// Refetch data when page number or search text changes
useEffect(() => {
    handleGetUserList();
}, [text,activePage,selectedValue,order,category,refetch]);

const [open,setOpen] = useState(false)
const handleOpen = () => setOpen(true)
const handleClose = () => setOpen(false)

const handleDelete = () => {
  console.log("Item deleted");
  handleClose();
}


const [block,setBlock] = useState(false)
const [BlockUserId,setBlockUserId] = useState("")
const handleBlock = (UserId) => 
  {  
    setBlock(true)
    setBlockUserId(UserId)
  }
const handleCloseBlock = () => {
  setBlock(false)
  handleGetUserList()
}

// Input field
<input
    type="text"
    className="border border-gray-500 bg-[#00000005] dark:text-darkText border-opacity-10 rounded-lg w-[250px] py-2 pl-12 placeholder:text-sm placeholder:text-[#0000004F] focus:outline-none focus:ring-1 focus:ring-gray-600"
    placeholder="Search by user name..."
    value={text}
    onChange={(e) => setText(e.target.value)}
/>;

const ActivePage = data?.tag_users
console.log("Post @@@ !!!",ActivePage)

const pagination = data?.pagination;
const lastPage = pagination?.last_page || 1;
const currentPage = pagination?.current_page
const AllUserList = data?.tag_users || [];

console.log("Text !!!",text)
console.log("Users @@@",AllUserList)

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

  return (
    <>
    {/* <div className="mb-10 xl:pl-72"> */}
    <div className='light:mb-10 xl:pl-72 dark:bg-primary bg-secondary'>
      <Searchbar />

      {/* Title */}
      <div className="flex justify-between border-t-[#F2F2F2] py-3 px-6">
        <h2 className="text-[#000000] font-poppins text-xl font-semibold pt-3 dark:text-darkText">User List</h2>
        <div className="relative">
          <div className="absolute flex items-center p-2 transform -translate-y-1/2 left-2 top-1/2">
            <img src={Search} alt="Search" className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="border border-gray-500 bg-[#00000005] dark:text-darkText placeholder:dark:text-tableDarkLarge border-opacity-10 rounded-lg w-[250px] py-2 pl-12 placeholder:text-sm placeholder:text-[#0000004F] focus:outline-none focus:ring-1 focus:ring-gray-600"
            placeholder="Search by username..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
      
      {/* Navigation Path */}
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link to="/dashboard"><h3 className="text-[#3A3A3A] font-poppins text-base dark:text-darkText font-semibold">Dashboard</h3></Link>
          <div className="rounded-full w-1 h-1 bg-[#E0E0E0]"></div>
          <h3 className="text-[#858585] font-poppins text-base">User List</h3>
        </div>
      </div>

      {/* Header Bar */}
      <div className="border border-[#E3E3E3] dark:border-[#1F1F1F] rounded-lg mt-8 2xl:mx-6 xl:mx-6 mx-4 overflow-x-auto w-full">
      <div className='xl:overflow-x-auto lg:overflow-x-auto 2xl:overflow-hidden min-w-[1200px] '>
      <div className='min-w-max'>  
  {/* Table Header */}
  <div className="flex px-4 py-4 pl-4 text-left border-b dark:border-b-[#1F1F1F] bg-header sm:pl-16">
    <div className="w-[15%] text-[#FFFFFF] font-poppins text-sm">S.L </div>

    {/* Username */}
    <div className="2xl:w-[65%] w-[80%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">USERNAME 
      <div className='flex flex-col'>
          <button onClick={() => { setOrder("0"); setCategory("Username"); }}>
            <img src={category === "Username" && order==="0" ? Dropdown : DeactiveArrow} className={`w-2 h-2 rotate-180 transition`} />
          </button>
        <button onClick={() => {setOrder("1"); setCategory("Username")}}>
          <img src={category === "Username" && order === "1" ? Dropdown : DeactiveArrow} className="w-2 h-2"/>
        </button>
      </div>
    </div>

    {/* Date Time */}
    <div className="2xl:w-[50%] w-[55%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">CREATED DATE/TIME
      <div className='flex flex-col'>
        <button onClick={() => {setOrder("0"); setCategory("Date/Time")}}>
          <img src={category === "Date/Time" && order==="0" ? Dropdown : DeactiveArrow} className={`w-2 h-2 rotate-180 transition`} />
        </button>
        <button onClick={() => {setOrder("1"); setCategory("Date/Time")}}>
          <img src={category === "Date/Time" && order === "1" ? Dropdown : DeactiveArrow} className="w-2 h-2"/>
        </button>
      </div>
    </div>

    {/* Login Type */}
    <div className="w-[50%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">LOGIN TYPE
      <div className='flex flex-col'>
        <button onClick={() => {setOrder("0"); setCategory("Login type")}}>
          <img src={category === "Login type" && order === "0" ? Dropdown : DeactiveArrow} className='w-2 h-2 rotate-180' />
        </button>
       <button onClick={() => {setOrder("1"); setCategory("Login type")}}><img src={category === "Login type" && order === "1" ? Dropdown : DeactiveArrow} className="w-2 h-2"/></button></div>
    </div>

    {/* Platform Type */}
    <div className="w-[40%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">PLATFORM TYPE
      {/* <div className='flex flex-col'>
        <button onClick={() => {setOrder("0"); setCategory("Login type")}}>
          <img src={category === "Login type" && order === "0" ? Dropdown : DeactiveArrow} className='w-2 h-2 rotate-180' />
        </button>
       <button onClick={() => {setOrder("1"); setCategory("Login type")}}><img src={category === "Login type" && order === "1" ? Dropdown : DeactiveArrow} className="w-2 h-2"/></button>
       </div> */}
    </div>

    {/* Account Status */}
    <div className='w-[40%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2'> ACCOUNT STATUS
    {/* <div className='flex flex-col'>
        <button onClick={() => {setOrder("0"); setCategory("Login type")}}>
          <img src={category === "Login type" && order === "0" ? Dropdown : DeactiveArrow} className='w-2 h-2 rotate-180' />
        </button>
       <button><img src={category === "Login type" && order === "1" ? Dropdown : DeactiveArrow} className="w-2 h-2"/></button>
       </div> */}
    </div>

    {/* Report Count */}
    <div className='2xl:w-[35%] w-[40%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2'> TOTAL REPORTS
    <div className='flex flex-col'>
        <button onClick={() => {setOrder("0"); setCategory("UserReport")}}>
          <img src={category === "UserReport" && order === "0" ? Dropdown : DeactiveArrow} className='w-2 h-2 rotate-180' />
        </button>
       <button onClick={() => {setOrder("1"); setCategory("UserReport")}}>
        <img src={category === "UserReport" && order === "1" ? Dropdown : DeactiveArrow} className="w-2 h-2"/>
        </button>
       </div>
    </div>

    <div className="w-[35%] text-[#FFFFFF] font-poppins text-sm">ACTIONS</div>
  </div>

  {/* Data Rows */}
  {AllUserList?.map((user, index) => (
    <div key={user.id} 
    className={`${index % 2 === 0 ? 'bg-white dark:bg-primary' : 'bg-[#00162e0a] dark:bg-primary'} flex items-center px-4 py-3 sm:pl-16 pl-4 border-b dark:border-b-[#1F1F1F] last:border-0`}>

      {/* Serial Number */}
      <div className="w-[15%] dark:text-darkText text-[#000000] font-poppins text-sm">{(currentPage - 1) * selectedValue + index + 1}</div>

      {/* User name */}
      <div className='w-[80%] 2xl:w-[65%] flex gap-2 items-center'>
        <img src={user.profile_pic} className='w-12 h-12 rounded-full'/>
        <div>
            <h2 className='text-[#00162e] dark:text-darkText font-poppins text-sm font-semibold cursor-pointer' onClick={() => handleOpenUserProfile(user.user_id)}>{user.username}</h2>
            <p className='text-xs text-[#939393] dark:text-tableDarkLarge light:text-tableLightLarge font-poppins'>{user.email === "" ? (user.mobile) : (user.email)}</p>
        </div>
      </div>

      {/* Created Date */}
      <div className='w-[50%]'>
        <p className='text-[#00162e] dark:text-darkText text-sm font-poppins'>{formatDate(user.created_at)}</p>
      </div>

      {/* LOGIN TYPE */}
      <div className="w-[50%]">
  <p className={`font-poppins text-sm rounded-lg w-fit px-2
      ${{
        Google: "text-[#00008B] bg-[#BCD2E8] bg-opacity-50",
        // background: #6C47B740;

        "Mobile Number": "text-[#452b7a] bg-[#452b7a] bg-opacity-10 dark:text-purple-300 dark:bg-[#452B7A] dark:bg-opacity-30",
        Email: "text-[#FFB117] bg-yellow-200 bg-opacity-35",
      }[user.login_type] || "text-black bg-gray-300"}`}>
    {user.login_type}
  </p>
      </div>

      {/* PLATFORM TYPE */}
      <div className='w-[40%]'>
        <h2 className='font-poppins dark:text-darkText text-[#00162e] text-sm'>Mobile</h2>
      </div>

      {/* Account Status */}
      <div className='w-[40%]'>
        <h2 className={`${user.status === "1" ? "text-[#0D9947] bg-[#0D9947] bg-opacity-20" : "text-red-500 bg-opacity-20 bg-red-500"} font-poppins text-sm  w-fit rounded-lg px-2`}>
          {user.status === "1" ? "Active" : "Deactive"}
        </h2>
      </div>

      {/* Total Reports */}
      <div className='2xl:w-[35%] w-[45%]'>
        <p className='font-poppins dark:text-darkText text-[#00162e] text-sm'>{user.user_report_count} {user.user_report_count > 1 ? "reports" : "report"}</p>
      </div>

      {/* Actions */}
      <div className="w-[35%] flex gap-4">
        <button className="bg-[#CCE1CD] bg-opacity-[57%] rounded-full p-2" onClick={() => handleOpenUserProfile(user.user_id)}>
          <img src={Eye} className="w-4 h-4" />
        </button>
        <button className="bg-[#FDE4EA] rounded-full p-2" onClick={handleOpen}>
          <img src={Delete} className="w-4 h-4" />
        </button>
        <button className='bg-[#E4F1FF] rounded-full p-2' onClick={() => handleBlock(user.user_id)}>
          <img src={Block} className='w-4 h-4'/>
        </button>
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
      className="border border-[#9C9C9C] bg-[#edeff166] dark:bg-primary rounded-xl flex gap-2 items-center px-3 py-1 cursor-pointer relative"
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
      </div>
    </div>
      <DeleteUser open={open} handleClose={handleClose} handleDelete={handleDelete} />
      <BlockUser open={block} handleClose={handleCloseBlock} handleDelete={handleDelete} UserID={BlockUserId}/>
    </>
  );
}

export default UserList;



