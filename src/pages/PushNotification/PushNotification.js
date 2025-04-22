import React,{useState,useRef,useEffect} from 'react'
import Searchbar from '../../components/Search'
import Search from '../../assets/search.png';
import { Link } from 'react-router-dom';
import Dropdown from '../../assets/dropdown.png';
import Filter from '../../assets/filters.png';
import Edit from '../../assets/edit.png'
import Delete from '../../assets/trash.png'
import Arrow from '../../assets/Showing_Arrow.png'
import Logo from '../../assets/logo.png'   //Ziogram logo
import logo from '../../assets/SnaptaLogo.png'
import Add from '../../assets/add.png'
import PushNotificationDialog from './PushNotificationDialog'
import useApiPost from '../hooks/postData';
import Loader from '../../assets/Loader.gif'

function PushNotification() 
{
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("100");
    const dropdownRef = useRef(null);
    const [activePage,setActivePage] = useState(1)
    const [isLoading,setIsLoading] = useState(false)
    const {data,refetch,postData} = useApiPost()
    const [search,setSearch] = useState("")

    const handleGetNotificationList = async() => {
      setIsLoading(true)
      try{
        const response = await postData("/admin_notification_list",{page_no:activePage,per_page:selectedValue,search:search})
      } catch(error){
      } finally{
        setIsLoading(false)
      }
    }
    
    useEffect(() => {
      handleGetNotificationList()
    }, [activePage,selectedValue,search,refetch]);

    const pagination = data?.pagination;
const lastPage = pagination?.last_page || 1;
const currentPage = pagination?.current_page
const AllNotificationList = data?.detail || [];

    // handle Pagination 

    const handleSelect = (value) => {
        setSelectedValue(value);
        setIsDropdownOpen(false);
      };

    const [open,setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
      setOpen(false)
      handleGetNotificationList()
    }

    // To close dropdown on outside click
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

    const options = ["10", "25", "50","100"];
    
    return(
        <>
          {/* <div className='mb-10 pl-72'> */}
    <div className="light:mb-10 xl:pl-72 dark:bg-primary bg-secondary">
            <Searchbar />

              {/* Title */}
      <div className="flex justify-between border-t-[#F2F2F2] py-3 px-6">
        <h2 className="text-[#000000] font-poppins text-xl font-semibold pt-3 dark:text-darkText">Push Notification</h2>
        {/* Push notification button */}
        <button className='flex gap-1.5 place-items-center px-4 text-sm font-poppins font-medium text-[#FFFFFF] rounded-xl bg-button-gradient' 
        onClick={handleOpen}>
            <img src={Add} className='w-4 h-4' />
            <p>Push Notification</p>
        </button>
      </div>

      {/* Navigation Path */}
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link to="/dashboard"><h3 className="text-[#3A3A3A] font-poppins text-base dark:text-darkText font-semibold">Dashboard</h3></Link>
          <div className="rounded-full w-1 h-1 bg-[#E0E0E0]"></div>
          <h3 className="text-[#858585] font-poppins text-base">Push Notification</h3>
        </div>
        <div className="relative">
          <div className="absolute flex items-center p-2 transform -translate-y-1/2 left-2 top-1/2">
            <img src={Search} alt="Search" className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="border border-gray-500 dark:placeholder:text-tableDarkLarge dark:text-darkText bg-[#00000005] border-opacity-10 rounded-lg w-[250px] py-2 pl-12 placeholder:text-sm placeholder:text-[#0000004F] focus:outline-none focus:ring-1 focus:ring-gray-600"
            placeholder="Search Title"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

      </div>

      {/* Header Bar */}
    <div className="border border-[#E3E3E3] dark:border-[#1F1F1F] rounded-lg overflow-hidden mt-8 mx-6">
 
  {/* Table Header */}
  <div className="flex px-4 py-4 pl-16 text-left border-b border-b-[#1F1F1F] bg-header">
    <div className="w-[8%] text-[#FFFFFF] font-poppins text-sm ">S.L </div>
    <div className="w-[20%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">TITLE</div>
    <div className="w-[70%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">DESCRIPTION</div>
  </div>

  {/* Data Rows */}
  {AllNotificationList?.map((notification, index) => (
    <div key={notification.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-primary' : 'bg-[#00162e0a] dark:bg-primary'} flex items-center dark:border-b-[#1F1F1F] px-4 py-3 pl-16 border-b last:border-0`}>

      {/* Serial Number */}
      <div className="w-[8%] text-[#000000] dark:text-darkText font-poppins text-sm">{index + 1}</div>

      {/* Title */}
      <div className="w-[20%] flex gap-3 place-items-center">
        <div className='border rounded-md border-opacity-gradient dark:border-[#1F1F1F]'> <img src={logo} className="object-cover p-2 rounded-lg w-11 h-11" /> </div>
        <h2 className='font-poppins text-[#000000] dark:text-darkText font-semibold text-sm'>{notification.title}</h2>
      </div>

      {/* Description */}
      <div className="w-[70%] flex gap-2 items-center">
        <p className='text-[#333333] font-poppins text-sm dark:text-darkText'>{notification.message}</p>
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
  <p className="text-[#484848] font-poppins text-sm dark:text-gray-500">Showing <span className="font-semibold text-[#000000] text-sm dark:text-darkText">{pagination?.total}</span> results</p>
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

          <PushNotificationDialog open={open} handleClose={handleClose} handleOpen={handleOpen} />
        </>
    )
}

export default PushNotification;