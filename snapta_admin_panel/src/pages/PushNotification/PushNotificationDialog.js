import React, { useState } from "react";
import Delete from '../../assets/delete.png';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Cross from '../../assets/cross.png'
import '../../components/DialogBoxCustom.css'
import useApiPost from "../hooks/postData";
import toast from "react-hot-toast";

function AddNotification({ open, handleClose, handleDelete }) {

    const {data,error,postData} = useApiPost()
    const [title,setTitle] = useState("")
    const [message,setMessage] = useState("")
    const handlePushNotification = () => {
        try{
            const response = postData("/add_notification",{title:title,message:message})
            toast.success("Push Notification Done Successfully!")
            handleClose()
        } catch(error){

        }
    }
  
    return (
        <Dialog open={open} onClose={handleClose} fullWidth className="dialog" >
            <DialogTitle className="flex justify-center text-base font-bold text-[#000000] font-poppins bg-[#FFFFFF] shadow-lg rounded-lg">Push Notification</DialogTitle>
            <img src={Cross} className="absolute w-8 h-8 cursor-pointer top-4 right-2" onClick={handleClose} />
            <DialogContent className="flex flex-col mx-5">
                {/* Delete Icon */}
                <h2 className="text-base font-poppins text-[#000000] pt-6">Title</h2>
                <input type="text" placeholder="Enter Title"
                className="border border-opacity-gradient rounded-lg w-full py-2 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                onChange={(e) => setTitle(e.target.value)}/>
                
                <h2 className="text-base font-poppins text-[#000000] pt-6">Description</h2>
                <textarea className="border border-opacity-gradient rounded-lg w-full my-1 pt-2 px-4 min-h-[130px] resize-none placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                 placeholder="Write Description" onChange={(e) => setMessage(e.target.value)}/>
            </DialogContent>
            
            <DialogContent className="flex justify-center gap-4">
                <div className="flex justify-center pb-8">
                    <button className="px-20 py-3 font-medium text-white rounded-xl bg-button-gradient" 
                    onClick={handlePushNotification}>
                        Submit
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AddNotification;
