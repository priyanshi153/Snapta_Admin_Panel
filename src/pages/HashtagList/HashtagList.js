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
import { Link } from 'react-router-dom';
import Arrow from '../../assets/Showing_Arrow.png'
import AddHashtag from './AddHashtagListDialog';
import Add from '../../assets/add.png'
import useApiPost from '../hooks/postData';
import DeactiveArrow from '../../assets/deactive_Arrow.png'
import Loader from '../../assets/Loader.gif'
import DeleteHashtag from './DeleteHashtag';

function PostList() {
  // Sample data for posts
  const [activePage,setActivePage] = useState(1)
  const [isLoading,setIsLoading] = useState(false)
  const [order,setOrder] = useState("")
  const [category,setCategory] = useState("")
  const {data,error,refetch,postData} = useApiPost()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("10");
  const [hashtagId,setHashtagId] = useState("")
  const dropdownRef = useRef(null);
  const [search,setSearch] = useState("")

// Options for dropdown
const options = ["10", "25", "50","100"];

// Function to handle option selection
const handleSelect = (value) => {
  setSelectedValue(value);
  setIsDropdownOpen(false);
};

// To get HashtagList 
const handleGetHashtagList = async() => {
  setIsLoading(true)
  try{
    const response = await postData("/get_all_hashtag_pagination",{page_no:activePage,per_page:selectedValue,order:order,category:category,search:search})
  } catch(error){
  } finally{
    setIsLoading(false)
  }
}

useEffect(() => {
  handleGetHashtagList()
}, [activePage,selectedValue,order,category,search,refetch]);

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

// To open Add Hashtag Dialog
const [open,setOpen] = useState(false)
const handleOpen = () => { setOpen(true) }
const handleClose = () => 
  { 
    setOpen(false) 
    handleGetHashtagList() 
  }

  // To open Delete Hashtag Dialog 
  const [openDelete,setOpenDelete] = useState(false)
  const handleOpenDelete = (HashtagId) => {
    setOpenDelete(true)
    setHashtagId(HashtagId)
  }

  const handleCloseDelete = (HashtagId) => {
    setOpenDelete(false)
    setHashtagId(HashtagId)
  }

  return (
    <>
    {/* <div className="mb-10 xl:pl-72"> */}
    <div className="light:mb-10 xl:pl-72 dark:bg-primary bg-secondary">
      <Searchbar />

      {/* Title */}
      <div className="flex justify-between border-t-[#F2F2F2] py-3 px-6">
        <h2 className="text-[#000000] dark:text-darkText font-poppins text-xl font-semibold pt-3">Hashtag List</h2>
        {/* Add Hashtag button */}
        <button className='flex gap-1.5 place-items-center px-4 text-sm font-poppins font-medium text-[#FFFFFF] rounded-xl bg-button-gradient' onClick={handleOpen}>
          <img src={Add} className='w-4 h-4' />
          <p>Add Hashtag</p>
        </button>
      </div>

      {/* Navigation Path */}
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link to="/dashboard"><h3 className="text-[#3A3A3A] dark:text-darkText font-poppins text-base font-semibold">Dashboard</h3></Link>
          <div className="rounded-full w-1 h-1 bg-[#E0E0E0]"></div>
          <h3 className="text-[#858585] font-poppins text-base">Hashtag List</h3>
        </div>
        {/* Search by username */}
        <div className="relative">
          <div className="absolute flex items-center p-2 transform -translate-y-1/2 left-2 top-1/2">
            <img src={Search} alt="Search" className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="border border-gray-500 bg-[#00000005] dark:text-darkText placeholder:dark:text-tableDarkLarge border-opacity-10 rounded-lg w-[250px] py-2 pl-12 placeholder:text-sm placeholder:text-[#0000004F] focus:outline-none focus:ring-1 focus:ring-gray-600"
            placeholder="Search by Hashtag Word..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </div>

      {/* Header Bar */}
    <div className="border border-[#E3E3E3] dark:border-[#1F1F1F] rounded-lg overflow-hidden mt-8 mx-6">
 
  {/* Table Header */}
  <div className="flex px-4 py-4 pl-16 text-left border-b dark:border-b-[#1F1F1F] bg-header">
    <div className="w-[50%] text-[#FFFFFF] font-poppins text-sm ">S.L </div>
    <div className="w-[65%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">HASHTAG WORD 
      <div className='flex flex-col'>
            <button onClick={() => { setOrder("0"); setCategory("Text"); }}>
              <img src={category === "Text" && order==="0" ? Dropdown : DeactiveArrow} className={`w-2 h-2 rotate-180 transition`} />
            </button>
            <button onClick={() => { setOrder("1"); setCategory("Text"); }}>
              <img src={category === "Text" && order === "1" ? Dropdown : DeactiveArrow} className={`w-2 h-2 transition`} />
            </button>
      </div>
    </div>
    <div className="w-[65%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">POST COUNT 
    <div className='flex flex-col'>
            <button onClick={() => { setOrder("0"); setCategory("PostCount"); }}>
              <img src={category === "PostCount" && order==="0" ? Dropdown : DeactiveArrow} className={`w-2 h-2 rotate-180 transition`} />
            </button>
            <button onClick={() => { setOrder("1"); setCategory("PostCount"); }}>
              <img src={category === "PostCount" && order === "1" ? Dropdown : DeactiveArrow} className={`w-2 h-2 transition`} />
            </button>
      </div>
    </div>
    <div className="w-[65%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">REEL COUNT 
    <div className='flex flex-col'>
            <button onClick={() => { setOrder("0"); setCategory("ReelCount"); }}>
              <img src={category === "ReelCount" && order==="0" ? Dropdown : DeactiveArrow} className={`w-2 h-2 rotate-180 transition`} />
            </button>
            <button onClick={() => { setOrder("1"); setCategory("ReelCount"); }}>
              <img src={category === "ReelCount" && order === "1" ? Dropdown : DeactiveArrow} className={`w-2 h-2 transition`} />
            </button>
      </div>
    </div>
    <div className="w-[25%] text-[#FFFFFF] font-poppins text-sm">ACTIONS </div>
  </div>

  {/* Data Rows */}
  {AllHashtagList?.map((hashtag, index) => (
    <div key={hashtag.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-primary' : 'bg-[#00162e0a] dark:bg-primary'} flex dark:border-b-[#1F1F1F] items-center px-4 py-3 pl-16 border-b last:border-0`}>

      {/* Serial Number */}
      <div className="w-[50%] text-[#000000] dark:text-darkText font-poppins text-sm">{index + 1}</div>

      {/* Hashtag Word */}
      <div className="w-[65%]">
        {/* <img src={post.post_images[0].url} className="object-cover rounded-lg w-14 h-14" /> */}
        <h2 className='font-poppins text-[#333333] dark:text-darkText text-sm'>{hashtag.text}</h2>
      </div>

      {/* count */}
      <div className="w-[65%] flex gap-2 items-center">
        <p className='text-[#414141] font-poppins dark:text-tableDarkLarge text-sm'>{hashtag.post_hashtag_count} post</p>
      </div>

      {/* created date */}
      <div className="w-[65%]">
        <h2 className="text-[#414141] font-poppins dark:text-tableDarkLarge text-sm">{hashtag.reel_hashtag_count} reel</h2>
        {/* <h2 className="text-[#7A7A7A] font-poppins text-xs">{formatTime(post.created_at)}</h2>  */}
      </div>
      
      {/* Actions */}
      <div className="w-[25%] flex gap-4">
        <button className="bg-[#D0CCE1] bg-opacity-[57%] rounded-full p-2">
          <img src={Edit} className="w-4 h-4" />
        </button>
        <button className="bg-[#FDE4EA] rounded-full p-2" onClick={() => handleOpenDelete(hashtag.id)}>
          <img src={Delete} className="w-4 h-4" />
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
      className="border border-[#9C9C9C] dark:bg-primary bg-[#edeff166] rounded-xl flex gap-2 items-center px-3 py-1 cursor-pointer relative"
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
      <p className="text-[#00162e] font-poppins dark:text-darkText">{selectedValue}</p>
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
    <AddHashtag open={open} handleClose={handleClose} refetch={refetch}/>
    <DeleteHashtag open={openDelete} handleClose={handleCloseDelete} hashtagId={hashtagId} />
    </>
  );
}

export default PostList;





