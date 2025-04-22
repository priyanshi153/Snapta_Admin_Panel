import React,{useEffect, useState} from 'react'
import Profile from '../../assets/user_profile.png'
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { DialogTitle } from '@mui/material';
import Cross from '../../assets/cross.png'
import './UserProfile.css'
import useApiPost from '../hooks/postData';
import Cookies from 'js-cookie'
import Empty from '../../assets/empty.png'

function Following({open,handleClose}) 
{
    const {data,loading,error,refetch,postData} = useApiPost();
    const userId = Cookies.get("userId")
    const handleGetFollowing = async() => {
        try{
            const response = await postData("/second_user_following",{to_user_id:userId})
        } catch(error){
        }
    }

    useEffect(() => {
        handleGetFollowing();
    }, [userId]); 
    

    const FollowingList = data?.follower

    console.log("Followers @@@",FollowingList)
    const LikeList = [
        {
            name:"Alena",
            username:"_alena_",
        }
    ]
 
    return(
        <>
          <Dialog open={open} onClose={handleClose} fullWidth className='custom-user'>
            <div className="flex items-center justify-between pt-4 pr-5 pl-9 dark:bg-primary">
              <h2 className="text-[#000000] font-semibold text-xl font-poppins dark:text-darkText">Following</h2>
              <img
                src={Cross}
                alt="Close"
                className="w-10 h-10 cursor-pointer"
                onClick={handleClose}
              />
            </div>
          <DialogContent>
            {FollowingList?.length > 0 ? (
                <>
                  <div className='overflow-y-auto dark:bg-primary'>
        {FollowingList?.map((follower) => (
            <>
                <div className="flex items-center border-b dark:border-[#1F1F1F] border-[#EFEFEF] justify-between p-2 rounded-md cursor-pointer light:hover:bg-gray-100">
                    <div className='flex'>
                        <img src={follower.profile_pic || "/assets/default_user.png"} alt={follower.username}  className="w-12 h-12 mr-3 rounded-full" />
                            <div className='flex flex-col py-2 text-left'>
                                <p className='font-poppins text-[#000000] text-sm text-left dark:text-darkText font-semibold'> {follower.first_name} {follower.last_name}</p>
                                <p className="text-[#747474] font-poppins text-xs text-left">{follower.username}</p>
                            </div>
                    </div>
                </div>
            </>
        ))}
        </div>
                </>
            ) : 
            (<>
              <div className='flex flex-col justify-center place-items-center min-h-[400px]'>
                <img src={Empty} className='w-16 h-16 '/>
                <p className='text-[#000000] text-opacity-[59%] font-poppins flex justify-center'>You are not following anyone yet</p>
              </div>
            </>)}
            
          
          </DialogContent>
        </Dialog>
        </>
    )
}

export default Following;