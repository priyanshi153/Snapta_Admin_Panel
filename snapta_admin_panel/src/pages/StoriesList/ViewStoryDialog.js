import React, { useEffect, useState } from 'react'
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ArrowRight from '../../assets/arrow-right.png'
import ArrowLeft from '../../assets/arrow-left.png'
import Post1 from '../../assets/Post1.png'
import UserProfile from '../../assets/user_profile.png'
import Like from '../../assets/Like.png'
import formatDate from '../../components/formatDate';
import useApiPost from '../hooks/postData';
import Eye from '../../assets/view_eye1.png'
import Eye1 from '../../assets/view_eye.png'
import Like1 from '../../assets/Like1.png'
import Cookies from 'js-cookie'
import formatTime from '../../components/formatTime'
import StorySeen from './StoryViewList'
import StoryLike from './StoryLikeList'
import { PiEyeLight } from "react-icons/pi";
import { GoHeart } from "react-icons/go";

function ViewStory({open,handleClose,handleDelete,storyId})
{
    const [option,setOption] = useState("View")
    const UsersList = [
        {
            name:"Lubin",
            username:"_alena_",
            created_at:"2025-03-28T06:25:27.000000Z"
        },
      
    ]
    
    const { data, error, isLoading, refetch,postData } = useApiPost()
    const token = Cookies.get("token")
    const handleGetStoriesList = async() => {
        try{
            const response = await postData("/get_all_latest_story_pagination",{token:token})} 
        catch(error){}
    }
    useEffect(() => {
        handleGetStoriesList()
    },[storyId])

    const StoryList = data?.recent_story.find(story => Number(story.story_id) === Number(storyId))
    // const StoryList = data?.recent_story.find((story) => story.story_id === storyId)
    // const StoryList = data?.recent_story
    console.log("StoryList @@ !!!",StoryList)
    const Story = StoryList
    
    return(
        <Dialog open={open} onClose={handleClose} fullWidth className='custom-story'>
            <DialogContent className="grid grid-cols-2" sx={{padding:0}}>
                {/* Left Image */}
                <div className="relative h-[90vh] flex items-center justify-center bg-[#000000]">
                    <img src={StoryList?.url} className='object-contain w-full h-full' />
                </div>

                    {/* Right Section details */}
                    <div className='flex flex-col h-[90vh] dark:bg-primary'>
                    {UsersList.map((story,index) => (
                    <>
                     <div className="flex items-center px-4 py-3" style={{ boxShadow: "0px 2px 10px 0px #0000001F" }}>
                     <div className="relative w-[60px] h-[60px] flex justify-center items-center">
                        {/* <img  src={borderImage} alt="Border"/> */}
                       <img src={StoryList?.profile_pic} alt="User" className="absolute inset-0 rounded-full m-auto h-[50px] w-[50px]" />
                     </div>
                     <div className="px-2">
                       <h2 className="font-gilroy_semibold text-[#000000] font-semibold text-base dark:text-darkText">{StoryList?.username}</h2>
                       {/* <p className="font-gilroy_md text-sm text-[#3A3A3A]">{postDetails?.location}</p> */}
                     </div>
                         </div>
         
                   {/* Date */}
                   <div className="flex items-start gap-3 px-4 py-4">
                     <div className="flex-1 space-y-5">
                       <div className="flex gap-2 ">
                         <p className="text-[#B0B0B0] font-poppins text-xs">{formatDate(StoryList?.created_at)}</p>
                         <p className='text-[#B0B0B0] font-poppins text-xs'>{formatTime(StoryList?.created_at)}</p>
                       </div>
                     </div>
                   </div>
                   </>
                ))}
                 <div className="flex justify-around mx-4 border rounded-lg">
  {/* Like button */}
  <button
    className={`flex flex-1 gap-1 items-center justify-center py-2  font-poppins text-base transition-all duration-200 ${
      option === "View"
        ? "bg-opacityGradient text-sidebarText dark:text-white rounded-lg"
        : "bg-transparent text-[#000000] dark:text-gray-500"
    }`}
    onClick={() => setOption("View")}
  >
    {/* <img src={option === "View" ? Eye1 : Eye} className="w-5 h-5" /> */}
    <PiEyeLight className={`w-6 h-6 ${option === "View" ? "text-sidebarText dark:text-white" : "text-[#000000] dark:text-gray-500"}`} />
    View 
  </button>

  <button
    className={`flex flex-1 gap-1 items-center justify-center py-2  font-poppins text-base transition-all duration-200 ${
      option === "Like"
        ? "bg-opacityGradient text-sidebarText dark:text-darkText rounded-lg"
        : "bg-transparent text-[#000000] dark:text-gray-500"
    }`}
    onClick={() => setOption("Like")}
  >
    {/* <img src={option === "Like" ? Like1 : Like} className="w-5 h-5" /> */}
        <GoHeart className={`w-5 h-5 ${option === "Like" ? "text-sidebarText dark:text-darkText" : "text-[#000000] dark:text-gray-500"}`}/>
    
    Like
  </button>

          </div>

          {/* All viewUser List */}
          {option === "View" && (
            <StorySeen storyId={storyId}/>
          )}

          {/* All User Like List */}
          {option === "Like" && (
            <StoryLike storyId={storyId}/>
          )}
        </div>
                
            </DialogContent>
        </Dialog>
    )
}

export default ViewStory;