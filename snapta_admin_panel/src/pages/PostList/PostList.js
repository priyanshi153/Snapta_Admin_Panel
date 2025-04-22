import React,{useState,useEffect,useRef} from 'react';
import Search from '../../assets/search.png';
import Filter from '../../assets/filters.png';
import Searchbar from '../../components/Search';
import Dropdown from '../../assets/dropdown.png';
import UserProfile from '../../assets/user_profile.png'
import Eye from '../../assets/eye.png'
import Edit from '../../assets/edit.png'
import Delete from '../../assets/trash.png'
import {useGetAllPostReelQuery} from '../../store/api/AllPostsReels'
import Cookies from 'js-cookie'
import useApiPost from '../hooks/postData';
import formatTime from '../../components/formatTime'
import formatDate from '../../components/formatDate';
import { Link } from 'react-router-dom';
import Arrow from '../../assets/Showing_Arrow.png'
import DeletePost from './DeletePost';
import PostDetail from './PostDetail';
import DeactiveArrow from '../../assets/deactive_Arrow.png'
import Loader from '../../assets/Loader.gif'
import { useNavigate,useLocation,useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTheme } from '../../context/ThemeProvider';

function PostList() {
// Sample data for posts
const [activePage,setActivePage] = useState(1)
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [selectedValue, setSelectedValue] = useState("10");
const dropdownRef = useRef(null);
const [order,setOrder] = useState("")
const [category,setCategory] = useState("")
const [search,setSearch] = useState("")
const [userId,setUserId] = useState("")
const navigate = useNavigate()
const [open, setOpen] = useState(false);
const [openDetail, setOpenDetail] = useState(false)
const [isLoading,setIsLoading] = useState(false)

  const handleOpen = (postId) => 
    {
      setOpen(true);
      setSelectedPostId(postId)
      handleGetPostList()
    }
  const handleClose = () => {
    setOpen(false)
    handleGetPostList()
  }
  
  const handleDelete = () => {
      console.log("Item deleted");
      handleClose();
  };

  const [selectedPostId,setSelectedPostId] = useState(null)
  const handlePostDetailOpen = (postId) => {
    setOpenDetail(true)
    setSelectedPostId(postId);
  };
  const handlePostDetailClose = () => {
     setOpenDetail(false)
     setSelectedPostId(null)
  }
// Options for dropdown
const options = ["10", "25", "50","100"];

// Function to handle option selection
const handleSelect = (value) => {
  setSelectedValue(value);
  setIsDropdownOpen(false);
};

const token = Cookies.get("token")
const { data, error, refetch,postData } = useApiPost()
const handleGetPostList = async() => {
  setIsLoading(true)
  try{
    const response = await postData("/get_all_latest_post_pagination",{page_no:activePage,per_page:selectedValue,order:order,category:category,search:search})
  } catch(error){
  } finally{
    setIsLoading(false)
  }
}

// To open USER PROFILE
const {source} = useParams()
const location = useLocation()
const handleOpenUserProfile = (userId) => {
  const currentPath = location.pathname.split("/")[1]; // gets 'reel-list', 'user-list', etc.
  setUserId(userId);
  Cookies.set("userId", userId);
  navigate(`/${currentPath}/user-profile`);
};

// Refetch data when page number changes
useEffect(() => {
  handleGetPostList()
}, [activePage,selectedValue,order,category,refetch,search]);

const ActivePage = data?.rescent_post
console.log("Post @@@ !!!",ActivePage)

const pagination = data?.pagination;
const lastPage = pagination?.last_page || 1;
const currentPage = pagination?.current_page
const AllPostList = data?.rescent_post || [];

console.log("Current Page @@@",currentPage)

console.log("Date @@@",formatDate("2024-12-09T13:48:09.000000Z"))

console.log("All    @@@@ 111",AllPostList)
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

const {data:postStatusData,postData:postStatus} = useApiPost()
const [toggleStates, setToggleStates] = useState(() => {
  return AllPostList.reduce((acc, post) => {
    acc[post.post_id] = post.status === 1; // set to true if status is 1
    return acc;
  }, {});
});

useEffect(() => {
  if (AllPostList.length > 0) {
    const initialStates = AllPostList.reduce((acc, post) => {
      acc[post.post_id] = post.status === 1;
      return acc;
    }, {});
    setToggleStates(initialStates);
  }
}, [AllPostList]);


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


const handlePostStatus = (postId) => {
  try{
    const response = postStatus("/post_edit_status",{post_id:postId})
    toast.success("Post Status Updated Successfully!")
    handleCheckboxChange()
    handleGetPostList()
  } catch(error){}
}
    

    // To open Post and add opacity on multiple post image
    const [selectedPost,setSelectedPost] = useState()
    const {data:AllReelPost,refetch:AllReelPostRefetch,loading} = useGetAllPostReelQuery({token:token})
    const AllReelPostData = AllReelPost?.recent_content
   
    const handleImageClick = (postId) => {
      setSelectedPost(postId)
    }
    console.log("Post idd !!!",selectedPostId)

    // For Light/Dark Theme 
    const {theme,toggleTheme} = useTheme();

    console.log("Search !!!",search)
   
    return (
    <>
    <div className={`light:mb-10 lg:pl-20 xl:pl-72 dark:bg-primary bg-secondary`} >
      <Searchbar />

      {/* Title */}
      <div className={`flex justify-between py-3 xl:px-6 2xl:px-6 px-4`}>
        <h2 className="pt-3 text-xl font-semibold font-poppins dark:text-darkText text-lightText">Post List</h2>
        <div className="relative">
          <div className="absolute flex items-center p-2 transform -translate-y-1/2 left-2 top-1/2">
            <img src={Search} alt="Search" className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="border border-gray-500 bg-[#00000005] dark:text-darkText border-opacity-10 rounded-lg w-[250px] py-2 pl-12 placeholder:text-sm placeholder:text-[#0000004F] placeholder:dark:text-tableDarkLarge focus:outline-none focus:ring-1 focus:ring-gray-600"
            placeholder="Search by username..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            />
        </div>
      </div>

      {/* Navigation Path */}
      <div className="flex items-center justify-between px-4 xl:px-6">
        <div className="flex items-center gap-2">
          <Link to="/dashboard"><h3 className={` dark:text-darkText text-lightText font-poppins text-base font-semibold`}>Dashboard</h3></Link>
          <div className="rounded-full w-1 h-1 bg-[#E0E0E0]"></div>
          <h3 className="text-[#858585] font-poppins text-base">Post List</h3>
        </div>
      </div>

      {/* Header Bar */}
    <div className="border border-[#E3E3E3] dark:border-[#1F1F1F] rounded-lg mt-8 2xl:mx-6 xl:mx-6 mx-4 overflow-x-auto w-full">
      <div className='xl:overflow-x-auto lg:overflow-x-auto 2xl:overflow-hidden min-w-[1200px] '>
 <div className='min-w-max'>
  {/* Table Header */}
  <div className="bg-header flex py-4 w-full px-4 border-b dark:border-b-[#1F1F1F] text-left sm:pl-16 pl-4">
  <div className="w-[8%]   text-[#FFFFFF] font-poppins text-sm">S.L</div>

  <div className="w-[11%] xl:w-[13%] 2xl:w-[13%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">POST IMAGE</div>

  {/* USERNAME COLUMN */}      
  <div className="w-[22%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">
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

  {/* DATE/TIME COLUMN */}
  <div className="w-[18%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">
    POSTED DATE/TIME
    <div className='flex flex-col'>
      <button onClick={() => { setOrder("0"); setCategory("Date/Time"); }}>
        <img  src={category === "Date/Time" && order==="0" ? Dropdown : DeactiveArrow} className={`w-2 h-2 rotate-180 transition`} />
      </button>
      <button onClick={() => { setOrder("1"); setCategory("Date/Time"); }}>
        <img src={category === "Date/Time" && order === "1" ? Dropdown : DeactiveArrow} className={`w-2 h-2 transition`} />
      </button>
    </div>
  </div>

  {/* LIKES COLUMN */}
  <div className="w-[12%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">
    LIKES
    <div className='flex flex-col'>
      <button onClick={() => { setOrder("0"); setCategory("Likes"); }}>
        <img src={category === "Likes" && order === "0" ? Dropdown : DeactiveArrow} className={`w-2 h-2 rotate-180 transition`} />
      </button>
      <button onClick={() => { setOrder("1"); setCategory("Likes"); }}>
        <img src={category === "Likes" && order === "1" ? Dropdown : DeactiveArrow} className={`w-2 h-2 transition`} />
      </button>
    </div>
  </div>

  {/* COMMENTS COLUMN */}
  <div className="w-[13%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">
    COMMENTS
    <div className='flex flex-col'>
      <button onClick={() => { setOrder("0"); setCategory("Comments"); }}>
        <img src={category === "Comments" && order === "0" ? Dropdown : DeactiveArrow} className={`w-2 h-2 rotate-180 transition`} />
      </button>
      <button onClick={() => { setOrder("1"); setCategory("Comments"); }}>
        <img src={category === "Comments" && order === "1" ? Dropdown : DeactiveArrow} className={`w-2 h-2 transition`}  />
      </button>
    </div>
  </div>

  <div className="w-[10%] text-[#FFFFFF] font-poppins text-sm">STATUS</div>
  <div className="w-[10%] text-[#FFFFFF] font-poppins text-sm">ACTIONS</div>
</div>

  {/* Data Rows */}
  {AllPostList?.map((post, index) => (
    <div key={post.id} className={`${index % 2 === 0 ? 'bg-[#FFFFFF] dark:bg-primary' : 'bg-[#00162e0a] dark:bg-primary'} flex items-center px-4 py-3 sm:pl-16 pl-4 border-b dark:border-b-[#1F1F1F] last:border-0`}>
      {/* Serial Number */}
      <div className="w-[8%] lg:w-[5%] xl:w-[8%] 2xl:w-[8%] text-[#000000] dark:text-darkText font-poppins text-sm">{(currentPage - 1) * selectedValue + index + 1}</div>

      {/* Post Image */}
      <div className={`w-[11%] 2xl:w-[13%] relative cursor-pointer  ${post.post_images.length > 1  }`} onClick={() => handlePostDetailOpen(post.post_id)}>
        <img src={post.post_images[0].url} className='object-cover rounded-lg w-14 h-14'/>
        {/* more images div */}
        {post.post_images.length > 1 && (
          <div className='absolute inset-0 bg-[#000000] bg-opacity-40 justify-center w-14 h-14 rounded-lg font-poppins text-[#ffffff] py-3.5 px-4'>
            +{post.post_images.length - 1}
          </div>
        )}
      </div>

      {/* Username */}
      <div className="w-[22%] flex gap-2 items-center">
        <img src={post.profile_pic} className="w-12 h-12 rounded-full"/>
        <div>
          <h2 className="text-sm font-semibold cursor-pointer dark:text-darkText text-[#00162e] font-poppins" onClick={() => handleOpenUserProfile(post.user_id)}>{post.username}</h2>
          <p className="text-xs dark:text-tableDarkLarge text-tableLightLarge font-poppins">{post.email}</p>
        </div>
      </div>

      {/* Date and Time */}
      <div className="w-[18%]">
        <h2 className="text-[#00162e] dark:text-darkText font-poppins text-sm">{formatDate(post.created_at)}</h2>
        <h2 className="text-[#777777] dark:text-tableDarkLarge font-poppins text-xs">{formatTime(post.created_at)}</h2> 
      </div>

      {/* Likes */}
      <div className="w-[12%] text-[#3A3A3A] dark:text-tableDarkLarge font-poppins text-sm">{post.total_likes} {post.total_likes > 1 ? "Likes" : "Like"}</div>

      {/* Comments */}
      <div className="w-[13%] text-[#3A3A3A] dark:text-tableDarkLarge font-poppins text-sm">{post.total_comments} {post.total_comments > 1 ? "Comments" : "Comment"}</div>

      {/* Status */}
      <div key={post.post_id} className="w-[10%]">
  <label className="flex items-center cursor-pointer select-none">
    <div className="relative">
      <input
        type="checkbox"
        checked={toggleStates[post.post_id]}
        onChange={() => {handlePostStatus(post.post_id)}}
        className="sr-only"
      />
      {/* Toggle Background */}
      <div
        className={`block h-6 w-10 rounded-full border transition duration-300 ${
          toggleStates[post.post_id]
            ? "bg-header border-header"
            : "bg-transparent border-header"
        }`}
      ></div>

      {/* Toggle Dot */}
      <div
        className={`absolute top-1 h-4 w-4 rounded-full transition duration-300 ${
          toggleStates[post.post_id]
            ? "right-1 bg-white "
            : "left-1 bg-header"
        }`}
      ></div>
    </div>
  </label>
</div>


      {/* Actions */}
      <div className="w-[10%] flex gap-4">
        <button className="bg-[#CCE1CD] bg-opacity-[57%] rounded-full p-2" onClick={() => handlePostDetailOpen(post.post_id)}>
          <img src={Eye} className="w-4 h-4" />
        </button>
        <button className="bg-[#FDE4EA] rounded-full p-2" onClick={() => handleOpen(post.post_id)}>
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
    className="border border-[#9C9C9C] dark:border-[#FFFFFF] bg-[#edeff166] dark:bg-primary rounded-xl flex gap-2 items-center px-3 py-1 cursor-pointer relative"
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
    <p className="text-[#00162e] dark:text-[#ffffff] font-poppins">{selectedValue}</p>
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
          className="px-4 py-2 text-sm cursor-pointer dark:text-darkText dark:hover:bg-slate-700 hover:bg-gray-200"
          onClick={() => handleSelect(option)}>
          {option}
        </p>
      ))}
    </div>
  )}

  {/* Results Text */}
  <p className="text-[#333333] font-poppins text-sm dark:text-gray-600">
    Showing {" "} <span className="font-semibold text-[#000000] dark:text-darkText text-sm">{pagination?.total}</span>{" "}  results
  </p>
