import React,{useEffect,useState} from "react";
import UserProfile from '../../assets/user_profile.png'
import useApiPost from "../hooks/postData";
import Empty from '../../assets/empty.png'
import Loader from '../../assets/Loader.gif'
import { useLocation,useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

function StoryLikeList({storyId}) 
{
    const {data,error,postData} = useApiPost();
    const[isLoading,setIsLoading] = useState(false)
    const handleGetViewList = () => {
        setIsLoading(true)
        try{
            const response = postData("/story_like_list",{story_id:storyId})
        } catch(error){
            
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleGetViewList()
    },[storyId])

    const LikeList = data?.story_like_list
    console.log("View @@@",LikeList)

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
        {isLoading ? (<>
           <div><img src={Loader} className="w-10 h-10"/></div>
        </>) : 
        
        (<>
           {LikeList?.length > 0 ? (<>
            <div className='py-6 overflow-y-auto '>
                    {LikeList.map((view) => (
                        <>
                            <div className="flex items-center border-b border-[#EFEFEF] justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100">
                                <div className='flex px-4'>
                                    <img src={view.profile_pic || "/assets/default_user.png"} alt={view.username}  className="w-12 h-12 mr-3 rounded-full" />
                                        <div className='flex flex-col justify-center py-2 text-left place-items-center'>
                                            <p className='font-poppins text-[#000000] text-sm text-left  font-semibold cursor-pointer' onClick={() => handleOpenUserProfile(view.user_id)}> {view.username}</p>
                                            {/* <p className="text-[#747474] font-poppins text-xs text-left">{like.username}</p> */}
                                        </div>
                                </div>
                            </div>
                        </>
                    ))}
                    </div>
        
        </>) : (<>
          <div className='py-52 place-items-center'>
                     <img src={Empty} className='w-12 h-12 '/>
                     <p className='text-[#B4B4B4] font-poppins text-base'>No Likes</p>
                   </div>
        </>) }
        </>)}
       
        
        </>
    )
}

export default StoryLikeList;