import React, { useState } from "react";
import Delete from '../../assets/delete.png';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Logout from '../../assets/logout.png'
import '../PostList/style.css'
import { useTheme } from "../../context/ThemeProvider";
import { TbLogout2 } from "react-icons/tb";
// import {TbDele}


function DialogBox({ open, handleClose, handleDelete }) {

    const navigate = useNavigate()
    const handleLogout = () => {
        Cookies.remove("token")
        toast.success("Logged out Successfully!")
        navigate("/signin")

    }
    return (
        <Dialog open={open} onClose={handleClose} fullWidth className="custom-dialog" >
            <DialogContent className="flex flex-col items-center text-center">
                {/* Delete Icon */}
                <div className="flex justify-center p-2 rounded-full 2xl:p-4 bg-opacity-gradient">
                    {/* <img src={Logout} alt="delete" className="w-11 h-11" /> */}
                    <TbLogout2 className="text-header" style={{ fontSize: "44px" }}/>
                </div>

                {/* Confirmation Text */}
           <h2 className="text-xl font-poppins text-[#000000] mt-4">Are you sure you want to logout?</h2>
            </DialogContent>
            
            <DialogContent className="flex justify-center gap-4 pb-4">
                <div className="flex justify-center gap-3">
                    <button className="px-20 py-2 rounded-lg border border-header text-[#3A3333] font-medium" onClick={handleClose}>
                        Cancel
                    </button>
                    <button onClick={handleLogout} className="px-20 py-2 font-medium text-white rounded-lg bg-button-gradient">
                        Logout
                    </button>
                </div> 
            </DialogContent>
        </Dialog>
    );
}

export default DialogBox;
