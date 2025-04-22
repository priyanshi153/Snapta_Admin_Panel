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
import Loader from '../../assets/Loader.gif'


function HashtagList() {
  // Sample data for posts
  const [activePage,setActivePage] = useState(1)
  const [isLoading,setIsLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [selectedValue, setSelectedValue] = useState("10");
const [order,setOrder] = useState("")
const [category,setCategory] = useState("")
const dropdownRef = useRef(null);

// Options for dropdown
const options = ["10", "25", "50","100"];

// Function to handle option selection
const handleSelect = (value) => {
  setSelectedValue(value);
  setIsDropdownOpen(false);
};

const {data,error,refetch,postData} = useApiPost()
const [Data,setData] = useState("")
const handleGetHashtagList = async() => {
  setIsLoading(true)
  try{
    const response = await postData("/get_all_hashtag_pagination",{page_no:activePage,per_page:selectedValue,order:order,category:category})
  } catch(error){
  } finally{
    setIsLoading(false)
  }
}

useEffect(() => {
  handleGetHashtagList()
}, [activePage,selectedValue,order,category,refetch]);

const ActivePage = data?.tag_users
console.log("Post @@@ !!!",ActivePage)

const pagination = data?.pagination;
const lastPage = pagination?.last_page || 1;
const currentPage = pagination?.current_page
const AllHashtagList = data?.tag_users || [];


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
    <div className='border border-[#D1D5DB] dark:border-[#1F1F1F] 2xl:w-[60%] rounded-lg px-4 py-5'>
      {/* Title and View All */}
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#000000] font-poppins text-base font-semibold dark:text-darkText">Popular Hashtags</h2>
            <Link to="/hashtag-list"><p className="cursor-pointer text-[#484848] text-sm underline font-poppins">View All</p></Link>
        </div>

      {/* Header Bar */}
    <div className="border border-[#E3E3E3] dark:border-[#1F1F1F] rounded-lg 2xl:overflow-hidden overflow-x-auto xl:overflow-auto md:overflow-x-auto sm:overflow-x-auto">
 
  {/* Table Header */}
  <div className="flex px-4 py-4 text-left border-b dark:border-[#1F1F1F] bg-header ">
    <div className="w-[10%] text-[#FFFFFF] font-poppins text-sm ">S.L </div>
    <div className="w-[40%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">HASHTAG WORD </div>
    <div className="w-[25%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">POST COUNT</div>
    <div className="w-[25%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">REEL COUNT</div>
  </div>

  {/* Data Rows */}
  {AllHashtagList?.slice(0,9).map((hashtag, index) => (
    <div key={hashtag.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-primary' : 'bg-[#00162e0a] dark:bg-primary'} flex items-center px-4 py-3 dark:border-b-[#1F1F1F] border-b last:border-0`}>

      {/* Serial Number */}
      <div className="w-[10%] text-[#000000] dark:text-darkText font-poppins text-sm">{index + 1}</div>

      {/* Hashtag Word */}
      <div className="w-[40%]">
        <h2 className='font-poppins text-[#333333] text-sm dark:text-darkText'>{hashtag.text}</h2>
      </div>

      {/* count */}
      <div className="w-[25%] flex gap-2 items-center">
        <p className='text-[#414141] font-poppins text-sm dark:text-gray-500'>{hashtag.post_hashtag_count} post</p>
      </div>

      {/* created date */}
      <div className="w-[25%]">
        <h2 className="text-[#414141] font-poppins text-sm dark:text-gray-500">{hashtag.reel_hashtag_count} reel</h2>
        {/* <h2 className="text-[#7A7A7A] font-poppins text-xs">{formatTime(post.created_at)}</h2>  */}
      </div>
    </div>
  ))}

 
      </div>
      {isLoading && (
                <div className='flex justify-center py-60'><img src={Loader} alt="loader" height={50} width={50}/></div>
               )}
    </div>
  );
}

export default HashtagList;





