import React, { useEffect } from 'react'
import Vector from '../../assets/vectorLike.png'
import Profile from '../../assets/user_profile.png'
import Empty from '../../assets/empty.png'
import useApiPost from '../hooks/postData'

function SubCommentReplyLikeList({onClose,ReplyId}) 
{
    const {data,error,postData} = useApiPost
    const handleGetReplyCommentLikeList = () => {
        try{
            const response = postData("/reel_reply_like_list",{reel_reply_id:ReplyId})
        } catch(error){}
    }

    useEffect(() => {
        handleGetReplyCommentLikeList()
    },[ReplyId])

    const ReplyLikeList = data?.reel_reply_like_list 
    console.log("Reply Comment !!!",ReplyId)

   
    return(
        <>
            <div className="relative py-6 text-center bg-white shadow-lg w-80 rounded-xl">
                <div className="absolute -top-5 left-6 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[20px] border-l-transparent border-r-transparent  border-b-white"></div>
            <button className="absolute text-sm top-2 right-2 sm:text-[#1B191F] text-[#FFFFFF] rounded-full px-3 py-1" onClick={onClose}>
                
              ✕
            </button>
            <div className="items-center justify-center mb-4 place-items-center">
                <p className=" font-bold text-base text-center font-gilroy_semibold text-[#000000] xl:text-[#000000] ">Like</p>
                <img src={Vector} className="w-8" />
            </div>

            {/* All Like User List */}
            <div className='justify-center px-8'>
            {ReplyLikeList?.map((like) => (
            <>
                <div className="flex items-center border-b border-[#EFEFEF] justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100">
                    <div className='flex '>
                        <img src={like.profile_pic || "/assets/default_user.png"} alt={like.username}  className="mr-3 rounded-full w-14 h-14" />
                            <div className='flex flex-col py-2 text-left place-items-center'>
                                <p className='font-poppins text-[#000000] text-sm text-left  font-semibold'> {like.username}</p>
                                {/* <p className="text-[#747474] font-poppins text-xs text-left">{like.username}</p> */}
                            </div>
                    </div>    
                </div>
            </>
            ))}
            </div>
            </div>
        </>
    )
}

export default SubCommentReplyLikeList;

