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
import ReelDetail from './ReelDetail';
import DeleteReel from './DeleteReel';
import DeactiveArrow from '../../assets/deactive_Arrow.png'
import Loader from '../../assets/Loader.gif'
import { useNavigate,useLocation,useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

function ReelList() {
  // Sample data for posts
  const [activePage,setActivePage] = useState(1)
  const token = Cookies.get("token")
  const [selectedPostId,setSelectedPostId] = useState(null)
  const [order,setOrder] = useState("");
  const [category,setCategory] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  const [search,setSearch] = useState("")
 const navigate = useNavigate()
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [selectedValue, setSelectedValue] = useState("10");
const dropdownRef = useRef(null);

// Options for dropdown
const options = ["10","25","50","100"]

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
const pagination = data?.pagination;
const lastPage = pagination?.last_page || 1;
const currentPage = pagination?.current_page
const AllReelList = data?.rescent_post || [];

const handleGetReelList = async() => {
  setIsLoading(true)
  try{
    const response = await postData("/get_all_latest_reel_pagination",{page_no:activePage,per_page:selectedValue,order:order,category:category,search:search})
  } catch(error){

  } finally{
    setIsLoading(false)
  }
}

useEffect(() => {
  handleGetReelList()
},[activePage,selectedValue,order,category,search,refetch])

// To open reel detail dialog box 
const [openDetail,setOpenDetail] = useState(false)
const handleReelDetailOpen = (postId) => {
  setOpenDetail(true)
  setSelectedPostId(postId);
};
const handleReelDetailClose = () => {
   setOpenDetail(false)
   setSelectedPostId(null)
}
const [open,setOpen] = useState(false)
const handleOpen = (ReelId) =>
  {
    setOpen(true)
    setSelectedPostId(ReelId)
  } 
const handleClose = () => {
  setOpen(false)
  handleGetReelList()
}

const handleDelete = () => {
  console.log("Item deleted");
  handleClose();
}
const [toggleStates, setToggleStates] = useState(() => {
  return AllReelList.reduce((acc, post) => {
    acc[post.post_id] = post.status === 1; // set to true if status is 1
    return acc;
  }, {});
});

useEffect(() => {
  if (AllReelList.length > 0) {
    const initialStates = AllReelList.reduce((acc, post) => {
      acc[post.post_id] = post.status === 1;
      return acc;
    }, {});
    setToggleStates(initialStates);
  }
}, [AllReelList]);

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
    handleGetReelList()
  } catch(error){}
}

  // To open User Profile 
  const [userId,setUserId] = useState("")
  const {source} = useParams()
