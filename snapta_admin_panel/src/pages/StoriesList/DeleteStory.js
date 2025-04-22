import React, { useState } from "react";
import Delete from '../../assets/delete.png';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import './style.css' 
import useApiPost from "../hooks/postData";
import toast from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi2";

function DeleteStory({ open, handleClose, handleDelete, storyId }) {

    const {data,error,postData} = useApiPost()
    const handleDeleteStory = () => {
        try{
            const response = postData("/delete_story",{story_id:storyId})
            toast.success("Story Deleted Successfully!")
            handleClose()
        } catch(error) {
            
        }
    }
    
    return (
        <Dialog open={open} onClose={handleClose}  fullWidth className="custom-dialog">
            <DialogContent className="flex flex-col items-center text-center">
                {/* Delete Icon */}
                <div className="flex justify-center p-2 rounded-full 2xl:p-4 bg-opacityGradient">
                    {/* <img src={Delete} alt="delete" className="w-9 h-9" /> */}
                    <HiOutlineTrash  className="text-header" style={{ fontSize: "35px"}}/>
                </div>

                {/* Confirmation Text */}
                <h2 className="text-xl font-poppins text-[#000000] mt-4">Are you sure you want to delete?</h2>
            </DialogContent>
            
            <DialogContent className="flex justify-center gap-4 pb-4">
                <div className="flex justify-center gap-3">
                    <button className="px-20 py-2 rounded-lg border border-header text-[#3A3333] font-medium" onClick={handleClose}>
                        Cancel
                    </button>
                    <button onClick={handleDeleteStory} className="px-20 py-2 font-medium text-white rounded-lg bg-button-gradient">
                        Delete
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteStory;