</div>

    {/* Pagination Buttons */}

  <div className="flex items-center">
  {/* Previous Button */}
  <button 
    className={`text-[#000000] text-sm dark:text-darkText font-poppins px-3 py-1 rounded-full transition-all duration-200 
      ${pagination?.prev_page === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-slate-700"}`}
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
          ${activePage === page ? "text-white bg-button-gradient" : "text-black dark:text-darkText hover:bg-gray-200 dark:hover:bg-slate-700 dark:hover-none"}`}
        onClick={() => setActivePage(page)}>
        {page}
      </button>
    );
  })}

  {/* Next Button */}
  <button 
    className={`text-[#000000] dark:text-darkText text-sm font-poppins px-3 py-1 rounded-full transition-all duration-200 
      ${pagination?.next_page > lastPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-slate-700"}`}
    onClick={() => setActivePage(prev => (prev < lastPage ? prev + 1 : prev))}
    disabled={pagination?.next_page > lastPage}>
    Next
  </button>
</div>

  </div>

  </div>
  </div>
    </div>
    
    </div>


    <DeletePost open={open} handleClose={handleClose} handleDelete={handleDelete} postId={selectedPostId} />
    {selectedPostId && (
      <PostDetail open={openDetail} postId={selectedPostId} handleClose={handlePostDetailClose}/>
    )}

    </>
  );
}

export default PostList;

