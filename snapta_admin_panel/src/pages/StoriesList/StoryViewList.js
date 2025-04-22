import React,{useEffect, useState} from "react";
import UserProfile from '../../assets/user_profile.png'
import useApiPost from "../hooks/postData";
import Empty from '../../assets/empty.png'
import Loader from '../../assets/Loader.gif'
import { useNavigate,useLocation } from "react-router-dom";
import Cookies from 'js-cookie'

function StoryViewList({storyId}) 
{
    const {data,error,postData} = useApiPost();
    const handleGetViewList = () => {
        try{
            const response = postData("/story_seen_list",{story_id:storyId})
        } catch(error){
            
        }
    }

    useEffect(() => {
        handleGetViewList()
    },[storyId])

    const ViewList = data?.story_seen
    console.log("View @@@",ViewList)

    // To open user Profile 
    const location = useLocation()
    const [userId,setUserId] = useState()
    const navigate = useNavigate();
    const handleOpenUserProfile = (userId) => {
      const currentPath = location.pathname.split("/")[1]; // gets 'reel-list', 'user-list', etc.
      setUserId(userId);
      Cookies.set("userId", userId);
      navigate(`/${currentPath}/user-profile`);
    };
   
    return(
        <>
        {ViewList?.length > 0 ? (<>
            <div className='py-6 overflow-y-auto dark:bg-primary'>
                    {ViewList.map((view) => (
                        <>
                            <div className="flex items-center border-b border-[#EFEFEF] justify-between p-2 rounded-md cursor-pointer light:hover:bg-gray-100">
                                <div className='flex px-4'>
                                    <img src={view.profile_pic || "/assets/default_user.png"} alt={view.username}  className="w-12 h-12 mr-3 rounded-full" />
                                        <div className='flex flex-col justify-center py-2 text-left place-items-center'>
                                            <p className='font-poppins dark:text-darkText text-[#000000] text-sm text-left  font-semibold cursor-pointer' onClick={() => handleOpenUserProfile(view.user_id)}> {view.username}</p>
                                            {/* <p className="text-[#747474] font-poppins text-xs text-left">{like.username}</p> */}
                                        </div>
                                </div>
                            </div>
                        </>
                    ))}
                    </div>
        
        </>) : (<>
          <div className='py-48 place-items-center'>
                     <img src={Empty} className='w-12 h-12 '/>
                     <p className='text-[#B4B4B4] font-poppins text-base dark:text-darkText'>No Views</p>
                   </div>
        </>) }
        
        </>
    )
}

export default StoryViewList;