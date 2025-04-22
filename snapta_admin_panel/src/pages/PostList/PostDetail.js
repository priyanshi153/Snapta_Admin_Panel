import React,{useState,useEffect,useRef} from 'react';
import useApiPost from '../hooks/postData';
import { useGetAllPostReelQuery } from '../../store/api/AllPostsReels';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material'
import { DialogContent } from '@mui/material'
import Post from '../../assets/Snapta.png'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import borderImage from '../../assets/Border.png'
import './PostStyle.css'
import ArrowLeft from '../../assets/arrow-left.png'
import ArrowRight from '../../assets/arrow-right.png'
import Heart from '../../assets/heart1.png'
import formatTimeAgo from '../../components/formatTimeAgo';
import formatDate from '../../components/formatDate';
import Like from '../../assets/Like.png'
import Comment from '../../assets/Comment.png'
import Bookmark from '../../assets/Bookmark.png'
import Like1 from '../../assets/Like1.png'
import Comment1 from '../../assets/Comment1.png'
import Bookmark1 from '../../assets/Bookmark1.png'
import Comments from './Comments'
import Likes from './LikesList';
import Bookmarks from './BookmarkList'
import { useNavigate } from 'react-router-dom';
import { GoHeart } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { GoBookmark } from "react-icons/go";

