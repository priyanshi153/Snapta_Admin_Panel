import React, { useState } from "react";
import Delete from '../../assets/delete.png';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Cross from '../../assets/cross.png'
import '../../components/DialogBoxCustom.css'
import useApiPost from "../hooks/postData";
import toast from "react-hot-toast";

function AddHashtag({ open, handleClose, handleDelete }) {
    const {data,error,postData} = useApiPost();
    const [text,setText] = useState("")
    const handleAddHashtag = () => {
        try{
            const response = postData("/add_hashtag",{text:text})
            toast.success("Hashtag Added successfully!")
            handleClose()
        }catch(error){

        }
    }

    console.log("Text !!!",text)
    return (
        <Dialog open={open} onClose={handleClose} fullWidth className="hashtag-dialog" >
            <DialogTitle className="flex justify-center text-base font-bold text-[#000000] font-poppins bg-[#FFFFFF] shadow-lg rounded-lg">Add Hashtag</DialogTitle>
            <img src={Cross} className="absolute w-8 h-8 cursor-pointer top-4 right-2" onClick={handleClose} />
            <DialogContent className="flex flex-col mx-5">
                {/* Delete Icon */}
                <h2 className="text-base font-poppins text-[#000000] pt-4 font-semibold">Hashtag Name</h2>
                <input type="text" placeholder="Enter Hashtag Name"
                className="border border-opacity-gradient rounded-lg w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                onChange={(e) => setText(e.target.value)}/>
                <div className="flex justify-center py-6">
                    <button className="px-20 py-3 font-medium text-white rounded-xl bg-button-gradient" onClick={handleAddHashtag}>
                        Submit
                    </button>
                </div>
            </DialogContent>
         
        </Dialog>
    );
}

export default AddHashtag;
