import React,{useEffect,useState} from 'react'
import Profile from '../../assets/user_profile.png'
import useApiPost from '../hooks/postData'
import Empty from '../../assets/empty.png'
import {useNavigate,useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'

function Bookmark({reelId}) 
{
    const {data,error,postData} = useApiPost();
    const handleGetBookmarkList = () => {
        try{
            const response = postData("/all_bookmark_reel_list",{reel_id:reelId})
        } catch(error) {
            
        }
    }

    useEffect(() => {
        handleGetBookmarkList()
    },[reelId])

    const BookmarkList = data?.bookmark_reel_list
    console.log("Bookmark list !!!",BookmarkList)

    // To open User Profile 
    const [userId,setUserId] = useState("")
    const navigate = useNavigate()
  const location = useLocation()
  const handleOpenUserProfile = (userId) => {
    const currentPath = location.pathname.split("/")[1]; // gets 'reel-list', 'user-list', etc.
    setUserId(userId);
    Cookies.set("userId", userId);
    navigate(`/${currentPath}/user-profile`);
  };

    return(
        <>
        {BookmarkList?.length > 0 ? ( <div className='px-4 py-6 overflow-y-auto'>
        {BookmarkList.map((bookmark) => (
            <>
                <div className="flex items-center border-b border-[#EFEFEF] dark:border-[#1F1F1F] justify-between p-2 rounded-md cursor-pointer light:hover:bg-gray-100">
                    <div className='flex px-6'>
                        <img src={bookmark.profile_pic || "/assets/default_user.png"} alt={bookmark.username}  className="mr-3 rounded-full w-14 h-14" />
                            <div className='flex flex-col justify-center py-2 text-left place-items-center'>
                                <p className='font-poppins text-[#000000] text-sm text-left  font-semibold cursor-pointer dark:text-darkText' onClick={() => handleOpenUserProfile(bookmark.user_id)}> {bookmark.username}</p>
                            </div>
                    </div>
                </div>
            </>
        ))}
        </div>) : (<div className='py-48 place-items-center'>
                    <img src={Empty} className='w-14 h-14 '/>
                    <p className='text-[#B4B4B4] font-poppins text-base dark:text-darkText'>No Bookmark</p>
                </div>) }
       
        </>
    )
}

export default Bookmark;