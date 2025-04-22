import React,{useState,useEffect,useRef} from 'react';
import Search from '../../assets/search.png';
import Filter from '../../assets/filters.png';
import Searchbar from '../../components/Search';
import Dropdown from '../../assets/dropdown.png';
import DeactiveArrow from '../../assets/deactive_Arrow.png'
import { Link,useLocation,useNavigate } from 'react-router-dom';
import Arrow from '../../assets/Showing_Arrow.png'
import useApiPost from '../hooks/postData';
import formatDate from '../../components/formatDate';
import formatTime from '../../components/formatTime';
import Loader from '../../assets/Loader.gif'
import Cookies from 'js-cookie'

function BlockList() {
  // Sample data for posts
  const [activePage,setActivePage] = useState(1)
  const [selectedValue, setSelectedValue] = useState("10");
  const [order,setOrder] = useState("");
  const [category,setCategory] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [search,setSearch] = useState("")
  
  const { data, error, refetch,postData } = useApiPost()
const handleGetBlockList = async() => {
  setIsLoading(true)
  try{
    const response = await postData("/get_all_user_blocklist_pagination",{page_no:activePage,per_page:selectedValue,order:order,search:search,category:category})
  } catch(error){}
  finally{
    setIsLoading(false)
  }
}

// Refetch data when page number changes
useEffect(() => {
  handleGetBlockList()
}, [activePage,selectedValue,order,category,search,refetch]);

const ActivePage = data?.block_user
console.log("Post @@@ !!!",ActivePage)

const pagination = data?.pagination;
const lastPage = pagination?.last_page || 1;
const currentPage = pagination?.current_page
const AllBlockList = data?.block_user || [];
  
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const dropdownRef = useRef(null);

console.log("Block !!! @@@",AllBlockList)

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
      return AllBlockList.reduce((acc, post) => ({ ...acc, [post.post_id]: true }), {});
    });
  
    useEffect(() => {
      if (AllBlockList.length > 0) {
        setToggleStates(AllBlockList.reduce((acc, post) => ({ ...acc, [post.post_id]: true }), {}));
      }
    }, [AllBlockList]);
    
    const handleCheckboxChange = (postId) => {
      setToggleStates((prevStates) => ({
        ...prevStates,
        [postId]: !prevStates[postId], // Toggle only the clicked post
      }));
    };

  // To open User Profile 
  const [userId,setUserId] = useState("")
  const location = useLocation()
  const handleOpenUserProfile = (userId) => {
    const currentPath = location.pathname.split("/")[1]; // gets 'reel-list', 'user-list', etc.
    setUserId(userId);
    Cookies.set("userId", userId);
    navigate(`/${currentPath}/user-profile`);
  };

  return (
    // <div className="mb-10 pl-72">
    <div className="light:mb-10 xl:pl-72 dark:bg-primary bg-secondary">
      <Searchbar />

      {/* Title */}
      <div className="flex justify-between border-t-[#F2F2F2] py-3 px-6">
        <h2 className="text-[#000000] font-poppins dark:text-darkText text-xl font-semibold pt-3">Block List</h2>
        <div className="relative">
          <div className="absolute flex items-center p-2 transform -translate-y-1/2 left-2 top-1/2">
            <img src={Search} alt="Search" className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="border border-gray-500 dark:placeholder:text-tableDarkLarge dark:text-darkText bg-[#00000005] w-[250px] border-opacity-10 rounded-lg py-2 pl-12 placeholder:text-sm placeholder:text-[#0000004F] focus:outline-none focus:ring-1 focus:ring-gray-600"
            placeholder="Search by BlockedTo username"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </div>

      {/* Navigation Path */}
      <div className="flex items-center justify-between px-6 mb-3">
        <div className="flex items-center gap-2">
          <Link to="/dashboard"><h3 className="text-[#3A3A3A] dark:text-darkText font-poppins text-base font-semibold">Dashboard</h3></Link>
          <div className="rounded-full w-1 h-1 bg-[#E0E0E0]"></div>
          <h3 className="text-[#858585] font-poppins text-base">Block List</h3>
        </div>
      </div>

      {/* Header Bar */}
      <div className="border border-[#E3E3E3] dark:border-[#1f1f1f] rounded-lg overflow-hidden mt-8 mx-6">
  {/* Table Header */}
  <div className="flex px-4 py-4 pl-16 text-left border-b dark:border-b-[#1F1F1F] bg-header">
    <div className="w-[30%] text-[#FFFFFF] font-poppins text-sm">S.L </div>
    {/* Date/Time */}
    <div className="w-[45%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">DATE/TIME 
      <div className='flex flex-col'>
        <button onClick={() => {setOrder("0"); setCategory("Date/Time")}}>
          <img src={category === "Date/Time" && order === "0" ? Dropdown : DeactiveArrow} className='w-2 h-2 rotate-180'/>
        </button>
        <button onClick={() => {setOrder("1"); setCategory("Date/Time")}}>
          <img src={category === "Date/Time" && order === "1" ? Dropdown : DeactiveArrow} className='w-2 h-2'/>
        </button>
      </div>
    </div>
    {/* Blocked To */}
    <div className='w-[50%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2'> BLOCKED TO
      <div className='flex flex-col'>
        <button onClick={() => {setOrder("0"); setCategory("Blocked User")}}>
          <img src={category === "Blocked User" && order === "0" ? Dropdown : DeactiveArrow} className='w-2 h-2 rotate-180'/>
        </button>
        <button onClick={() => {setOrder("1"); setCategory("Blocked User")}}>
          <img src={category === "Blocked User" && order === "1" ? Dropdown : DeactiveArrow} className='w-2 h-2'/>
        </button>
      </div>
    </div>
    {/* Blocked By */}
    <div className="w-[35%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">BLOCKED BY
      <div className='flex flex-col'>
        <button onClick={() => {setOrder("0"); setCategory("Blocked By")}}>
          <img src={category === "Blocked By" && order === "0" ? Dropdown : DeactiveArrow} className='w-2 h-2 rotate-180'/>
        </button>
        <button onClick={() => {setOrder("1"); setCategory("Blocked By")}}>
          <img src={category === "Blocked By" && order === "1" ? Dropdown : DeactiveArrow} className='w-2 h-2'/>
        </button>
      </div>
    </div>
  </div>

  {/* Data Rows */}
  {AllBlockList.map((block, index) => (
    <div key={block.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-primary' : 'bg-[#00162e0a] dark:bg-primary'} flex dark:border-b-[#1F1F1F] items-center px-4 py-3 pl-16 border-b last:border-0`}>

      {/* Serial Number */}
      <div className="w-[30%] text-[#000000] dark:text-darkText font-poppins text-sm">{index + 1}</div>

      {/* DATE/TIME */}
      <div className="w-[45%]">
        <h2 className="text-[#00162e] dark:text-darkText font-poppins text-sm">{formatDate(block.created_at)}</h2>
        <h2 className="text-[#7A7A7A] dark:text-tableDarkLarge font-poppins text-xs">{formatTime(block.created_at)}</h2> 
      </div>

      {/* BLOCKED TO */}
      <div className="2xl:w-[50%] xl:w-[25%] lg:w-[20%] flex gap-2 items-center">
        <img src={block.block_profile_pic} className="w-12 h-12 rounded-full"/>
        <div>
          <h2 className="text-[#00162e] dark:text-darkText font-poppins text-sm font-semibold cursor-pointer" onClick={() => handleOpenUserProfile(block.user_id)}>{block.block_username}</h2>
          <p className="text-xs text-[#777777] dark:text-tableDarkLarge font-poppins">{block.block_email}</p>
        </div>
      </div>

      {/* BLOCKED BY */}
      <div className="2xl:w-[35%] xl:w-[25%] lg:w-[20%] flex gap-2 items-center">
        <img src={block.block_by_profile_pic} className="w-12 h-12 rounded-full"/>
        <div>
          <h2 className="text-[#00162e] dark:text-darkText font-poppins text-sm font-semibold cursor-pointer" onClick={() => handleOpenUserProfile(block.block_user_id)}>{block.block_by_username}</h2>
          <p className="text-xs text-[#777777] dark:text-tableDarkLarge font-poppins">{block.block_by_email}</p>
        </div>
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
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
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
      Showing <span className="font-semibold text-[#000000] dark:text-darkText text-sm">{pagination?.total}</span> results
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
            ${activePage === page ? "text-white bg-button-gradient" : "text-black hover:bg-gray-200"}`}
          onClick={() => setActivePage(page)}
        >
          {page}
        </button>
      );
    })}
  
    {/* Next Button */}
    <button 
      className={`text-[#000000] dark:text-darkText text-sm font-poppins px-3 py-1 rounded-full transition-all duration-200 
        ${pagination?.next_page > lastPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:text-darkText"}`}
      onClick={() => setActivePage(prev => (prev < lastPage ? prev + 1 : prev))}
      disabled={pagination?.next_page > lastPage}
    >
      Next
    </button>
  </div>
  
    </div>
      </div>


      
    </div>
  );
}

export default BlockList;

