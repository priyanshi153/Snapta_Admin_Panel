import React,{useEffect, useState} from 'react'
import Profile from '../../assets/user_profile.png'
import useApiPost from '../hooks/postData'
import Empty from '../../assets/empty.png'
import Cookies from 'js-cookie'
import { useNavigate,useLocation } from 'react-router-dom'

function Bookmark({postId}) 
{
    const {data,error,postData} = useApiPost();
    const navigate = useNavigate()
    const [userId,setUserId] = useState("")
    const handleGetBookmarkList = () => {
        try{
            const response = postData("/all_bookmark_post_list",{post_id:postId})
        } catch(error){}
    } 

    useEffect(() => {
        handleGetBookmarkList()
    },[postId])

    const BookmarkList = data?.bookmark_post_list
    console.log("Bookmark !!!",postId)

    // To open USER PROFILE 
  const location = useLocation()
  const handleOpenUserProfile = (userId) => {
    const currentPath = location.pathname.split("/")[1]; // gets 'reel-list', 'user-list', etc.
    setUserId(userId);
    Cookies.set("userId", userId);
    navigate(`/${currentPath}/user-profile`);
  };

    return(<>

        {BookmarkList?.length > 0 ? 
        (<>
          <div className='px-4 py-6 overflow-y-auto'>
        {BookmarkList.map((bookmark) => (
            <>
                <div className="flex items-center border-b border-[#EFEFEF] justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100">
                    <div className='flex px-6'>
                        <img src={bookmark.profile_pic || "/assets/default_user.png"} alt={bookmark.name}  className="w-12 h-12 mr-3 rounded-full" />
                            <div className='flex flex-col justify-center py-2 text-left place-items-center'>
                                <p className='font-poppins text-[#000000] text-sm text-left font-semibold cursor-pointer' onClick={() => handleOpenUserProfile(bookmark.user_id)}> {bookmark.username}</p>
                            </div>
                    </div>
                          
                </div>
            </>
        ))}
        </div>
        </>) : 
        
        (<>
         <div className='py-44 place-items-center'>
            <img src={Empty} className='w-14 h-14 '/>
            <p className='text-[#B4B4B4] font-poppins text-base'>No Bookmark</p>
        </div>
        </>) }
        
        </>
    )
}

export default Bookmark;