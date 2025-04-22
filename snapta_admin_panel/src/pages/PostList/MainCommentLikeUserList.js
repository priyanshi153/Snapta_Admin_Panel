import React,{useEffect,useState} from 'react'
import Vector from '../../assets/vectorLike.png'
import Profile from '../../assets/user_profile.png'
import useApiPost from '../hooks/postData'
import Empty from '../../assets/empty.png'
import { useNavigate,useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

function CommentLikeUserList({onClose,commentId}) 
{
    const {data,error,postData} = useApiPost()
    const handleMainCommentLikeList = () => {
        try{
            const response = postData("/post_comment_like_list",{post_comment_id:commentId})
        } catch(error){
            
        }
    }
    useEffect(() => {
        handleMainCommentLikeList()
    },[commentId])

    const CommentLikeList = data?.post_comment_like_list
    console.log("Comment Like List !!!!",CommentLikeList)
    
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
            <div className="relative py-6 text-center bg-white shadow-lg dark:bg-primary w-80 rounded-xl">
                <div className="absolute -top-5 left-6 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[20px] border-l-transparent border-r-transparent dark:bg-primary dark:border-b-primary border-b-white"></div>
            <button className="absolute text-sm top-2 right-2 sm:text-[#1B191F] text-[#FFFFFF] dark:text-darkText rounded-full px-3 py-1" onClick={onClose}>
              ✕
            </button>
            <div className="items-center justify-center mb-4 place-items-center">
                <p className=" font-bold text-base text-center font-gilroy_semibold text-[#000000] dark:text-darkText">Like</p>
                <img src={Vector} className="w-8" />
            </div>

            {/* All Like User List */}
            {CommentLikeList?.length > 0 ? 
            
            (<>
               <div className='justify-center px-8 dark:bg-primary'>
            {CommentLikeList?.map((like) => (
            <>
                <div className="flex items-center border-b dark:border-[#1F1F1F] border-[#EFEFEF] justify-between p-2 rounded-md cursor-pointer light:hover:bg-gray-100">
                    <div className='flex '>
                        <img src={like.profile_pic || "/assets/default_user.png"} alt={like.username}  className="w-10 h-10 mr-3 rounded-full" />
                            <div className='flex flex-col py-2 text-left place-items-center'>
                                <p className='font-poppins text-[#000000] text-sm text-left dark:text-darkText font-semibold cursor-pointer' onClick={() => handleOpenUserProfile(like.user_id)}> {like.username}</p>
                                {/* <p className="text-[#747474] font-poppins text-xs text-left">{like.username}</p> */}
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
