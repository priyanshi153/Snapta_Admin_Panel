import React,{useState,useRef,useEffect} from 'react';
import Search from '../../assets/search.png';
import Filter from '../../assets/filters.png';
import Searchbar from '../../components/Search';
import Dropdown from '../../assets/dropdown.png';
import UserProfile from '../../assets/user_profile.png'
import Eye from '../../assets/eye.png'
import Edit from '../../assets/edit.png'
import Delete from '../../assets/trash.png'
import Post1 from '../../assets/Post1.png'
import Post2 from '../../assets/Post1.png'
import { useGetAllReelQuery } from '../../store/api/AllReelList';
import Cookies from 'js-cookie'
import useApiPost from '../hooks/postData';
import formatDate from '../../components/formatDate';
import formatTime from '../../components/formatTime';
import { Link } from 'react-router-dom';
import Arrow from '../../assets/Showing_Arrow.png'

function WithdrawRequestList() {
  // Sample data for posts
  const [activePage,setActivePage] = useState(1)
const token = Cookies.get("token")
 
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [selectedValue, setSelectedValue] = useState("15");
const dropdownRef = useRef(null);

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

  const Withdraw = [
    {
        id:1,
        username:"abc",
        amount: "$120",
        coin: 150,
        getaway: "Gpay",
        date: "August 4th,2025",
        status: "pending"
    },
    {
        id:2,    
        username:"def",
        amount:"$140",
        coin:160
    }
  ]

  const [isChecked, setIsChecked] = useState(false)
  
  const handleCheckboxChange = () => {
      setIsChecked(!isChecked)
    }

  return (
    <div className="mb-10 pl-72">
      <Searchbar />

      {/* Title */}
      <div className="flex justify-between border-t-[#F2F2F2] py-3 px-6">
        <h2 className="text-[#000000] font-poppins text-xl font-semibold pt-3">Withdraw Request List</h2>
        <div className="relative">
          <div className="absolute flex items-center p-2 transform -translate-y-1/2 left-2 top-1/2">
            <img src={Search} alt="Search" className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="border border-gray-500 bg-[#00000005] w-[250px] border-opacity-10 rounded-lg py-2 pl-12 placeholder:text-sm placeholder:text-[#0000004F] focus:outline-none focus:ring-1 focus:ring-gray-600"
            placeholder="Search by user name..."
          />
        </div>
      </div>

      {/* Navigation Path */}
      <div className="flex items-center justify-between px-6 mb-3">
        <div className="flex items-center gap-2">
          <Link to="/dashboard"><h3 className="text-[#3A3A3A] font-poppins text-base font-semibold">Dashboard</h3></Link>
          <div className="rounded-full w-1 h-1 bg-[#E0E0E0]"></div>
          <h3 className="text-[#858585] font-poppins text-base">Withdraw Request List</h3>
        </div>
        <button className="flex gap-3 border border-[#EDEAF3] p-2 rounded-lg place-content-center place-items-center">
          <img src={Filter} className="w-3.5 h-3.5" />
          <h2 className="text-[#000000] font-poppins font-medium text-sm">Filters</h2>
        </button>
      </div>

      {/* Header Bar */}
      <div className="border border-[#E3E3E3] rounded-lg overflow-hidden mt-8 mx-6">
  {/* Table Header */}
  <div className="bg-[#452B7A] flex py-4 px-4 border-b text-left pl-16">
    <div className="w-[10%] text-[#FFFFFF] font-poppins text-sm  gap-2">S.L </div>
    <div className="w-[18%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">USERNAME <button><img src={Dropdown} className="w-3 h-3"/></button></div>
    <div className="w-[15%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">REQUEST AMOUNT <button><img src={Dropdown} className="w-3 h-3"/></button></div>
    <div className="w-[10%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">COIN <button><img src={Dropdown} className="w-3 h-3"/></button></div>
    <div className="w-[15%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">PAYMENT GATEWAY <button><img src={Dropdown} className="w-3 h-3"/></button></div>
    <div className="w-[15%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">DATE OF REQUEST <button><img src={Dropdown} className="w-3 h-3"/></button></div>
    <div className="w-[10%] text-[#FFFFFF] font-poppins text-sm">STATUS</div>
    <div className="w-[10%] text-[#FFFFFF] font-poppins text-sm">ACTIONS</div>
  </div>

  {/* Data Rows */}
  {/* {AllReelList?.map((reel, index) => ( */}
    <div className="flex items-center px-4 py-3 pl-16 bg-white border-b last:border-0">
      {/* Serial Number */}
      <div className="w-[10%] text-[#000000] font-poppins text-sm">
        1
      </div>

      {/* Username */}
      <div className="w-[18%] flex gap-2 items-center">
        <img src={UserProfile} alt="profile" className="w-12 h-12 rounded-full"/>
        <div>
          <h2 className="text-[#000000] font-poppins text-sm font-semibold">Alena Lubin</h2>
          <p className="text-xs text-[#939393] font-poppins">alena12@gmail.com</p>
        </div>
      </div>

      {/* Request Amount */}
      <div className="w-[15%] flex gap-2 items-center">
        <p className='text-[#333333] font-poppins text-sm font-medium'>$250</p>
      </div>

      {/* Coin */}
      <div className="w-[10%]">
        <p className='text-[#333333] font-poppins font-medium text-sm'>150</p>
      </div>

      {/* Payment Getaway */}
      <div className="w-[15%]">
        <p className='text-[#333333] font-poppins font-medium text-sm'>Gpay</p>
      </div>

      {/* Date of request */}
      <div className="w-[15%]">
        <p className='text-[#414141] font-poppins font-medium text-sm'>August 6,2023</p>
      </div>

      {/* Status */}
      <div className="w-[10%]">
        <p className='text-[#00B61B] font-poppins font-medium text-sm'>Paid</p>
      </div>

      {/* Actions */}
      <div className="w-[10%] flex gap-4">
        <button className="bg-[#FDE4EA] rounded-full p-2.5">
          <img src={Delete} className="w-5 h-5" />
        </button>
      </div>
    </div>
  {/* ))} */}
{/* </div> */}






  {/* Pagination and Results Count */}
  <div className="flex justify-between px-10 py-6 bg-white">
      {/* Results Count */}
      <div className="relative flex gap-2 place-items-center" ref={dropdownRef}>
    {/* Dropdown Button */}
    <div
      className="border border-[#9C9C9C] rounded-xl flex gap-2 items-center px-3 py-1 cursor-pointer relative"
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      <p className="text-[#9C9C9C] font-poppins">{selectedValue}</p>
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
            onClick={() => handleSelect(option)}
          >
            {option}
          </p>
        ))}
      </div>
    )}
  
    {/* Results Text */}
    <p className="text-[#484848] font-poppins text-sm">
      Showing <span className="font-semibold text-[#000000] text-sm">07</span> results
    </p>
  </div>
  
      {/* Pagination Buttons */}
      <div className="flex items-center">
        <button 
          className={`text-[#000000] text-sm font-poppins px-3 py-1 rounded-full transition-all duration-200 ${
            activePage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
          }`}
          onClick={() => setActivePage(prev => (prev > 1 ? prev - 1 : prev))}
          disabled={activePage === 1}
        >
          Previous
        </button>
  
        {[1, 2].map((page) => (
          <button 
            key={page} 
            className={`text-sm font-poppins px-3 py-1 rounded-full transition-all duration-200 ${
              activePage === page ? "text-white" : "text-black hover:bg-gray-200"
            }`}
            style={{
              background: activePage === page 
                ? "linear-gradient(213deg, #6C47B7 -27.59%, #341F60 105.15%)" 
                : "transparent"
            }}
            onClick={() => setActivePage(page)}
          >
            {page}
          </button>
        ))}
  
        <button 
          className={`text-[#000000] text-sm font-poppins px-3 py-1 rounded-full transition-all duration-200 ${
            activePage === 2 ? "opacity-50 cursor-not-allowed" : "text-[#000000]"
          }`}
          onClick={() => setActivePage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
      </div>


      
    </div>
  );
}

export default WithdrawRequestList;

