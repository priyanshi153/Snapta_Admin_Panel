import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import useApiPost from '../hooks/postData';
import MultiplePostIcon from '../../assets/multiple_post_icon.png';
import ReelIcon from '../../assets/reel_icon.png';
import Empty from '../../assets/empty.png';
import PostDetail from '../PostList/PostDetail';
import ReelDetail from '../ReelList/ReelDetail';

function Posts() {
  const { data, loading, postData } = useApiPost();
  const [posts, setPosts] = useState([]);
  const userId = Cookies.get('userId');

  useEffect(() => {
    if (userId) {
      const fetchPosts = async () => {
        try {
          const response = await postData("/second_user_tag_post", { to_user_id: userId });
          setPosts(response?.post || []);
        } catch (error) {
          console.error("Error fetching posts", error);
        }
      };
      fetchPosts();
    }
  }, [userId]);

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const [openReelDetail, setOpenReelDetail] = useState(false);
  const [selectedReelId, setSelectedReelId] = useState(null);

  const handleReelDetailOpen = (postId) => {
    setOpenReelDetail(true);
    setSelectedReelId(postId);
  };

  const handleReelDetailClose = () => {
    setOpenReelDetail(false);
    setSelectedReelId(null);
  };

  const handlePostDetailOpen = (postId) => {
    setOpenDetail(true);
    setSelectedPostId(postId);
  };

  const handlePostDetailClose = () => {
    setOpenDetail(false);
    setSelectedPostId(null);
  };

  return (
    <>
      {posts?.length > 0 ? (
        <div className="grid grid-cols-4 gap-2 py-4 px-36">
          {posts.map((item, index) => {
            const isReel = item.type === 'reel';
            const mediaArray = item.image || [];
            const hasMultipleMedia = mediaArray.length > 1;
            const media = mediaArray[0];

            return (
              <div key={index} className="relative overflow-hidden cursor-pointer">
                {isReel ? (
                  <video
                    className="object-cover w-full transition-all duration-300 cursor-pointer h-80 hover:scale-110"
                    src={media?.url}
                    poster={media?.post_video_thumbnail}
                    muted
                    loop
                    autoPlay
                    onClick={() => handleReelDetailOpen(item.post_id)}
                  />
                ) : (
                  <img
                    src={media?.url}
                    alt="User media"
                    className="object-cover w-full transition-all duration-300 cursor-pointer h-80 hover:scale-110"
                    onClick={() => handlePostDetailOpen(item.post_id)}
                  />
                )}

                {/* Media type icon */}
                <div className="absolute flex space-x-1 text-white top-2 right-2 drop-shadow-md">
                  {isReel ? (
                    <img src={ReelIcon} className="w-7 h-7" alt="Reel icon" />
                  ) : (
                    hasMultipleMedia && <img src={MultiplePostIcon} className="w-5 h-5" alt="Multi-post icon" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col justify-center py-40 place-items-center">
          <img src={Empty} className="w-16 h-16" alt="No posts" />
          <p className="text-[#000000] text-opacity-[59%] font-poppins flex justify-center">No Tag Post</p>
        </div>
      )}

      {selectedPostId && (
        <PostDetail open={openDetail} postId={selectedPostId} handleClose={handlePostDetailClose} />
      )}

      {selectedReelId && (
        <ReelDetail open={openReelDetail} postId={selectedReelId} handleClose={handleReelDetailClose} />
      )}
    </>
  );
}

export default Posts;
