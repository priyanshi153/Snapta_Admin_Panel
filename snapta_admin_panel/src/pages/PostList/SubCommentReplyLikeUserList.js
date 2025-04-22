import React, { useEffect } from 'react'
import Vector from '../../assets/vectorLike.png'
import Profile from '../../assets/user_profile.png'
import useApiPost from '../hooks/postData'
import Empty from '../../assets/empty.png'

function SubCommentReplyLikeUserList({onClose,subCommentReplyId}) 
{
    const {data,error,postData} = useApiPost();
    const handleGetSubcommentReply = () => {
        try{
            const response = postData("/post_reply_like_list",{post_reply_id:subCommentReplyId})
        } catch(error){
            
        }
    }
    useEffect(() => {
        handleGetSubcommentReply()
    },[subCommentReplyId])
    const SubCommentReplyLikeList = data?.post_reply_like_list
    console.log("Reply Comments !!!",SubCommentReplyLikeList)
    
        
    return(
        <>
            <div className="relative py-6 text-center bg-white shadow-lg dark:bg-primary w-72 rounded-xl">
                <div className="absolute -top-5 left-6 w-0 h-0 border-l-[20px] dark:border-b-primary border-r-[20px] border-b-[20px] border-l-transparent border-r-transparent  border-b-white"></div>
            <button className="absolute dark:text-darkText text-sm top-2 right-2 sm:text-[#1B191F] text-[#FFFFFF] rounded-full px-3 py-1" onClick={onClose}>
              ✕
            </button>
            <div className="items-center justify-center mb-4 place-items-center">
                <p className=" font-bold text-base text-center font-gilroy_semibold text-[#000000] dark:text-darkText">Like</p>
                <img src={Vector} className="w-8" />
            </div>

            {/* All Like User List */}
            {SubCommentReplyLikeList?.length > 0 ? 
            
              (<>
                <div className='justify-center px-8'>
            {SubCommentReplyLikeList?.map((like) => (
            <>
                <div className="flex items-center border-b border-[#EFEFEF] justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100">
                    <div className='flex '>
                        <img src={like.profile_pic || "/assets/default_user.png"} alt={like.name}  className="w-10 h-10 mr-3 rounded-full" />
                            <div className='flex flex-col justify-center py-2 text-left place-items-center'>
                                <p className='font-poppins text-[#000000] text-sm text-left  font-semibold dark:text-darkText'> {like.username}</p>
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

export default SubCommentReplyLikeUserList;

