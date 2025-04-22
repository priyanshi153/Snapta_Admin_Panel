import React,{useEffect, useState} from 'react' 
import UserImage from '../../assets/user_profile.png'
import Like from '../../assets/Like.png'
import Comment from '../../assets/Comment.png'
import Bookmark from '../../assets/Bookmark.png'
import Like1 from '../../assets/Like1.png'
import Comment1 from '../../assets/Comment1.png'
import Bookmark1 from '../../assets/Bookmark1.png'
import Searchbar from '../../components/Search'
import Posts from './UserAllPostList'
import Followers from './UserFollowersList'
import Followings from './UserFollowingList'
import useApiPost from '../hooks/postData'
import Cookies from 'js-cookie'
import Loader from '../../assets/Loader.gif'
import Reels from './UserAllReelList'
import Tag from './UserAllTagPost'
import Search from '../../assets/search.png';
import { useLocation,Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function UserProfile() 
{
    const [option,setOption] = useState("Posts")
    const [openFollowers,setOpenFollowers] = useState(false)
    const [openFollowing,setOpenFollowing] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()
    const source = useParams()
    const handleOpenFollowers = () => setOpenFollowers(true)
    const handleCloseFollowers = () => setOpenFollowers(false)
    const handleOpenFollowing = () => setOpenFollowing(true)
    const handleCloseFollowing = () => setOpenFollowing(false)
    const {data,error,postData,loading} = useApiPost()
    const userId = Cookies.get("userId")
    const handleGetUserDetails = () =>
    {
      setIsLoading(true)
        try{
            const response = postData("/second_user_profile",{to_user_id:userId})
        } catch(error){}
        finally{
          setIsLoading(false)
        }
    }

    useEffect(() => {
        handleGetUserDetails()
    },[userId])
    const UserDetails = data?.user_data 
    console.log("User Details !!!",UserDetails)


  const location = useLocation();
  const { from, label } = location.state || {};

  const currentPath = location.pathname.split("/"); // get last path segment
  const currentLabel = currentPath[1]
  console.log("Current Path @@@",currentPath[1])

// Get previous page from state or default to "user-list"
const sourcePage = currentLabel || "user-list" ;
    
    return(
        <>
        {/* Search bar */}
        <div className='ml-72'>  
            <Searchbar />
            
            <div className="flex justify-between border-t-[#F2F2F2] py-3 px-6">
        <h2 className="text-[#000000] font-poppins text-xl font-semibold pt-3 dark:text-darkText">User Profile</h2>
        {/* <div className="relative">
          <div className="absolute flex items-center p-2 transform -translate-y-1/2 left-2 top-1/2">
            <img src={Search} alt="Search" className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="border border-gray-500 bg-[#00000005] placeholder:dark:text-tableDarkLarge w-[250px] border-opacity-10 rounded-lg py-2 pl-12 placeholder:text-sm placeholder:text-[#0000004F] focus:outline-none focus:ring-1 focus:ring-gray-600"
            placeholder="Search by user name..."
          />
        </div> */}
      </div>

      {/* Navigation Path */}
      <div className="flex items-center justify-between px-6 mb-3">
  <div className="flex items-center gap-2">
    <h3 className="text-[#3A3A3A] font-poppins text-base font-semibold cursor-pointer dark:text-darkText" onClick={() => navigate('/dashboard')}>Dashboard</h3>
    <div className="rounded-full w-1 h-1 bg-[#808080]"></div>

    {/* Go back to previous page */}
    <button
  className="text-[#3A3A3A] dark:text-darkText font-poppins font-semibold text-base cursor-pointer"
  onClick={() => navigate(`/${sourcePage}`)}
>
  {sourcePage
    .split("-")                      // split by hyphen
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
    .join(" ")}                      
</button>


    <div className="rounded-full w-1 h-1 bg-[#808080]"></div>
    <h5 className='text-[#858585] font-poppins text-sm'>{UserDetails?.username ? UserDetails.username[0].toUpperCase() + UserDetails.username.slice(1): ""}
</h5>

  </div>
</div>


     
          {isLoading ? 
          (<>
            <div className='flex justify-center py-60'><img src={Loader} alt="loader" height={50} width={50}/></div>
          </>) : (<>
             {/* Profile Image bg */}
          <div className='relative bg-opacityGradient h-[250px]'>
            <div className='px-36'>
                <img src={UserDetails?.profile_pic} className='absolute rounded-full w-44 h-44 -bottom-20  border-[#FFFFFF] bg-white shadow-lg border-8 '/>
            </div>
          </div>

          {/* UserDetails */}
          <div className='py-8 px-[350px]'>
          <div className='flex flex-col'>
            <h2 className='text-[#000000] font-poppins font-semibold text-xl dark:text-darkText'>{UserDetails?.first_name} {UserDetails?.last_name}</h2>
            <p className='text-base font-normal text-gray-500 font-poppins dark:text-tableDarkLarge'>{UserDetails?.email}</p>
          </div>
          
          {/* Followers Following total */}
          <div className='flex gap-4 py-4'>
            <h2 className='text-[#000000] dark:text-gray-500 font-semibold font-poppins text-base cursor-pointer' onClick={handleOpenFollowers}>{UserDetails?.followers} <span className='text-base font-medium text-sidebarText hover:underline'>Followers</span></h2>
            <h2 className='text-[#000000] dark:text-gray-500 font-semibold font-poppins text-base cursor-pointer' onClick={handleOpenFollowing}>{UserDetails?.following} <span className='text-base font-medium text-sidebarText hover:underline'>Following</span></h2>
          </div>
          </div>

          {/* Post Followers Following */}
          <div className="flex border dark:border-[#1F1F1F] rounded-lg mx-36 ">
            {/* Like button */}
            <button
              className={`flex flex-1 gap-1 items-center justify-center py-2 w-fit font-poppins text-base transition-all duration-200 ${
                option === "Posts"
                  ? "bg-opacityGradient text-sidebarText dark:text-white rounded-tl-lg rounded-bl-lg"
                  : "bg-transparent text-[#000000] dark:text-gray-500"
              }`}
              onClick={() => setOption("Posts")}
            >
              Posts
              <p className={` font-poppins text-sm ${option === "Posts" ? "text-sidebarText dark:text-white" : "text-[#000000] dark:text-gray-500"}`}>({UserDetails?.total_posts})</p>
            </button>
          
            {/* Divider */}
            <div className="self-center h-10 border dark:border-[#1F1F1F]" />
          
            {/* Comment button */}
            <button
              className={`flex flex-1 gap-1 items-center justify-center py-2  font-poppins text-base transition-all duration-200 ${
                option === "Reels"
                  ? "bg-opacityGradient text-sidebarText dark:text-white"
                  : "bg-transparent text-[#000000] dark:text-gray-500"
              }`}
              onClick={() => setOption("Reels")}
            >
              Reels
              <p className={` font-poppins text-sm ${option === "Reels" ? "text-sidebarText dark:text-white" : "text-[#000000] dark:text-gray-500"}`}>({UserDetails?.total_reels})</p>
            </button>
          
            {/* Divider */}
            <div className="self-center h-10 border dark:border-[#1F1F1F]" />
          
            {/* Bookmark button */}
            <button
              className={`flex flex-1 gap-1 items-center justify-center py-2  font-poppins text-base transition-all duration-200 ${
                option === "Tag"
                  ? "bg-opacityGradient text-sidebarText dark:text-white rounded-tr-lg rounded-br-lg"
                  : "bg-transparent text-[#000000] dark:text-gray-500"
              }`}
              onClick={() => setOption("Tag")}
            >
              Tag 
              <p className={` font-poppins text-sm ${option === "Tag" ? "text-sidebarText dark:text-white" : "text-[#000000] dark:text-gray-500"}`}>({UserDetails?.total_tags})</p>
            </button>
          </div>

          {/* All Pages */}
          {option === "Posts" && (
            <Posts />
          )}

          {option === "Reels" && (
            <Reels />
          )}

          {option === "Tag" && (
            <Tag />
          )}
          </>)}
          
        </div>
        
        <Followers open={openFollowers} handleClose={handleCloseFollowers}/>
        <Followings open={openFollowing} handleClose={handleCloseFollowing} />
        </>
    )
}

export default UserProfile;