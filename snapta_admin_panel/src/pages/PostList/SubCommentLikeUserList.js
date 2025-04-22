import React,{useEffect} from 'react'
import Vector from '../../assets/vectorLike.png'
import Profile from '../../assets/user_profile.png'
import useApiPost from '../hooks/postData'
import Empty from '../../assets/empty.png'

function SubCommentLikeUserList({onClose,subCommentId}) 
{
    const {data,error,postData} = useApiPost();
    const handleGetSubcomments = () => {
        try{
            const response = postData("/post_subcomment_like_list",{post_sub_comment_id:subCommentId})
        } catch(error){
            
        }
    }
    useEffect(() => {
        handleGetSubcomments()
    },[subCommentId])

    const SubCommentLikeList = data?.post_subcomment_like_list

    console.log("Subcomment Like List !!!",SubCommentLikeList)
    
    const LikeList = [
            {
                profile: Profile,
                name:"Alena",
                username:"_alena_"
            },
            {
                profile:Profile,
                name:"Serena",
                username: "serena123"
            },
            {
                profile:Profile,
                name:"Serena",
                username: "serena123"
            },
            {
                profile:Profile,
                name:"Serena",
                username: "serena123"
            },
            {
                profile:Profile,
                name:"Serena Lubin",
                username: "_serena123_"
            },
           
        ]
        
    return(
        <>
            <div className="relative py-6 text-center bg-white shadow-lg dark:bg-primary w-80 rounded-xl">
                <div className="absolute -top-5 left-6 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[20px] border-l-transparent border-r-transparent dark:border-b-primary border-b-white"></div>
            <button className="absolute text-sm top-2 right-2 sm:text-[#1B191F] text-[#FFFFFF] rounded-full px-3 py-1 dark:text-darkText" onClick={onClose}>
              ✕
            </button>
            <div className="items-center justify-center mb-4 place-items-center">
                <p className=" font-bold text-base text-center font-gilroy_semibold text-[#000000] xl:text-[#000000] dark:text-darkText">Like</p>
                <img src={Vector} className="w-8" />
            </div>

            {/* All Like User List */}
            {SubCommentLikeList?.length > 0 ? (<>
                <div className='justify-center px-8'>
            {SubCommentLikeList.map((like) => (
            <>
                <div className="flex items-center border-b border-[#EFEFEF] justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100">
                    <div className='flex '>
                        <img src={like.profile_pic || "/assets/default_user.png"} alt={like.name}  className="w-10 h-10 mr-3 rounded-full" />
                            <div className='flex flex-col py-2 text-left place-items-center'>
                                <p className='font-poppins text-[#000000] text-sm text-left  font-semibold dark:text-darkText'> {like.username}</p>
                                {/* <p className="text-[#747474] font-poppins text-xs text-left">{like.username}</p> */}
                            </div>
                    </div>    
                </div>
            </>
            ))}
            </div>
            </>) : (<>
               <div className='py-12 place-items-center'>
                 <img src={Empty} className='w-12 h-12 '/>
                 <p className='text-[#B4B4B4] font-poppins text-base'>No Likes</p>
                </div>
            </>) }
            
            </div>
        </>
    )
}

export default SubCommentLikeUserList;