const location = useLocation()
const handleOpenUserProfile = (userId) => {
  const currentPath = location.pathname.split("/")[1]; // gets 'reel-list', 'user-list', etc.
  setUserId(userId);
  Cookies.set("userId", userId);
  navigate(`/${currentPath}/user-profile`);
};
  return (
    <>
    <div className="light:mb-10 xl:pl-72 dark:bg-primary bg-secondary">
      <Searchbar />

      {/* Title */}
      <div className="flex justify-between border-t-[#F2F2F2] py-3 px-6">
        <h2 className="pt-3 text-xl font-semibold dark:text-darkText text-lightText font-poppins">Reel List</h2>
        <div className="relative">
          <div className="absolute flex items-center p-2 transform -translate-y-1/2 left-2 top-1/2">
            <img src={Search} alt="Search" className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="border border-gray-500 dark:text-white placeholder:dark:text-tableDarkLarge bg-[#00000005] w-[250px] border-opacity-10 rounded-lg py-2 pl-12 placeholder:text-sm placeholder:text-[#0000004F] focus:outline-none focus:ring-1 focus:ring-gray-600"
            placeholder="Search by username..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </div>

      {/* Navigation Path */}
      <div className="flex items-center justify-between px-6 mb-3">
        <div className="flex items-center gap-2">
          <Link to="/dashboard"><h3 className="text-base font-semibold dark:text-darkText text-lightText font-poppins">Dashboard</h3></Link>
          <div className="rounded-full w-1 h-1 bg-[#E0E0E0]"></div>
          <h3 className="text-[#858585] font-poppins text-base">Reel List</h3>
        </div>
      </div>

      {/* Header Bar */}
      <div className="border border-[#E3E3E3] dark:border-[#1F1F1F] rounded-lg mt-8 2xl:mx-6 xl:mx-6 mx-4 overflow-x-auto w-full">
      <div className='xl:overflow-x-auto lg:overflow-x-auto 2xl:overflow-hidden min-w-[1200px] '>
      <div className='min-w-max'>  
  {/* Table Header */}
  <div className="flex px-4 py-4 pl-4 text-left border-b dark:border-b-[#1F1F1F] bg-header sm:pl-16">
    {/* SL */}
    <div className="w-[7%] text-[#FFFFFF] font-poppins text-sm">S.L </div>

    {/* Reel Image */}
    <div className="w-[11%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">REEL IMAGE </div>

    {/* Username */}
    <div className="2xl:w-[22%] xl:w-[25%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">
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
    <div className="w-[18%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">
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

    {/* Likes */}
    <div className="w-[10%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">
        LIKES
        <div className='flex flex-col'>
          <button onClick={() => { setOrder("0"); setCategory("Likes"); }}>
            <img src={category === "Likes" && order==="0" ? Dropdown : DeactiveArrow} className={`w-2 h-2 rotate-180 transition`} />
          </button>
          <button onClick={() => { setOrder("1"); setCategory("Likes"); }}>
            <img src={category === "Likes" && order === "1" ? Dropdown : DeactiveArrow} className={`w-2 h-2 transition`} />
          </button>
        </div>
      </div>

    {/* Comments */}
    <div className="w-[12%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">
        COMMENTS
        <div className='flex flex-col'>
          <button onClick={() => { setOrder("0"); setCategory("Comments"); }}>
            <img src={category === "Comments" && order==="0" ? Dropdown : DeactiveArrow} className={`w-2 h-2 rotate-180 transition`} />
          </button>
          <button onClick={() => { setOrder("1"); setCategory("Comments"); }}>
            <img src={category === "Comments" && order === "1" ? Dropdown : DeactiveArrow} className={`w-2 h-2 transition`} />
          </button>
        </div>
      </div>

    {/* Views */}
    <div className="w-[10%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">
        VIEWS
        <div className='flex flex-col'>
          <button onClick={() => { setOrder("0"); setCategory("SeenBy"); }}>
            <img src={category === "SeenBy" && order==="0" ? Dropdown : DeactiveArrow} className={`w-2 h-2 rotate-180 transition`} />
          </button>
          <button onClick={() => { setOrder("1"); setCategory("SeenBy"); }}>
            <img src={category === "SeenBy" && order === "1" ? Dropdown : DeactiveArrow} className={`w-2 h-2 transition`} />
          </button>
        </div>
      </div>

    {/* status */}
    <div className="w-[10%] text-[#FFFFFF] font-poppins text-sm">STATUS </div>

    {/* Actions */}
    <div className="w-[10%] text-[#FFFFFF] font-poppins text-sm">ACTIONS </div>
  </div>

  {/* Data Rows */}
  {AllReelList?.map((reel, index) => (
    <div key={reel.id} 
    className={`${index % 2 === 0 ? 'bg-white dark:bg-primary' : 'bg-[#00162e0a] dark:bg-primary'} flex items-center px-4 py-3 sm:pl-16 pl-4 border-b dark:border-b-[#1F1F1F] last:border-0`}>

      {/* Serial Number */}
      <div className="w-[7%] text-[#000000] dark:text-darkText font-poppins text-sm">{(currentPage - 1) * selectedValue + index + 1}</div>

      {/* Reel Image */}
      <div className="w-[11%] cursor-pointer" onClick={() => handleReelDetailOpen(reel.post_id)}>
        <img src={reel.post_videos[0].post_video_thumbnail} className="object-cover rounded-lg w-14 h-14" />
      </div>

      {/* Username */}
      <div className="w-[22%] flex gap-2 items-center">
        <img src={reel.profile_pic} className="w-12 h-12 rounded-full"/>
        <div>
          <h2 className="text-[#00162e] dark:text-darkText font-poppins text-sm font-semibold cursor-pointer" onClick={() => handleOpenUserProfile(reel.user_id)}>{reel.username}</h2>
          <p className="text-xs dark:text-tableDarkLarge text-tableLightLarge font-poppins">{reel.email}</p>
        </div>
      </div>

      {/* Date and Time */}
      <div className="w-[18%]">
        <h2 className="text-[#414141] dark:text-darkText font-poppins text-sm">{formatDate(reel.created_at)}</h2>
        <h2 className="text-[#7A7A7A] dark:text-tableDarkLarge font-poppins text-xs">{formatTime(reel.created_at)}</h2> 
      </div>

      {/* Likes */}
      <div className="w-[10%] text-[#3A3A3A] dark:text-tableDarkLarge font-poppins text-sm">{reel.total_likes} {reel.total_likes > 1 ? "Likes" : "Like"}</div>

      {/* Comments */}
      <div className="w-[12%] text-[#3A3A3A] dark:text-tableDarkLarge font-poppins text-sm">{reel.total_comments} {reel.total_comments > 1 ? "Comments" : "Comment"}</div>

      {/* Views */}
      <div className='w-[10%] text-[#3A3A3A] dark:text-tableDarkLarge font-poppins text-sm'>{reel.total_views} {reel.total_views > 1 ? "Views" : "View"}</div>

      {/* Status */}
      <div key={reel.post_id} className="w-[10%]">
  <label className="flex items-center cursor-pointer select-none">
    <div className="relative">
      <input
        type="checkbox"
        checked={toggleStates[reel.post_id]}
        onChange={() => {handleReelStatus(reel.post_id)}}
        className="sr-only"
      />
      {/* Toggle Background */}
      <div
        className={`block h-6 w-10 rounded-full border transition duration-300 ${
          toggleStates[reel.post_id]
            ? "bg-header border-header"
            : "bg-transparent border-header"
        }`}
      ></div>

      {/* Toggle Dot */}
      <div
        className={`absolute top-1 h-4 w-4 rounded-full transition duration-300 ${
          toggleStates[reel.post_id]
            ? "right-1 bg-white"
            : "left-1 bg-header"
        }`}
      ></div>
    </div>
  </label>
      </div>

      {/* Actions */}
      <div className="w-[10%] flex gap-4">
        <button className="bg-[#CCE1CD] bg-opacity-[57%] rounded-full p-2" onClick={() => handleReelDetailOpen(reel.post_id)}>
          <img src={Eye} className="w-4 h-4" />
        </button>
        <button className="bg-[#FDE4EA] rounded-full p-2" onClick={() => handleOpen(reel.post_id)}>
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
    className="border border-[#9C9C9C] dark:bg-primary rounded-xl flex gap-2 items-center px-3 py-1 cursor-pointer relative"
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  >
    <p className="text-[#9C9C9C] dark:text-[#ffffff] font-poppins">{selectedValue}</p>
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
          className="px-4 py-2 text-sm cursor-pointer dark:text-darkText hover:bg-gray-100 dark:hover:bg-slate-700"
          onClick={() => handleSelect(option)}
        >
          {option}
        </p>
      ))}
    </div>
  )}

  {/* Results Text */}
  <p className="text-[#484848] font-poppins text-sm dark:text-gray-600">
    Showing <span className="font-semibold text-[#000000] text-sm dark:text-darkText ">{pagination?.total}</span> results
  </p>
</div>

    {/* Pagination Buttons */}
    <div className="flex items-center">
  {/* Previous Button */}
  <button 
    className={`text-[#000000] dark:text-darkText text-sm font-poppins px-3 py-1 rounded-full transition-all duration-200 
      ${pagination?.prev_page === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
    onClick={() => setActivePage(prev => (prev > 1 ? prev - 1 : prev))}
    disabled={pagination?.prev_page === 0}
  >
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

    <DeleteReel open={open} handleClose={handleClose} handleDelete={handleDelete} ReelId={selectedPostId} />
    {selectedPostId && (
      <ReelDetail open={openDetail} postId={selectedPostId} handleClose={handleReelDetailClose}/>
    )}
    </>
  );
}

export default ReelList;

