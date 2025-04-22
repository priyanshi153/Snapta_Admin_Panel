import React, { useEffect,useState } from 'react'
import Vector from '../../assets/vectorLike.png'
import Profile from '../../assets/user_profile.png'
import useApiPost from '../hooks/postData'
import Empty from '../../assets/empty.png'
import Cookies from 'js-cookie'
import { useNavigate,useLocation } from 'react-router-dom'

function CommentLikeUserList({onClose,commentId}) 
{
    const {data,error,postData} = useApiPost();
    const navigate = useNavigate();
    const handleGetCommentLikeList = () => {
        try{
            const response = postData("/reel_comment_like_list",{reel_comment_id:commentId})
        } catch(error) {

        }
    }

    useEffect(() => {
        handleGetCommentLikeList()
    },[commentId])

    const CommentLikeList = data?.reel_comment_like_list
    console.log("Reel Comment Like List !!!",CommentLikeList)

    // To open User Profile 
    const [userId,setUserId] = useState('')
  const location = useLocation()
  const handleOpenUserProfile = (userId) => {
    const currentPath = location.pathname.split("/")[1]; // gets 'reel-list', 'user-list', etc.
    setUserId(userId);
    Cookies.set("userId", userId);
    navigate(`/${currentPath}/user-profile`);
  };
  
    return(
        <>
            <div className="relative py-6 text-center bg-white shadow-lg w-80 rounded-xl">
                <div className="absolute -top-5 left-6 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[20px] border-l-transparent border-r-transparent  border-b-white"></div>
            <button className="absolute text-sm top-2 right-2 sm:text-[#1B191F] text-[#FFFFFF] rounded-full px-3 py-1" onClick={onClose}>
                
              ✕
            </button>
            <div className="items-center justify-center mb-4 place-items-center">
                <p className=" font-bold text-base text-center font-gilroy_semibold text-[#000000] xl:text-[#000000] ">Like</p>
                <img src={Vector} className="w-8" />
            </div>

            {/* All Like User List */}
            {CommentLikeList?.length > 0 ? 
            (<>
              <div className='justify-center px-8'>
            {CommentLikeList?.map((like) => (
            <>
                <div className="flex items-center border-b border-[#EFEFEF] justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100">
                    <div className='flex '>
                        <img src={like.profile_pic || "/assets/default_user.png"} alt={like.username}  className="mr-3 rounded-full w-14 h-14" />
                            <div className='flex flex-col justify-center py-2 text-left place-items-center'>
                                <p className='font-poppins text-[#000000] text-sm text-left cursor-pointer font-semibold' onClick={() => handleOpenUserProfile(like.user_id)}> {like.username}</p>
                            </div>
                    </div>    
                </div>
            </>
            ))}
            </div>
            </>) : 
            
            (<>
            <div className='py-12 place-items-center'>
                <img src={Empty} className='w-12 h-12 '/>
                <p className='text-[#B4B4B4] font-poppins text-base'>No Likes</p>
            </div>
            </>)}
            
            </div>
        </>
    )
}

export default CommentLikeUserList;

