import React,{useState,useRef,useEffect} from 'react';
import Search from '../../assets/search.png';
import Filter from '../../assets/filters.png';
import Searchbar from '../../components/Search';
import Dropdown from '../../assets/dropdown.png';
import Eye from '../../assets/eye.png'
import Delete from '../../assets/trash.png'
import { Link } from 'react-router-dom';
import Arrow from '../../assets/Showing_Arrow.png'
import useApiPost from '../hooks/postData';
import formatDate from '../../components/formatDate';
import formatTime from '../../components/formatTime';
import formatStoryTimeAgo from '../../components/formatStoryTimeAgo';
import DeleteStory from './DeleteStory';
import DeactiveArrow from '../../assets/deactive_Arrow.png'
import ViewStory from './ViewStoryDialog';
import Loader from '../../assets/Loader.gif'
import Cookies from 'js-cookie'
import { useNavigate,useLocation,useParams } from 'react-router-dom';

function StoriesList() {

   const [activePage,setActivePage] = useState(1)
  // Sample data for posts
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [selectedValue, setSelectedValue] = useState("10");
const [order,setOrder] = useState("");
const [category,setCategory] = useState("")
const [storyId,setStoryId] = useState("");
const [search,setSearch] = useState("")
const navigate = useNavigate()
const dropdownRef = useRef(null);
const [isLoading,setIsLoading] = useState(false)

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
  
 
const { data, error, refetch,postData } = useApiPost()
const handleGetStoriesList = async() => {
  setIsLoading(true)
  try{
    const response = await postData("/get_all_latest_story_pagination",{page_no:activePage,per_page:selectedValue,order:order,category:category,search:search})
  } catch(error){

  } finally{
    setIsLoading(false)
  }
}

const ActivePage = data?.recent_story
console.log("Post @@@ !!!",ActivePage)

const pagination = data?.pagination;
const lastPage = pagination?.last_page || 1;
const currentPage = pagination?.current_page
const AllStoriesList = data?.recent_story || [];

const [open,setOpen] = useState(false)
const handleOpen = (storyId) => {
  setOpen(true)
  setStoryId(storyId)
}
const handleClose = () => 
{
  setOpen(false)
  handleGetStoriesList()
}

const [openStory,setOpenStory] = useState(false)
const handleOpenStory = (storyId) =>
  { setOpenStory(true)
    setStoryId(storyId)
  }
const handleCloseStory = () => setOpenStory(false)

const handleDelete = () => {
  console.log("Item deleted");
  handleClose();
}

// Refetch data when page number changes
useEffect(() => {
  handleGetStoriesList()
}, [activePage,selectedValue,order,category,search,refetch]);

// To Open User Profile 
const [userId,setUserId] = useState('')
const location = useLocation()
const handleOpenUserProfile = (userId) => {
  const currentPath = location.pathname.split("/")[1]; // gets 'reel-list', 'user-list', etc.
  setUserId(userId);
  Cookies.set("userId", userId);
  navigate(`/${currentPath}/user-profile`);
};

  return (
    <>
    {/* <div className="mb-10 xl:pl-72"> */}
    <div className="light:mb-10 xl:pl-72 dark:bg-primary bg-secondary">
      <Searchbar />

      {/* Title */}
      <div className="flex justify-between border-t-[#F2F2F2] py-3 px-6">
        <h2 className="text-[#000000] dark:text-darkText font-poppins sm:text-xl font-semibold pt-3">Stories List</h2>
        <div className="relative">
          <div className="absolute flex items-center p-2 transform -translate-y-1/2 left-2 top-1/2">
            <img src={Search} alt="Search" className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="border border-gray-500 dark:text-darkText bg-[#00000005] placeholder:dark:text-tableDarkLarge border-opacity-10 rounded-lg w-[250px] py-2 pl-12 placeholder:text-sm placeholder:text-[#0000004F] focus:outline-none focus:ring-1 focus:ring-gray-600"
            placeholder="Search by username..."
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
          <h3 className="text-[#858585] font-poppins text-base">Stories List</h3>
        </div>
      </div>

      {/* Header Bar */}
       {/* Table Header */}
       <div className="border border-[#E3E3E3] dark:border-[#1F1F1F] rounded-lg mt-8 2xl:mx-6  mx-4 overflow-x-auto w-full">
      <div className='xl:overflow-x-auto lg:overflow-x-auto 2xl:overflow-hidden min-w-[1200px] '>
      <div className='min-w-max'>  
  <div className="flex px-4 py-4 pl-4 text-left border-b dark:border-b-[#1F1F1F] bg-header sm:pl-16">
    <div className="w-[10%] text-[#FFFFFF] font-poppins text-sm">S.L. </div>

    {/* Story image */}
    <div className="w-[15%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2 cursor-pointer" >STORY IMAGE</div>

    {/* Username */}
    <div className="sm:w-[25%] w-[40%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">
         USERNAME
      <div className='flex flex-col'>
        <button onClick={() => { setOrder("0"); setCategory("Username"); }}>
          <img src={category === "Username" && order==="0" ? Dropdown : DeactiveArrow} className={`w-2 h-2 rotate-180 transition`} />
        </button>
        <button onClick={() => { setOrder("1"); setCategory("Username"); }}>
          <img src={category === "Username" && order === "1" ? Dropdown : DeactiveArrow} className={`w-2 h-2 transition`} />
        </button>
      </div>
    </div>

    {/* Date/Time */}
     <div className="w-[20%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">
            POSTED DATE/TIME
            <div className='flex flex-col'>
              <button onClick={() => { setOrder("0"); setCategory("Date/Time"); }}>
                <img src={category === "Date/Time" && order==="0" ? Dropdown : DeactiveArrow} className={`w-2 h-2 rotate-180 transition`} />
              </button>
              <button onClick={() => { setOrder("1"); setCategory("Date/Time"); }}>
                <img src={category === "Date/Time" && order === "1" ? Dropdown : DeactiveArrow} className={`w-2 h-2 transition`} />
              </button>
            </div>
          </div>

    {/* Status */}
    <div className='w-[15%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2'> STATUS
      <div className='flex flex-col'>
        <button onClick={() => {setOrder("1"); setCategory("Status")}}>
          <img src={category === "Status" && order === "1" ? Dropdown : DeactiveArrow} className='w-2 h-2 transition rotate-180'/>
        </button>
        <button onClick={() => {setOrder("0"); setCategory("Status")}}>
          <img src={category === "Status" && order === "0" ? Dropdown : DeactiveArrow} className='w-2 h-2 transition'/>
        </button>
      </div>
    </div>

    {/* Views */}
    <div className="w-[15%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">VIEWS
      <div className='flex flex-col'>
        <button onClick={() => {setOrder("0"); setCategory("SeenBy")}}>
          <img src={category === "SeenBy" && order === "0" ? Dropdown : DeactiveArrow} className='w-2 h-2 rotate-180'/>
        </button>
        <button onClick={() => {setOrder("1"); setCategory("SeenBy")}}>
          <img src={category === "SeenBy" && order === "1" ? Dropdown : DeactiveArrow} className='w-2 h-2'/>
        </button>
      </div>
    </div>

    <div className="w-[15%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">LIKES
      <div className='flex flex-col'>
        <button onClick={() => {setOrder("0"); setCategory("Likes")}}>
          <img src={category === "Likes" && order === "0" ? Dropdown : DeactiveArrow} className='w-2 h-2 rotate-180'/>
        </button>
        <button onClick={() => {setOrder("1"); setCategory("Likes")}}>
          <img src={category === "Likes" && order === "1" ? Dropdown : DeactiveArrow} className='w-2 h-2'/>
        </button>
      </div>
    </div>
   
   {/* Actions */}
    <div className="w-[15%] text-[#FFFFFF] font-poppins text-sm">ACTIONS</div>
  </div>

      {/* Data Rows */}
{AllStoriesList.map((story, index) => (
    <div key={story.story_id} 
    className={`${index % 2 === 0 ? 'bg-white dark:bg-primary' : 'bg-[#00162e0a] dark:bg-primary'} flex items-center dark:border-b-[#1F1F1F] px-4 py-3 sm:pl-16 pl-4 border-b last:border-0`}>

      {/* Serial Number */}
      <div className="w-[10%] dark:text-darkText text-[#000000] font-poppins text-sm">{(currentPage - 1) * selectedValue + index + 1}</div>

      {/* Story Image */}
      <div className="w-[15%] 2xl:w-[15%] cursor-pointer" onClick={() => handleOpenStory(story.story_id)}>
        <img src={story.url} className="object-cover rounded-lg w-14 h-14" />
      </div>

      {/* Username */}
      <div className="sm:w-[25%] w-[40%] flex gap-2 items-center">
        <img src={story.profile_pic} className="w-12 h-12 rounded-full"/>
        <div>
          <h2 className="text-[#000000] dark:text-darkText font-poppins text-sm font-semibold cursor-pointer" onClick={() => handleOpenUserProfile(story.user_id)}>{story.username}</h2>
          <p className="text-xs text-[#939393] font-poppins dark:text-tableDarkLarge text-tableLightLarge">{story.email}</p>
        </div>
      </div>

      {/* Date and Time */}
      <div className="w-[20%]">
        <h2 className="text-[#414141] dark:text-darkText font-poppins text-sm">{formatDate(story.created_at)}</h2>
        <h2 className="text-[#7A7A7A] dark:text-tableDarkLarge font-poppins text-xs">{formatTime(story.created_at)}</h2>
      </div>

      {/* Live Expired */}
      <div className="w-[15%]">
      <h2 className={`${story.is_delete === 0 ? "text-[#0D9947] font-poppins text-sm" : "text-red-500 font-poppins text-sm"}`}>{story.is_delete === 0 ? `Live(${formatStoryTimeAgo(story.created_at)})` : "Expired"}</h2>
      </div>
      
      {/* Views */}
      <div className="w-[15%]">
        <h2 className="text-[#3A3A3A] dark:text-darkText font-poppins text-sm">{story.total_view} View</h2>
      </div>

      {/* Likes */}
      <div className="w-[15%]">
        <h2 className="text-[#3A3A3A] dark:text-darkText font-poppins text-sm">{story.total_likes} {story.total_likes > 1 ? "Likes" : "Like"}</h2>
      </div>

      {/* Actions */}
      <div className="w-[15%] flex gap-4">
        <button className="bg-[#CCE1CD] bg-opacity-[57%] rounded-full p-2" onClick={() => handleOpenStory(story.story_id)}>
          <img src={Eye} className="w-4 h-4" />
        </button>
        <button className="bg-[#FDE4EA] rounded-full p-2" onClick={() => handleOpen(story.story_id)}>
          <img src={Delete} className="w-4 h-4" />
        </button>
      </div>
    </div>
  ))}

  {/* {isLoading && (
      <div className='flex justify-center py-60'><img src={Loader} alt="loader" height={50} width={50}/></div>
     )} */}
     
        {/* Pagination and all list div */}
        {/* Results Count */}
        
        
          {/* Pagination Buttons */}
          <div className="flex justify-between px-10 py-6 bg-white dark:bg-primary">
          {/* Results Count */}
          <div className="relative flex gap-2 place-items-center" ref={dropdownRef}>
            {/* Dropdown Button */}
            <div
              className="border border-[#9C9C9C] bg-[#edeff166] dark:bg-primary rounded-xl flex gap-2 items-center px-3 py-1 cursor-pointer relative"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <p className="text-[#00162e] dark:text-[#FFFFFF] font-poppins">{selectedValue}</p>
              <button>
                <img src={Arrow} className="w-4 h-4" />
              </button>
            </div>
          
            {/* Dropdown Menu - Positioned Above */}
            {isDropdownOpen && (
              <div className="absolute left-0 z-50 mb-2 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-primary bottom-full w-max">
                {options.map((option) => (
                  <p
                    key={option}
                    className="px-4 py-2 text-sm cursor-pointer dark:text-darkText hover:bg-gray-100"
                    onClick={() => handleSelect(option)}>
                    {option}
                  </p>
                ))}
              </div>
            )}
          
            {/* Results Text */}
            <p className="text-[#333333] font-poppins text-sm dark:text-gray-600">
              Showing <span className="font-semibold text-[#000000] text-sm dark:text-darkText">{pagination?.total}</span> results
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
        
       
      {/* </div> */}
      </div>
      </div>
    </div>
    </div>
    <DeleteStory open={open} handleClose={handleClose} handleDelete={handleDelete} storyId={storyId} />
    <ViewStory open={openStory} handleClose={handleCloseStory} storyId={storyId} />

    </>
  );
}

export default StoriesList;


