import React, { useState,useRef } from "react";
import Delete from '../../assets/delete.png';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Cross from '../../assets/cross.png'
import '../../components/DialogBoxCustom.css'
import Profile from '../../assets/user_profile.png'
import Plus from '../../assets/Plus.png'
import useApiPost from "../hooks/postData";
import Cookies from 'js-cookie'
import axios from "axios";
import toast from "react-hot-toast";

function AddAvatar({ open, handleClose, handleDelete }) {

    const {data,error,postData} = useApiPost()
    const token = Cookies.get("token")
    const [formData,setFormData] = useState({
        name:"",
        gender:"",
        image:""
    })

    // To add picture from system 
    const fileInputRef = useRef();

const handleAddAvtarImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataToUpload = new FormData();
    formDataToUpload.append("image", file);

    const token = Cookies.get("token");

    try {

        setFormData((prev) => ({
            ...prev,
            image: file
        }));
    } catch (error) {
        console.error("Upload failed:", error);
    }
};



    const handleAddAvtar = async () => {
        try {
          const formDataToUpload = new FormData();
          formDataToUpload.append("name", formData.name);
          formDataToUpload.append("gender",formData.gender)
      
          // Only append a new profile pic if it's a File object
          if (formData.image instanceof File) {
            formDataToUpload.append("image", formData.image);
          }
      
          const response = await axios.post("http://192.168.0.5:8002/api/add_avtar",formDataToUpload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
          toast.success("Avtar Added Successfully!");
          handleClose()
        } catch (error) {
            
        }
      };


    console.log("Form Data !!!",formData)
    
    return (
        <Dialog open={open} onClose={handleClose} fullWidth className="dialog" >
            <DialogTitle className="flex justify-center text-base font-bold text-[#000000] font-poppins bg-[#FFFFFF] shadow-lg rounded-lg">Add Avatar</DialogTitle>
            <img src={Cross} className="absolute w-8 h-8 cursor-pointer top-4 right-2" onClick={handleClose} />
            <DialogContent className="flex flex-col mx-5">
                {/* Select Image */}
                <div className="flex items-center justify-center w-full py-4">
                    <div className="px-1 py-1 rounded-full shadow-([327.99deg, #50338C 17.81%, #FFFFFF 64.02%])">
                        <div className="relative flex items-center justify-center w-24 h-24">
    {/* User Image */}
    <img src={formData.image instanceof File
      ? URL.createObjectURL(formData.image)
      : Profile} alt="User" className="absolute inset-0 w-24 h-24 m-auto rounded-full" />
      

    {/* Plus icon triggers hidden file input */}
    <img
        src={Plus}
        alt="plus"
        className='absolute bottom-0 w-6 h-6 cursor-pointer right-2'
        onClick={() => fileInputRef.current.click()}
    />

    {/* Hidden file input */}
    <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleAddAvtarImage}
        style={{ display: "none" }}
    />
</div>

                    </div>
                </div>

                {/* Avatar Fields */}
                <h2 className="text-base font-semibold font-poppins text-[#000000] pt-5">Avatar Name</h2>
                <input type="text" placeholder="Enter Avatar Name" className="border border-opacity-gradient rounded-lg w-full py-2.5 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <h2 className="text-base font-semibold font-poppins text-[#000000] pt-6">Gender</h2>
                    <div className="flex space-x-6">
                        {["male", "female"].map((option) => (
                              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                <input type="radio" name="gender" className="custom-radio" value={option} checked={formData.gender === option}
                                 onChange={(e) => setFormData({ ...formData, gender: e.target.value })}/>
                                 <span className="text-gray-700">{option}</span>
                              </label>
                            ))}
                    </div>

                {/* Submit Button */}
                <div className="flex justify-center py-6 place-items-center">
                    <button className="px-20 py-3 font-medium text-white rounded-xl bg-button-gradient" 
                    onClick={handleAddAvtar}>
                        Submit
                    </button>
                </div>
   
            </DialogContent>
        </Dialog>
    );
}

export default AddAvatar;
