import React,{useState,useRef,useEffect} from 'react'
import useApiPost from '../hooks/postData'
import Cookies from 'js-cookie'
import { useGetAllPostReelQuery } from '../../store/api/AllPostsReels'
import toast from 'react-hot-toast'
import formatTimeAgo from '../../components/formatTimeAgo';
import MainCommentLikeList from './MainCommentLikeUserList'
import SubCommentLikeUserList from './SubCommentLikeUserList'
import SubCommentReplyLikeUserList from './SubCommentReplyLikeUserList'
import { useNavigate,useLocation } from 'react-router-dom'

function Comments({postId}) 
{

    const [activePage,setActivePage] = useState("1")
    const [option,setOption] = useState("Like")
    const {data,loading,refetch,postData} = useApiPost()
    const [comments,setComments] = useState([])
    const [pageNo,setPageNo] = useState(1)
    const [hasMoreComments,setHasMoreComments] = useState()
    const commentsEndRef = useRef(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const [showReplies, setShowReplies] = useState({}); // Remove TypeScript type
    const [replies,setReplies] = useState({})
    const [subCommentReplies,setSubCommentReplies] = useState({})
    const [currentImageIndex,setCurrentImageIndex] = useState(0);
    const [isOpenCommentLikeList,setOpenCommentLikeList] = useState(false)
    const [openLikeCommentId,setOpenLikeCommentId] = useState(false)
    const [openLikeSubCommentId,setOpenLikeSubCommentId] = useState(false)
    const [openLikeReplySubCommentId,setOpenLikeReplySubCommentId] = useState(false)

    const [userId,setUserId] = useState("")
    const navigate = useNavigate()
  const location = useLocation()
  const handleOpenUserProfile = (userId) => {
    const currentPath = location.pathname.split("/")[1]; // gets 'reel-list', 'user-list', etc.
    setUserId(userId);
    Cookies.set("userId", userId);
    navigate(`/${currentPath}/user-profile`);
  };

    const token = Cookies.get("token")
    const {data:AllReelPostData,refetch:AllReelPostRefetch} = useGetAllPostReelQuery({token:token})
    const postDetails = AllReelPostData?.recent_content.find(post => Number(post.post_id) === Number(postId))
    console.log("Post Details !!!",postDetails)
    const handleGetComments = async (reset = false) => {
        setLoadingMore(true);
        let allComments = [];
        let page = 1;
        let totalPages = 1;
      
        try {
          do {
            const payload = {
              post_id: postId,
              page_no: page.toString(),
            };
      
            console.log("Payload sent to API:", payload);
      
            const response = await postData("/post_on_comment", payload);
      
            if (Array.isArray(response?.all_post_comment) && response.all_post_comment.length > 0) {
              allComments = [...allComments, ...response.all_post_comment];
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
            const response = await postData("/post_on_comment", {
              post_id: postId,
              page_no: page.toString(),
              comment_id: commentId,
            });
      
            if (response?.all_post_comment) {
              setReplies((prev) => ({
                ...prev,
                [commentId]: page === 1
                  ? response.all_post_comment
                  : [...(prev[commentId] || []), ...response.all_post_comment],
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
       
    const handleGetSubcomments = async(postId,commentId) => {
        setLoadingMore(true)
        try{
            const response = await postData("/post_on_comment",{post_id:postId,page_no:activePage,comment_id:commentId})
            setSubCommentReplies(response?.all_post_comment)
        } catch(error) {

        }
    }
    
    console.log("Subcomment !!!",subCommentReplies)

    const handleGetReplyComments = async (subcommentId, commentId, reset = false) => {
        setLoadingMore(true);
        let allReplies = [];
        let page = 1;
        let totalPages = 1;
        try {
          do {
            const response = await postData("/post_reply_on_comment", {
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
            const response = await postData("/post_reply_on_comment", {
              post_subcomment_id: subcommentId,
              post_comment_id: commentId,
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

    console.log("All Comments !!",postDetails)
    console.log("Image !!!",postDetails?.post_image[currentImageIndex].url)
    return(
        <>
           <div
  className="flex-1 px-5 py-5 overflow-x-hidden overflow-y-auto"
  ref={commentsEndRef}
  onScroll={handleScroll}>
  {comments?.map((comment) => (
    <div key={comment?.comment_id} className="py-4 border-b">
      {/* Comment */}
      <div className="flex">
        {/* Profile Image */}
        <div className="w-12 h-12 overflow-hidden rounded-full">
          <img src={comment?.profile_pic} alt="profile" className="object-cover w-full h-full" />
        </div>

        {/* Username, Comment, and Like Button */}
        <div className="flex-1 px-2">
        <div className="flex items-start justify-between gap-2">
  {/* Username & Comment */}
  <div className="flex-1 min-w-0">
    <h2 className="font-gilroy_regular font-semibold text-sm text-[#000000] cursor-pointer dark:text-darkText" onClick={() => handleOpenUserProfile(comment.user_id)}>
      {comment?.username}
    </h2>
    <p className="w-full text-sm text-[#202020] dark:text-tableDarkLarge break-words font-gilroy_regular">
      {comment?.text}
    </p>
  </div>
</div>

          {/* Meta Info & Reply Button */}
          <div className="text-xs flex items-center gap-2 text-[#B4B4B4] group relative">
 
  {/* <div className="flex items-center gap-1 text-[#B4B4B4] relative"> */}
 <p> {formatTimeAgo(comment.created_at)} </p>

  <p
    className="text-[#452B7A] font-poppins cursor-pointer hover:underline"
    onClick={() => setOpenLikeCommentId(comment.comment_id)}>
    {comment.total_like_count} like
  </p>

  {openLikeCommentId === comment.comment_id && (
    <div className="absolute left-0 z-10 mt-2 top-full">
      <MainCommentLikeList onClose={() => setOpenLikeCommentId(null)} commentId={comment.comment_id} />
    </div>
  )}
</div>

   {/* <button>
      <img src="/assets/comment_report.png" className="w-3 h-3" />
    </button> */}
          {/* </div> */}

          {/* Replies Toggle */}
          {comment?.total_comment_count > 0 && (
            <div className="flex items-center px-4 place-items-center">
              <hr className=" border-[#656565] w-[35px]" />
              <button className="text-xs text-[#656565] px-2" onClick={() => handleToggleReplies(comment.comment_id)}>
                {showReplies[comment?.comment_id] ? "Hide Replies" : `View Replies (${comment.total_comment_count})`}
              </button>
              <hr className=" border-[#656565] w-[35px]" />
            </div>
          )}
          
          {/* Replies Section */}
          {showReplies[comment?.comment_id] && (
            <div className="pl-5 mt-2 border-gray-300">
              {replies[comment?.comment_id]?.map((reply) => (
                <div key={reply?.comment_id} className="flex gap-3 py-2">
                  {/* Profile Image */}
                  <div className="w-10 h-10 overflow-hidden rounded-full">
                    <img src={reply?.profile_pic} alt="profile" className="object-cover w-full h-full" />
                  </div>
                  {/* Comment Content */}
                  <div className="flex-1">
                    {/* Username and Like Button in One Line */}
                    <div className="flex items-start justify-between">
                      <div>
                      <h2 className="font-semibold text-sm text-[#000000] font-gilroy_regular cursor-pointer dark:text-darkText" onClick={() => handleOpenUserProfile(reply.user_id)}>
                        {reply?.username}
                      </h2>
                      <p className="text-sm text-[#202020] overflow-x-hidden text-wrap break-words break-all w-[300] dark:text-tableDarkLarge">{reply?.text}</p>
                      </div>
                     
                    </div>

                    {/* Time and Reply Button */}
          <div className="text-xs flex items-center gap-2 text-[#B4B4B4] group relative">

    <span className='text-[#B4B4B4] font-poppins'>{formatTimeAgo(reply?.created_at)} </span>
    {/* Total Likes */}
    <p className='text-[#452B7A] hover:underline font-poppins text-xs cursor-pointer' onClick={() => setOpenLikeSubCommentId(reply.post_sub_comment_id)}>{reply.total_like_count} like</p>
    {openLikeSubCommentId === reply.post_sub_comment_id && (
    <div className="absolute left-0 z-10 mt-2 top-full">
      <SubCommentLikeUserList onClose={() => setOpenLikeSubCommentId(null)} subCommentId={reply.post_sub_comment_id} />
    </div>
  )}

</div>
        

                    {/* Subcomment show hide button */}
                    {reply?.total_reply_count > 0 && (
    <div key={`toggle-${reply?.post_sub_comment_id}`} className="flex items-center px-4 pt-2">
      <hr className="border-[#656565] w-[35px]" />
      <button
        className="text-xs text-[#656565] px-2"
        onClick={() => handleToggleSubCommentReplies(reply?.post_sub_comment_id,reply?.comment_id)}
        >
        {subCommentReplies[reply?.post_sub_comment_id] ? "Hide Replies" : `View Replies (${reply.total_reply_count})`}
      </button>
      <hr className="border-[#656565] w-[35px]" />
    </div>)}

    {/* All subcomment replies */}
    
    {subCommentReplies[reply?.post_sub_comment_id]?.map((subReply) => (
  <div key={subReply?.comment_id} className="flex gap-3 py-2 pl-8">
    {/* Profile Image */}
    <div className="w-8 h-8 overflow-hidden rounded-full">
      <img src={subReply?.profile_pic} alt="profile" className="object-cover w-full h-full" />
    </div>
    {/* Comment Content */}
    <div className="flex-1">
      <div className="flex items-start justify-between">
        <div>
        <h2 className="font-semibold text-sm text-[#000000] cursor-pointer dark:text-darkText" onClick={() => handleOpenUserProfile(subReply.user_id)}>{subReply?.username}</h2>
        <p className="text-sm dark:text-tableDarkLarge text-[#202020] overflow-x-hidden text-wrap break-words break-all w-[100]">{subReply?.text}</p>
        </div>
      </div>
    
      {/* Time and Reply Button */}
      <div className="text-xs flex items-center gap-2 text-[#B4B4B4] group relative">

    <span className='text-[#B4B4B4] font-poppins text-xs'>{formatTimeAgo(subReply?.created_at)} </span>
    {/* Total Likes */}
    <p className='text-[#452B7A] hover:underline font-poppins text-xs cursor-pointer' onClick={() => setOpenLikeReplySubCommentId(subReply.post_reply_id)}>
        
        {reply.total_like_count} like</p>
    {openLikeReplySubCommentId === subReply.post_reply_id && (     
    <div className="absolute left-0 z-10 mt-2 top-full">
      <SubCommentReplyLikeUserList onClose={() => setOpenLikeReplySubCommentId(null)} subCommentReplyId={subReply.post_reply_id} />
    </div>
  )}

</div>
    </div>
  </div>
    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  ))}
  {loadingMore && <p className="py-2 text-center">Loading...</p>}
             </div>
        </>
    )
}

export default Comments;