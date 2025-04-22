import React, { useState } from "react";
import Delete from '../../assets/delete.png';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Cross from '../../assets/cross.png'
import '../../components/DialogBoxCustom.css'
import Arrow from '../../assets/languageArrow.png'

function AddLanguage({ open, handleClose, handleDelete }) {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth className="hashtag-dialog" >
            <DialogTitle className="flex justify-center text-base font-bold text-[#000000] font-poppins bg-[#FFFFFF] shadow-lg rounded-lg">Add Language</DialogTitle>
            <img src={Cross} className="absolute w-8 h-8 cursor-pointer top-4 right-2" onClick={handleClose} />
            <DialogContent className="flex flex-col mx-5">
                {/* Language Name Input*/}
                <h2 className="text-base font-poppins text-[#000000] pt-4  font-semibold">Language Name</h2>
                <input type="text" placeholder="Enter Language Name"
                className="border border-opacity-gradient rounded-lg w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"/>

                {/* Text Direction Input */}
                <h2 className="text-base font-poppins text-[#000000] pt-4 font-semibold">Text Direction</h2>
                <div className="relative">
                    <input type="text" placeholder="Text Direction" className="border border-opacity-gradient rounded-lg w-full py-3 my-1 px-4 pr-10 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header" />
                    <img src={Arrow} alt="arrow" className="absolute w-3 h-3 transform -translate-y-1/2 cursor-pointer pointer-events-none right-4 top-1/2" />
                </div>

                {/* Submit button */}
                <div className="flex justify-center py-6">
                    <button className="px-20 py-3 font-medium text-white rounded-xl bg-button-gradient" >
                        Submit
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AddLanguage;
