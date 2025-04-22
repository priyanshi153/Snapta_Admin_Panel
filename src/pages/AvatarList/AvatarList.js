import React,{useState,useEffect,useRef} from 'react';
import Search from '../../assets/search.png';
import Searchbar from '../../components/Search';
import Dropdown from '../../assets/dropdown.png';
import Edit from '../../assets/edit.png'
import Delete from '../../assets/trash.png'
import { Link } from 'react-router-dom';
import Arrow from '../../assets/Showing_Arrow.png'
import useApiPost from '../hooks/postData';
import Loader from '../../assets/Loader.gif'
import Add from '../../assets/add.png'
import AddAvatar from './AddAvatarDialog';
import DeleteAvatar from './DeleteAvatar';

function PostReportList() {
  // Sample data for posts
  const [activePage,setActivePage] = useState(1)
  const [selectedValue, setSelectedValue] = useState("10");
  const [isLoading,setIsLoading] = useState(false)
  const [order,setOrder] = useState("");
  const [category,setCategory] = useState("")
  
  const { data, error,refetch,postData } = useApiPost()
const handleGetReportList = async() => {
  setIsLoading(true)
  try{
    const response = await postData("/get_all_avtar_pagination",{page_no:activePage,per_page:selectedValue})
  } catch(error){}
  finally{
    setIsLoading(false)
  }
}

// Refetch data when page number changes
useEffect(() => {
  handleGetReportList()
}, [activePage,selectedValue,refetch]);

const ActivePage = data?.avtar_list
console.log("Post @@@ !!!",ActivePage)

const pagination = data?.pagination;
const lastPage = pagination?.last_page || 1;
const currentPage = pagination?.current_page
const AllAvtarList = data?.avtar_list || [];
  
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const dropdownRef = useRef(null);

console.log("Avtar @@@",AllAvtarList)

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
      return AllAvtarList.reduce((acc, post) => ({ ...acc, [post.post_id]: true }), {});
    });
  
    useEffect(() => {
      if (AllAvtarList.length > 0) {
        setToggleStates(AllAvtarList.reduce((acc, post) => ({ ...acc, [post.post_id]: true }), {}));
      }
    }, [AllAvtarList]);
    
    const handleCheckboxChange = (postId) => {
      setToggleStates((prevStates) => ({
        ...prevStates,
        [postId]: !prevStates[postId], // Toggle only the clicked post
      }));
    };

  // to handle Add Avtar dialog open 
  const [open,setOpen] = useState(false)
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => 
    { 
      setOpen(false) 
      handleGetReportList()
    }

  // to open Delete avatar dialog open 
  const [openDelete,setOpenDelete] = useState(false)
  const [avatarId,setAvatarId] = useState("")
  
  const handleOpenDelete = (AvatarId) => {
    setOpenDelete(true)
    setAvatarId(AvatarId)
  }

  const handleCloseDelete = () => {
    setOpenDelete(false)
    handleGetReportList()
  }

  return (
    <>
    {/* <div className="mb-10 pl-72"> */}
    <div className="light:mb-10 xl:pl-72 dark:bg-primary bg-secondary">
      <Searchbar />

      {/* Title */}
      <div className="flex justify-between border-t-[#F2F2F2] py-3 px-6">
        <h2 className="text-[#000000] font-poppins text-xl font-semibold pt-3 dark:text-darkText">Avatar List</h2>
        <button className='flex gap-1.5 place-items-center px-4 text-sm font-poppins font-medium text-[#FFFFFF] rounded-xl bg-button-gradient' 
            onClick={() => handleOpen()}>
          <img src={Add} className='w-4 h-4' />
          <p className='font-poppins text-[#FFFFFF]'>Add Avatar</p>
        </button>
      </div>

      {/* Navigation Path */}
      <div className="flex items-center justify-between px-6 mb-3">
        <div className="flex items-center gap-2">
          <Link to="/dashboard"><h3 className="text-[#3A3A3A] font-poppins text-base font-semibold dark:text-darkText">Dashboard</h3></Link>
          <div className="rounded-full w-1 h-1 bg-[#E0E0E0]"></div>
          <h3 className="text-[#858585] font-poppins text-base">Avatar List</h3>
        </div>
        <div className="relative">
          <div className="absolute flex items-center p-2 transform -translate-y-1/2 left-2 top-1/2">
            <img src={Search} alt="Search" className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="border border-gray-500 bg-[#00000005] placeholder:dark:text-tableDarkLarge w-[250px] border-opacity-10 rounded-lg py-2 pl-12 placeholder:text-sm placeholder:text-[#0000004F] focus:outline-none focus:ring-1 focus:ring-gray-600"
            placeholder="Search by avatar name..."
          />
        </div>
      </div>

      {/* Header Bar */}
      <div className="border border-[#E3E3E3] dark:border-[#1F1F1F] rounded-lg overflow-hidden mt-8 mx-6">
  {/* Table Header */}
  <div className="flex px-4 py-4 pl-16 text-left border-b dark:border-b-[#1F1F1F] bg-header">
    <div className="w-[15%] text-[#FFFFFF] font-poppins text-sm">S.L </div>
    {/* Avatar Image */}
    <div className="w-[25%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">AVATAR IMAGE </div>
    {/* Avatar Name */}
    <div className='w-[25%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2'>AVATAR NAME
      <div className='flex flex-col'>
        <button>
          <img src={Dropdown} className='w-2 h-2 rotate-180'/>
        </button>
        <button>
          <img src={Dropdown} className='w-2 h-2'/>
        </button>
      </div>
    </div>
    {/* Avatar Gender */}
    <div className='w-[25%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2'> AVATAR GENDER </div>
    {/* Actions */}
    <div className="w-[13%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">ACTIONS</div>
  </div>

  {/* Data Rows */}
  {AllAvtarList.map((avtar, index) => (
    <div  className={`${index % 2 === 0 ? 'bg-white dark:bg-primary' : 'bg-[#00162e0a] dark:bg-primary'} flex items-center px-4 py-3 pl-16 border-b dark:border-b-[#1F1F1F] last:border-0`}>

      {/* Serial Number */}
      <div className="w-[15%] dark:text-darkText text-[#000000] font-poppins text-sm">{index + 1}</div>

      {/* AVATAR IMAGE */}
      <div className="w-[25%]">
        <img src={avtar.image} className='w-12 h-12 rounded-full'/>
      </div>

      {/* AVATAR NAME */}
      <div className='w-[25%]'>
        <p className='text-sm font-poppins dark:text-tableDarkLarge text-[#00162e]'>{avtar.name}</p>
      </div>

      {/* AVATAR GENDER */}
      <div className='w-[25%]'>
        <p className='text-sm font-poppins dark:text-tableDarkLarge text-[#00162e]'>{avtar.gender}</p>
      </div>

      {/* ACTIONS */}
       <div className="w-[13%] flex gap-4">
        <button className="bg-[#D0CCE1] bg-opacity-[57%] rounded-full p-2">
            <img src={Edit} className="w-4 h-4" />
        </button>
        <button className="bg-[#FDE4EA] rounded-full p-2" onClick={() => handleOpenDelete(avtar.id)}>
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
            ${activePage === page ? "text-white bg-button-gradient" : "text-black hover:bg-gray-200 dark:text-darkText"}`}
          
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
    <AddAvatar open={open} handleClose={handleClose}/>
    <DeleteAvatar open={openDelete} handleClose={handleCloseDelete} avatarId={avatarId} />
    </>
  );
}

export default PostReportList;


































