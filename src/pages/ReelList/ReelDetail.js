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
import './style.css'
import Heart from '../../assets/heart1.png'
import formatTimeAgo from '../../components/formatTimeAgo';
import formatDate from '../../components/formatDate';
import Muted from '../../assets/muted.png'
import Unmute from '../../assets/unmuted.png'
import Play from '../../assets/play.png'
import Pause from '../../assets/pause.png'
import Like from '../../assets/Like.png'
import Comment from '../../assets/Comment.png'
import Bookmark from '../../assets/Bookmark.png'
import Like1 from '../../assets/Like1.png'
import Comment1 from '../../assets/Comment1.png'
import Bookmark1 from '../../assets/Bookmark1.png'
import Likes from './LikesList';
import Comments from './Comments'
import Bookmarks from './BookmarkList';
import { GoHeart } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { GoBookmark } from "react-icons/go";

function ReelDetail({open,handleClose,handleDelete,postId}) 
{
    const [activePage,setActivePage] = useState("1")
    const {data,loading,refetch,postData} = useApiPost()
    const [comments,setComments] = useState([])
    const [pageNo,setPageNo] = useState(1)
    const [hasMoreComments,setHasMoreComments] = useState()
    const commentsEndRef = useRef(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const [showReplies, setShowReplies] = useState({}); // Remove TypeScript type
    const [replies,setReplies] = useState({})
    const [subLikes,setSubLikes] = useState({})
    const [subCounts,setSubCounts] = useState({})
    const [likes,setLikes] = useState({})
    const [counts,setCounts] = useState({})
    const [subCommentReplies,setSubCommentReplies] = useState({})
    const [currentImageIndex,setCurrentImageIndex] = useState(0);

    const token = Cookies.get("token")
    const {data:AllReelPostData,refetch:AllReelPostRefetch} = useGetAllPostReelQuery({token:token})
    const postDetails = AllReelPostData?.recent_content.find(post => Number(post.post_id) === Number(postId))
    console.log("Post Details !!!",postDetails)

    const [muted,setMuted] = useState(true)
    const videoRef = useRef(null);
    
    const handleGetComments = async (reset = false) => {
        setLoadingMore(true);
        let allComments = [];
        let page = 1;
        let totalPages = 1;
      
        try {
          do {
            const payload = {
              reel_id: postId,
              page_no: page.toString(),
            };
      
            console.log("Payload sent to API:", payload);
      
            const response = await postData("/reel_on_comment", payload);
      
            if (Array.isArray(response?.all_reel_comment) && response.all_reel_comment.length > 0) {
              allComments = [...allComments, ...response.all_reel_comment];
            }
      
            totalPages = response?.total_page || 1;
            page++;
          } while (page <= totalPages);
      
          // Set all comments after fetching all pages
          setComments(allComments);
          setPageNo(totalPages);
          setHasMoreComments(page <= totalPages);
        } catch (error) {
          toast.error(error?.data?.message || "Failed to fetch comments.");
        }
        setLoadingMore(false);
      };

      const handleToggleReplies = async (commentId, page = 1) => {
        // Toggle visibility
        setShowReplies((prev) => ({
          ...prev,
          [commentId]: !prev[commentId],
        }));
      
        // Fetch replies if not already loaded or need pagination
        if (!replies[commentId] || page > 1) {
          try {
            const response = await postData("/reel_on_comment", {
              reel_id: postId,
              page_no: page.toString(),
              comment_id: commentId,
            });
      
            if (response?.all_reel_comment) {
              setReplies((prev) => ({
                ...prev,
                [commentId]: page === 1
                  ? response.all_reel_comment
                  : [...(prev[commentId] || []), ...response.all_reel_comment],
              }));
            }
          } catch (error) {
            toast.error(error?.data?.message || "Failed to fetch replies.");
          }
        }
      };
      

      const handleScroll = () => {
        if (!hasMoreComments || loadingMore || !commentsEndRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = commentsEndRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          handleGetComments(true); // Load next page of comments
        }
      };
    
    console.log("Subcomment !!!",subCommentReplies)

    const handleGetReplyComments = async (subcommentId, commentId, reset = false) => {
        setLoadingMore(true);
        let allReplies = [];
        let page = 1;
        let totalPages = 1;
      
        try {
          do {
            const response = await postData("/reel_reply_on_comment", {
              post_subcomment_id: subcommentId,
              post_comment_id: commentId,
              page_no: page.toString(),
            });
      
            if (Array.isArray(response?.all_post_comment) && response.all_post_comment.length > 0) {
              allReplies = [...allReplies, ...response.all_post_comment];
            }
      
            totalPages = response?.total_page || 1;
            page++;
          } while (page <= totalPages);
      
          // Update subCommentReplies to show real-time updates
          setSubCommentReplies((prev) => ({
            ...prev,
            [subcommentId]: allReplies,
          }));
      
          setPageNo(totalPages);
          setHasMoreComments(page <= totalPages);
        } catch (error) {
          toast?.error(error?.data?.message || "Failed to fetch replies.");
        }
        setLoadingMore(false);
      };
      
      const handleToggleSubCommentReplies = async (subcommentId, commentId, page = 1) => {
        setSubCommentReplies((prev) => ({
          ...prev,
          [subcommentId]: prev[subcommentId] ? null : [],
        }));
      
        if (!subCommentReplies[subcommentId] || page > 1) {
          try {
            const response = await postData("/reel_reply_on_comment", {
              reel_subcomment_id: subcommentId,
              reel_comment_id: commentId,
              page_no: page.toString(),
            });
      
            if (Array.isArray(response?.all_post_comment)) {
              setSubCommentReplies((prev) => ({
                ...prev,
                [subcommentId]: page === 1 ? response.all_post_comment : [...prev[subcommentId], ...response.all_post_comment],
              }));
            }
          } catch (error) {
            toast.error(error?.data?.message || "Failed to fetch subcomment replies.");
          }
        }
      };

    useEffect(() => {
        handleGetComments()
    },[postId])

    const [isPlaying, setIsPlaying] = useState(true);
    // const videoRef = useRef(null);
    
    // Toggle play/pause when video is clicked
    const [showControls, setShowControls] = useState(false);
  
    const handleVideoClick = () => {
      if (videoRef.current) {
        if (videoRef.current.paused) {
          videoRef.current.play();
          setIsPlaying(true);
          setShowControls(false); // Hide immediately when playing
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
          setShowControls(true); // Show controls when paused
        }
      }
    };
    
    // Optional: Show button when paused or on initial load
    useEffect(() => {
      if (!isPlaying) {
        setShowControls(true);
      }
    }, [isPlaying]);

    const handleMuteToggle = () => {
        if (videoRef.current) {
          videoRef.current.muted = !muted;
          videoRef.current.volume = muted ? 1.0 : 0.0; // Unmute sets volume to 100%
          setMuted(!muted);
        }
      };

    console.log("All Comments !!",subCommentReplies)
    console.log("Image !!!",postDetails?.post_image[currentImageIndex].url)

    const [option,setOption] = useState("Like")
    
    return(
            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
            <DialogContent className="grid grid-cols-2 " sx={{padding:0}}>
                {/* Left Image */}
                <div className="relative h-[90vh] flex items-center justify-center bg-[#000000]">
          {postDetails?.post_image?.length > 0 && (
            <video autoPlay
              playsInline 
              ref={videoRef}
              onClick={handleVideoClick}
              muted={muted}
              src={postDetails.post_image[currentImageIndex].url}
              alt="Post"
              className="object-contain w-full h-full rounded-lg"
            />
          )}
          {/* Mute Unmute Button */}
      <div className="absolute flex gap-4 bottom-6 right-6">
        <button
          className="bg-[#000000] bg-opacity-[22%] backdrop-blur-md rounded-full p-2"
          onClick={handleMuteToggle}
        >
          <img
            src={muted ? Muted : Unmute}
            alt="mute unmute"
            width={20}
            height={20}
          />
        </button>
      </div>

      {/* play pause button */}
      {!isPlaying && showControls && (
    <div className="absolute inset-0 flex items-center justify-center">
      <button
        onClick={handleVideoClick}
        className="p-4 bg-black bg-opacity-50 rounded-full backdrop-blur-md"
      >
        <img
          src={isPlaying ? Pause : Play}
          alt="play_pause"
          height={20}
          width={20}
        />
      </button>
    </div>
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
              <h2 className="font-gilroy_semibold text-[#000000] font-semibold text-base dark:text-darkText">{postDetails?.username}</h2>
              <p className="font-gilroy_md text-sm text-[#3A3A3A]">{postDetails?.location}</p>
            </div>
          </div>

          {/* Caption and Date */}
          <div className="flex items-start gap-3 px-4 py-4">
            
            <div className="flex-1 space-y-5">
             
              <div className="space-y-3">
              <p className="text-[#B0B0B0] font-poppins text-xs">{formatDate(postDetails?.created_at)}</p>
              </div>
            </div>
          </div>

          {/* All Like Comment Bookmark Button */}
          <div className="flex justify-around mx-4 border dark:border-[#1F1F1F] rounded-lg">
            {/* Like button */}
            <button
              className={`flex flex-1 gap-1 items-center justify-center py-2  font-poppins text-base transition-all duration-200 ${
                option === "Like"
                  ? "bg-opacityGradient text-sidebarText dark:text-darkText rounded-tl-lg rounded-bl-lg"
                  : "bg-transparent text-[#000000] dark:text-gray-500"
              }`}
              onClick={() => setOption("Like")}
            >
              {/* <img src={option === "Like" ? Like1 : Like} className="w-5 h-5" /> */}
                  <GoHeart className={`w-5 h-5 ${option === "Like" ? "text-sidebarText dark:text-darkText" : "text-[#000000] dark:text-gray-500"}`}/>
              
              Like
            </button>
          
            {/* Divider */}
            <div className="self-center h-10 border dark:border-[#1F1F1F]" />
          
            {/* Comment button */}
            <button
              className={`flex flex-1 gap-1 items-center justify-center py-2  font-poppins text-base transition-all duration-200 ${
                option === "Comment"
                  ? "bg-opacityGradient text-sidebarText dark:text-darkText"
                  : "bg-transparent text-[#000000] dark:text-gray-500"
              }`}
              onClick={() => setOption("Comment")}
            >
              {/* <img src={option === "Comment" ? Comment1 : Comment} className="w-5 h-5" /> */}
                  <GoComment  className={`w-5 h-5 ${option === "Comment" ? "text-sidebarText dark:text-darkText" : "text-[#000000] dark:text-gray-500"}`}/>
              
              Comment
            </button>
          
            {/* Divider */}
            <div className="self-center h-10 border dark:border-[#1F1F1F]" />
          
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
                <Likes reelId={postId}/>
              )}

              {option === "Comment" && (
                <Comments postId={postId}/>
              )}

              {option === "Bookmark" && (
                <Bookmarks reelId={postId}/>
              )}
                

        </div>

                {/* ================================== */}
                
            </DialogContent>
        </Dialog>

    )
}

export default ReelDetail;
