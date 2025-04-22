import React,{useState,useEffect} from 'react'
import Profile from '../../assets/user_profile.png'
import useApiPost from '../hooks/postData';
import Empty from '../../assets/empty.png'
import { useNavigate,useLocation } from 'react-router-dom';
import Cookies from 'js-cookie'

function Likes({postId}) 
{
    const {data,error,postData} = useApiPost();
    const [userId,setUserId] = useState("")
    const navigate = useNavigate()
    const handleGetLikeList = () => {
        try{
            const response = postData("/post_like_list",{post_id:postId})
        } catch(error){  
        }
    }
    const LikeList = data?.post_like_list
    useEffect(() => {
        handleGetLikeList()
    },[postId])
    console.log("Post !!!",LikeList)

    // To open User profile
  const location = useLocation()
  const handleOpenUserProfile = (userId) => {
    const currentPath = location.pathname.split("/")[1]; // gets 'reel-list', 'user-list', etc.
    setUserId(userId);
    Cookies.set("userId", userId);
    navigate(`/${currentPath}/user-profile`);
  };
 
    return(
        <>
        {LikeList?.length > 0 ? (<>
            <div className='py-6 overflow-y-auto '>
        {LikeList?.map((like) => (
            <>
                <div className="flex items-center border-b border-[#EFEFEF] justify-between p-2 rounded-md cursor-pointer light:hover:bg-gray-100">
                    <div className='flex px-4'>
                        <img src={like.profile_pic || "/assets/default_user.png"} alt={like.username}  className="w-12 h-12 mr-3 rounded-full" />
                            <div className='flex flex-col justify-center py-2 text-left'>
                                <p className='font-poppins text-[#000000] text-sm text-left cursor-pointer font-semibold dark:text-darkText' onClick={() => handleOpenUserProfile(like.user_id)}> {like.username}</p>
                                {/* <p className="text-[#747474] font-poppins text-xs text-left">{like.username}</p> */}
                            </div>
                    </div>
                </div>
            </>
        ))}
        </div>
        </>) : (<>
          <div className='py-48 place-items-center'>
            <img src={Empty} className='w-14 h-14 '/>
            <p className='text-[#B4B4B4] font-poppins text-base dark:text-darkText'>No Likes</p>
          </div>
        </>)}
        </>
    )
}

export default Likes;