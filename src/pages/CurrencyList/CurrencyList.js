import React,{useState,useEffect,useRef} from 'react';
import Search from '../../assets/search.png';
import Filter from '../../assets/filters.png';
import Searchbar from '../../components/Search';
import Dropdown from '../../assets/dropdown.png';
import UserProfile from '../../assets/user_profile.png'
import Eye from '../../assets/eye.png'
import Edit from '../../assets/edit.png'
import Delete from '../../assets/trash.png'
import {useGetAllPostQuery} from '../../store/api/AllPostList'
import Cookies from 'js-cookie'
import useApiPost from '../hooks/postData';
import formatTime from '../../components/formatTime'
import formatDate from '../../components/formatDate';
import { Link } from 'react-router-dom';
import Arrow from '../../assets/Showing_Arrow.png'

function PostList() {
  // Sample data for posts
  const [activePage,setActivePage] = useState(1)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [selectedValue, setSelectedValue] = useState("10");
const dropdownRef = useRef(null);

// Options for dropdown
const options = ["10", "25", "50","100"];

// Function to handle option selection
const handleSelect = (value) => {
  setSelectedValue(value);
  setIsDropdownOpen(false);
};

const token = Cookies.get("token")
console.log("Tokennnnnnnnnnnnnn",token)

const HashtagList = [
    {
        id:1,
        currency: "#Handyman",
        symbol: "$",
        code: "USD",
    },
   
]

// const { data, error, isLoading } = useGetAllPostQuery(token, {
//   skip: !token, // Skip API call if token is missing
// });

// const { data, error, isLoading, refetch,postData } = useApiPost()
// const handleGetPostList = async() => {
//   try{
//     const response = await postData("/get_all_latest_post_pagination",{page_no:activePage})
//   } catch(error){
//   }
// }

// // Refetch data when page number changes
// useEffect(() => {
//   handleGetPostList()
// }, [activePage,refetch]);

// const ActivePage = data?.rescent_post
// console.log("Post @@@ !!!",ActivePage)


// const pagination = data?.pagination;
// const lastPage = pagination?.last_page || 1;
// const currentPage = pagination?.current_page
// const AllPostList = data?.rescent_post || [];

// console.log("Current Page @@@",currentPage)

// console.log("Date @@@",formatDate("2024-12-09T13:48:09.000000Z"))

// console.log("All    @@@@ 111",AllPostList)

const lastPage = 2
const prev_page = 1
const next_page = 2

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
    <div className="mb-10 sm:pl-72">
      <Searchbar />

      {/* Title */}
      <div className="flex justify-between border-t-[#F2F2F2] py-3 px-6">
        <h2 className="text-[#000000] font-poppins text-xl font-semibold pt-3">Currency List</h2>
        <div className="relative">
          <div className="absolute flex items-center p-2 transform -translate-y-1/2 left-2 top-1/2">
            <img src={Search} alt="Search" className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="border border-gray-500 bg-[#00000005] border-opacity-10 rounded-lg w-[250px] py-2 pl-12 placeholder:text-sm placeholder:text-[#0000004F] focus:outline-none focus:ring-1 focus:ring-gray-600"
            placeholder="Search by user name..."
          />
        </div>
      </div>

      {/* Navigation Path */}
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link to="/dashboard"><h3 className="text-[#3A3A3A] font-poppins text-base font-semibold">Dashboard</h3></Link>
          <div className="rounded-full w-1 h-1 bg-[#E0E0E0]"></div>
          <h3 className="text-[#858585] font-poppins text-base">Currency List</h3>
        </div>
      </div>

      {/* Header Bar */}
    <div className="border border-[#E3E3E3] rounded-lg overflow-hidden mt-8 mx-6">
 
  {/* Table Header */}
  <div className="bg-[#452B7A] flex py-4 px-4 border-b text-left pl-16">
    <div className="w-[30%] text-[#FFFFFF] font-poppins text-sm">S.L</div>
    <div className="w-[40%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">CURRENCY NAME <button><img src={Dropdown} className="w-3 h-3"/></button></div>
    <div className="w-[40%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">SYMBOL <button><img src={Dropdown} className="w-3 h-3"/></button></div>
    <div className="w-[40%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">CURRENCY CODE <button><img src={Dropdown} className="w-3 h-3"/></button></div>
    <div className="w-[40%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">COUNTRY CODE <button><img src={Dropdown} className="w-3 h-3"/></button></div>
    <div className="w-[40%] text-[#FFFFFF] font-poppins text-sm">STATUS</div>
    <div className="w-[20%] text-[#FFFFFF] font-poppins text-sm">ACTIONS</div>
  </div>

  {/* Data Rows */}
  {HashtagList?.map((post, index) => (
    <div key={post.id} className="flex items-center px-4 py-3 pl-16 bg-white border-b last:border-0">
      {/* Serial Number */}
      <div className="w-[30%] text-[#000000] font-poppins text-sm">{index + 1}</div>

      {/* currency name */}
      <div className="w-[40%]">
        {/* <img src={post.post_images[0].url} className="object-cover rounded-lg w-14 h-14" /> */}
        <h2 className='font-poppins text-[#333333] text-base'>US Dollar</h2>
      </div>

      {/* symbol */}
      <div className="w-[40%] flex gap-2 items-center">
        <p className='text-[#000000] font-poppins font-semibold text-lg'>{post.symbol}</p>
      </div>

      {/* currency code */}
      <div className="w-[40%]">
        <h2 className="text-[#414141] font-poppins text-sm">{post.code}</h2>
        {/* <h2 className="text-[#7A7A7A] font-poppins text-xs">{formatTime(post.created_at)}</h2>  */}
      </div>

      {/* country code */}
      <div className='w-[40%]'>
      </div>

      {/* status */}
      <div className='w-[40%]'>
      </div>
      
      {/* Actions */}
      <div className="w-[20%] flex gap-4">
        <button className="bg-[#D0CCE1] bg-opacity-[57%] rounded-full p-2.5">
          <img src={Edit} className="w-5 h-5" />
        </button>
        <button className="bg-[#FDE4EA] rounded-full p-2.5">
          <img src={Delete} className="w-5 h-5" />
        </button>
      </div>
    </div>
  ))}

  {/* Pagination and Results Count */}
  <div className="flex justify-between px-10 py-2 bg-white">
    {/* Results Count */}
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
    Showing <span className="font-semibold text-[#000000] text-sm">10</span> results
  </p>
</div>

    {/* Pagination Buttons */}

   

  </div>
      </div>
    </div>
  );
}

export default PostList;





