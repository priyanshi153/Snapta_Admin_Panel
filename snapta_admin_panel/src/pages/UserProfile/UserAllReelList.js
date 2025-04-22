import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import useApiPost from '../hooks/postData';
import { FaImages, FaVideo, FaClone } from 'react-icons/fa';
import MultiplePostIcon from '../../assets/multiple_post_icon.png'
import ReelIcon from '../../assets/reel_icon.png'
import Loader from '../../assets/Loader.gif'
import Empty from '../../assets/empty.png'
import PostDetail from '../PostList/PostDetail';
import ReelDetail from '../ReelList/ReelDetail';
import Shimmer from './Shimmer'

function Reels() {
  const { data, loading, postData } = useApiPost();
  const [posts, setPosts] = useState([]);
  const userId = Cookies.get('userId');
  const [isLoading,setIsLoading] = useState(false)

  const handleGetAllReel = async () => {
    setIsLoading(true)
    try {
      const response = await postData("/second_user_all_reel", { to_user_id: userId });
      setPosts(response?.reels || []);
    } catch (error) {
      console.error("Error fetching posts", error);
    } finally{
        setIsLoading(false)
    }
  };

  useEffect(() => {
    if (userId) handleGetAllReel();
  }, [userId]);

    const [selectedPostId,setSelectedPostId] = useState(null)
    const [openDetail, setOpenDetail] = useState(false)

    const [openReelDetail,setOpenReelDetail] = useState(false)
    const [selectedReelId,setSelectedReelId] = useState(null)
    const handleReelDetailOpen = (postId) => {
      setOpenReelDetail(true)
      setSelectedReelId(postId);
    };
    const handleReelDetailClose = () => {
       setOpenReelDetail(false)
       setSelectedReelId(null)
    }

    const handlePostDetailOpen = (postId) => {
      setOpenDetail(true)
      setSelectedPostId(postId);
    };
    const handlePostDetailClose = () => {
        setOpenDetail(false)
        setSelectedPostId(null)
     }
    console.log("Post !!!",posts)

  return (
    <>
   {isLoading ? (
  <div className="grid grid-cols-4 gap-2 py-4 px-36">
    {Array.from({ length: 2 }).map((_, index) => (
      <div key={index} className="w-full h-80">
        <Shimmer />
      </div>
    ))}
  </div>
) : posts?.length > 0 ? (
  <div className="grid grid-cols-4 gap-2 py-4 px-36">
    {posts.map((item, index) => {
      const isReel = item.type === 'video' || item.reel_id;
      const mediaArray = item.image || item.video || [];
      const hasMultipleMedia = mediaArray.length > 1;
      const mediaType = isReel ? 'video' : 'image';
      const mediaUrl = isReel
        ? mediaArray[0]?.reel_video_thumbnail || mediaArray[0]?.reel_video
        : mediaArray[0]?.url;

      return (
        <div key={index} className="relative overflow-hidden cursor-pointer">
          {mediaType === 'video' ? (
            <video
              className="object-cover w-full transition-all duration-300 cursor-pointer h-80 hover:scale-110"
              src={mediaArray[0]?.reel_video}
              poster={mediaArray[0]?.reel_video_thumbnail}
              muted
              loop
              autoPlay
              onClick={() => handleReelDetailOpen(item.reel_id)}
            />
          ) : (
            <div className="relative w-full overflow-hidden cursor-pointer h-80">
              <img
                src={mediaUrl}
                alt="media"
                className="object-cover w-full transition-all duration-300 h-80 hover:scale-110"
                onClick={() => handlePostDetailOpen(item.post_id)}
              />
            </div>
          )}

          {/* Media type and multi-icon */}
          <div className="absolute flex space-x-1 text-white top-2 right-2 drop-shadow-md">
            {mediaType === 'video' ? (
              <img src={ReelIcon} className="w-7 h-7" />
            ) : (
              <img src={MultiplePostIcon} className="w-5 h-5" />
            )}
          </div>
        </div>
      );
    })}
  </div>
) : (
  <div className="flex flex-col justify-center py-40 place-items-center ">
    <img src={Empty} className="w-16 h-16 " />
    <p className="text-[#000000] text-opacity-[59%] font-poppins flex justify-center">
      No Posts
    </p>
  </div>
)}
                  {selectedPostId && (
      <PostDetail open={openDetail} postId={selectedPostId} handleClose={handlePostDetailClose}/>
    )}
    {selectedReelId && (
      <ReelDetail open={openReelDetail} postId={selectedReelId} handleClose={handleReelDetailClose}/>
    )}
     
    </>
    
  );
}

export default Reels;
