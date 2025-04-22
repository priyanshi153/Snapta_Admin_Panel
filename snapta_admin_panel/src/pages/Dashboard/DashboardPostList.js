import React, { useEffect,useState } from "react";
import Loader from '../../assets/Loader.gif'
import useApiPost from "../hooks/postData";
import { Link } from "react-router-dom";
import formatDate from "../../components/formatDate";
import formatTime from "../../components/formatTime";

function PostList() 
{
    const [isLoading,setIsLoading] = useState(false)
    const {data,error,postData,refetch} = useApiPost();
    const handleGetPostList = async() => {
        try{
          const response = await postData("/get_all_latest_post_pagination")
        } catch(error){
        }
      }

    useEffect(() => {
        handleGetPostList()
    },[refetch])

    const AllPostList = data?.rescent_post
    return(
        <>
          <div className="border border-[#D1D5DB] dark:border-[#1F1F1F] px-4 w-full py-5 rounded-lg">
            
            {/* Title and View All */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#000000] font-poppins text-base font-semibold dark:text-darkText">Post Summary</h2>
                <Link to="/post-list"><p className="cursor-pointer text-[#484848] text-sm underline font-poppins">View All</p></Link>
            </div>

            {/* Table */}
            {/* <div className="border border-[#E3E3E3] rounded-lg overflow-hidden "> */}
            <div className="border border-[#E3E3E3] rounded-lg dark:border-[#1F1F1F] overflow-x-auto w-">
      <div className='w-full xl:overflow-x-auto lg:overflow-x-auto 2xl:overflow-hidden '>
 <div className='min-w-max'>
                {/* Table Header */}
                <div className="flex w-full px-4 py-4 text-left border-b border-[#1F1F1F] bg-header ">
                  <div className="2xl:w-[8%] xl:w-[5%] text-[#FFFFFF] font-poppins text-sm">S.L</div>
                
                  <div className="2xl:w-[13%] xl:w-[13%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">POST IMAGE</div>
                
                  {/* USERNAME COLUMN */}
                  <div className="2xl:w-[30%] xl:w-[25%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">
                    USERNAME
                  </div>
                
                  {/* DATE/TIME COLUMN */}
                  <div className="w-[18%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">
                    POSTED DATE/TIME
                  </div>
                
                  {/* LIKES COLUMN */}
                  <div className="w-[12%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">
                    LIKES
                  </div>
                
                  {/* COMMENTS COLUMN */}
                  <div className="w-[20%] text-[#FFFFFF] font-poppins text-sm flex items-center gap-2">
                    COMMENTS
                  </div>
                </div>
            

            {/* Table Data */}
            {AllPostList?.slice(0,5).map((post, index) => (
    <div key={post.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-primary' : 'bg-[#00162e0a] dark:bg-primary'} flex items-center px-4 py-3 dark:border-[#1F1F1F] border-b last:border-0`}>
      {/* Serial Number */}
      <div className="2xl:w-[8%] xl:w-[5%] lg:w-[5%] text-[#000000] dark:text-darkText font-poppins text-sm">{ index + 1}</div>

      {/* Post Image */}
      <div className={`w-[13%] relative cursor-pointer  ${post.post_images.length > 1  }`}>
        <img src={post.post_images[0].url} className='object-cover rounded-lg w-14 h-14'/>
        {/* more images div */}
        {post.post_images.length > 1 && (
          <div className='absolute inset-0 bg-[#000000] bg-opacity-40 justify-center w-14 h-14 rounded-lg font-poppins text-[#ffffff] py-3.5 px-4'>
            +{post.post_images.length - 1}
          </div>
        )}
      </div>

      {/* Username */}
      <div className="2xl:w-[30%] xl:w-[25%] lg:w-[20%] flex gap-2 items-center">
        <img src={post.profile_pic} className="w-12 h-12 rounded-full"/>
        <div>
          <h2 className="text-[#00162e] font-poppins text-sm font-semibold cursor-pointer dark:text-darkText" >{post.username}</h2>
          <p className="text-xs text-[#777777] font-poppins">{post.email}</p>
        </div>
      </div>

      {/* Date and Time */}
      <div className="w-[18%]">
        <h2 className="text-[#00162e] font-poppins text-sm dark:text-darkText">{formatDate(post.created_at)}</h2>
        <h2 className="text-[#7A7A7A] font-poppins text-xs">{formatTime(post.created_at)}</h2> 
      </div>

      {/* Likes */}
      <div className="w-[12%] text-[#3A3A3A] font-poppins text-sm dark:text-gray-500">{post.total_likes} {post.total_likes > 1 ? "Likes" : "Like"}</div>

      {/* Comments */}
      <div className="w-[20%] text-[#3A3A3A] font-poppins text-sm dark:text-gray-500">{post.total_comments} {post.total_comments > 1 ? "Comments" : "Comment"}</div>
      
    </div>
            ))}

{isLoading && (
                <div className='flex justify-center py-60'><img src={Loader} alt="loader" height={50} width={50}/></div>
               )}
            </div> 
            </div>
            </div>

           
            
          </div>
        </>
    )
}

export default PostList