function PostDetail({open,handleClose,handleDelete,postId}) 
{
   
    const [option,setOption] = useState("Like")
    const [userId,setUserId] = useState("");
    const [currentImageIndex,setCurrentImageIndex] = useState(0);
    const navigate = useNavigate()
    const token = Cookies.get("token")
    const {data:AllReelPostData,refetch:AllReelPostRefetch} = useGetAllPostReelQuery({token:token})
    const postDetails = AllReelPostData?.recent_content.find(post => Number(post.post_id) === Number(postId))
    console.log("Post Details !!!",postDetails)

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex + 1 < postDetails?.post_image.length ? prevIndex + 1 : 0
        );
      };
    
      const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex - 1 >= 0 ? prevIndex - 1 : postDetails?.post_image.length - 1
        );
      };

      // To open User Profile 
      const handleOpenUserProfile = (userId) => {
          setUserId(userId)
          Cookies.set("userId",userId)
          navigate('/user-profile')
        }

    console.log("All Comments !!",postDetails)
    console.log("Image !!!",postDetails?.post_image[currentImageIndex].url)
    return(
            <Dialog open={open} onClose={handleClose} className='custom-post' fullWidth>
            <DialogContent className="grid grid-cols-2" sx={{padding:0}}>
                {/* Left Image */}
        <div className="relative h-[90vh] flex items-center justify-center bg-[#000000]">
          {postDetails?.post_image?.length > 1 && (
            <button
              onClick={handlePrevImage}
              className="absolute p-1 text-white bg-gray-400 rounded-full bg-opacity-60 left-2">
              <img src={ArrowLeft} className='w-4 h-4'/>
            </button>
          )}
          {postDetails?.post_image?.length > 0 && (
            <img
              src={postDetails.post_image[currentImageIndex].url}
              alt="Post"
              className="object-contain w-full h-full"
            />
          )}
          {postDetails?.post_image?.length > 1 && (
            <button
              onClick={handleNextImage}
              className="absolute p-1 text-white bg-gray-400 rounded-full bg-opacity-60 right-2"
            >
              <img src={ArrowRight} className='w-4 h-4'/>
            </button>
          )}
        </div>

           
                {/* User Details Caption */}
                <div className='flex flex-col h-[90vh] dark:bg-primary'>
                <div className="flex items-center px-4 py-3" style={{ boxShadow: "0px 2px 10px 0px #0000001F" }}>
            <div className="relative w-[60px] h-[60px] flex justify-center items-center">
                    <img  src={borderImage} alt="Border"/>
              <img src={postDetails?.profile_pic} alt="User" className="absolute inset-0 rounded-full m-auto h-[50px] w-[50px]" />
            </div>
            <div className="px-2">
              <h2 className="font-gilroy_semibold text-[#000000] font-semibold text-base cursor-pointer dark:text-darkText" onClick={() => handleOpenUserProfile(postDetails?.user_id)}>{postDetails?.username}</h2>
              <p className="font-gilroy_md text-sm text-[#3A3A3A] dark:text-darkText">{postDetails?.location}</p>
            </div>
                </div>

          {/* Caption and Date */}
          <div className="flex items-start gap-3 px-4 py-4">
            <div className="flex-1 space-y-5">
              <p className="text-sm">
                {/* <span className="font-semibold font-gilroy_semibold text-[#000000] text-base">{postDetails?.username}</span>{" "} */}
                <span className="text-[#000000] font-poppins dark:text-darkText  break-words">
                   {postDetails?.text}
                </span>
              </p>
              <div className="space-y-3">
                <p className="text-[#B0B0B0] font-poppins text-xs">{formatDate(postDetails?.created_at)}</p>
              </div>
            </div>
          </div>

          {/* Comment Like Bookmark button */}
          <div className="flex justify-around mx-4 border rounded-lg">
  {/* Like button */}
  <button
    className={`flex flex-1 gap-1 items-center justify-center py-2  font-poppins text-base transition-all duration-200 ${
      option === "Like"
        ? " text-sidebarText bg-opacityGradient dark:text-darkText rounded-tl-lg rounded-bl-lg"
        : "bg-transparent text-[#000000] dark:text-gray-500"
    }`}
    onClick={() => setOption("Like")}
  >
    {/* <img src={option === "Like" ? Like1 : Like} className="w-5 h-5" /> */}
    <GoHeart className={`w-5 h-5 ${option === "Like" ? "text-sidebarText dark:text-darkText" : "text-[#000000] dark:text-gray-500"}`}/>
    Like
  </button>

  {/* Divider */}
  <div className="self-center h-10 border" />

  {/* Comment button */}
  <button
    className={`flex flex-1 gap-1 items-center justify-center py-2  font-poppins text-base transition-all duration-200 ${
      option === "Comment"
        ? "bg-opacityGradient text-sidebarText dark:text-darkText"
        : "bg-transparent text-[#000000] dark:text-gray-500"
    }`}
    onClick={() => setOption("Comment")}
  >
    {/* <img src={option === "Comment" ? Comment1 : Comment} className="w-5 h-5" />  */}
    <GoComment  className={`w-5 h-5 ${option === "Comment" ? "text-sidebarText dark:text-darkText" : "text-[#000000] dark:text-gray-500"}`}/>
    Comment
  </button>

  {/* Divider */}
  <div className="self-center h-10 border" />

  {/* Bookmark button */}
  <button
    className={`flex flex-1 gap-1 items-center justify-center py-2  font-poppins text-base transition-all duration-200 ${
      option === "Bookmark"
        ? "bg-opacityGradient text-sidebarText dark:text-darkText rounded-tr-lg rounded-br-lg"
        : "bg-transparent text-[#000000] dark:text-gray-500"
    }`}
    onClick={() => setOption("Bookmark")}
  >
    {/* <img src={option === "Bookmark" ? Bookmark1 : Bookmark} className="w-5 h-5" /> */}
    <GoBookmark className={`w-5 h-5 ${option === "Bookmark" ? "text-sidebarText dark:text-darkText" : "text-[#000000] dark:text-gray-500"}`} />
    Bookmark
  </button>
          </div>


          {option === "Like" && (
            <>
             <Likes postId={postId}/>
            </>
          )}

          {option === "Comment" && (
           
             <Comments postId={postId}/>
      
          )}

          {option === "Bookmark" && (
            <>
             <Bookmarks postId={postId}/>
            </>
          )}
                

        </div>

                {/* ================================== */}
                
            </DialogContent>
        </Dialog>

    )
}

export default PostDetail;
