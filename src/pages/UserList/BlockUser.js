import React, { useState } from "react";
import Delete from '../../assets/delete.png';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Block from '../../assets/Block_Popup.png'
import '../ReelList/style.css'
import './style.css' 
import useApiPost from "../hooks/postData";
import toast from "react-hot-toast";
import { MdBlockFlipped } from "react-icons/md";

function BlockUser({ open, handleClose, handleDelete,UserID }) {
    const {data,error,postData} = useApiPost()
    const handleUserDecative = () => {
        try{
            const response = postData("/user_edit_status",{to_user_id: UserID})
            toast.success("User Deactivated Successfully!")
            handleClose()
        } catch(error) {}
    }
    return (
        <Dialog open={open} onClose={handleClose}  fullWidth className="custom-dialog">
         
            <DialogContent className="flex flex-col items-center text-center">
                {/* Delete Icon */}
                <div className="flex justify-center p-2 rounded-full 2xl:p-4 bg-opacityGradient">
                    {/* <img src={Block} alt="delete" className="w-9 h-9" /> */}
                    <MdBlockFlipped className="w-7 h-7 text-sidebarText"/>
                </div>

                {/* Confirmation Text */}
                <h2 className="text-xl font-poppins text-[#000000] mt-4">Are you sure you want to Deactivate User?</h2>
            </DialogContent>
            
            <DialogContent className="flex justify-center gap-4 pb-4">
                <div className="flex justify-center gap-3">
                    <button className="px-20 py-2 rounded-lg border border-header text-[#3A3333] font-medium" onClick={handleClose}>
                        Cancel
                    </button>
                    <button onClick={handleUserDecative} className="px-20 py-2 font-medium text-white rounded-lg bg-button-gradient" >
                        Deactive
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default BlockUser;
