import React, { useState,useEffect } from "react";
import { useGetAllKeyQuery } from "../../store/api/GetAllTwilioKey";
import useApiPost from "../hooks/postData";
import toast from "react-hot-toast";
import Cookies from 'js-cookie'

function SMSConfiguration() 
{
  const [option,setOption] = useState("Twilio")
  const token = Cookies.get("token")
  const {data:KeyData,refetch} = useGetAllKeyQuery({token:token})
  const {data,error,postData} = useApiPost()
  console.log("Settings !!!",KeyData)

  const [formData,setFormData] = useState({
      twilio_sid: "",
      twilio_auth_token:"",
      twilio_phone_number:"",
      msg91_auth_key:"",
      msg91_private_key:"",
  })


  const handleKeyUpdate = async () => {
      try {
        const response = await postData("/update_all_key", formData);

          toast.success(response.message || "Keys updated!");
          refetch(); // Refetch new settings if needed
 
      } catch (err) {
        toast.error("Something went wrong");
        console.error(err);
      }
    };
    
  
  // Inside your component:
  useEffect(() => {
      if (KeyData) {
          setFormData({
               twilio_sid: KeyData.twilio_sid || "",
               twilio_auth_token: KeyData.twilio_auth_token || "",
               twilio_phone_number: KeyData.twilio_phone_number || "",
               msg91_auth_key: KeyData.msg91_auth_key || "",
               msg91_private_key: KeyData.msg91_private_key || "",
              });
            }
          }, [KeyData]);

    
    return(
        <>
       

         <div className="border rounded-lg border-opacity-gradient">
         <div className="grid grid-cols-2">
  {/* Twilio */}
  <button
    className={`font-poppins font-semibold w-full py-3 border-b rounded-tl-lg text-sm ${
      option === "Twilio" ? "text-[#FFFFFF] bg-button-gradient": " text-[#5B5B5B]"
    }`}
    
    onClick={() => setOption("Twilio")}
  >
    Twilio
  </button>

  {/* MSG 91 */}
  <button
    className={`font-poppins font-semibold border-b w-full py-3 rounded-tl-lg text-sm ${
      option === "MSG" ? "text-[#FFFFFF] bg-button-gradient": " text-[#5B5B5B]"
    }`}
   
    onClick={() => setOption("MSG")}
  >
    MSG 91
  </button>
</div>

            {/* Twilio */}
            {option === "Twilio" && 
              <div className="p-4">
              <div className="grid grid-cols-2 gap-4 py-4">
                    {/* Twilio Account SID */}
                    <div>
                        <label className="text-[#000000] font-poppins font-semibold text-sm">Twilio Account SID</label>
                        <input type="text" placeholder="Enter Twilio Account SID"
                        className="border border-opacity-gradient rounded-lg w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                        value={formData.twilio_sid}
                        onChange={(e) => setFormData({...formData,twilio_sid:e.target.value})}/>
                    </div>
              
                    {/* Twilio Auth Token */}
                    <div>
                        <label className="text-[#000000] font-poppins font-semibold text-sm">Twilio Auth Token</label>
                        <input type="text" placeholder="Enter Twilio Auth Token"
                        className="border border-opacity-gradient rounded-lg w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                        value={formData.twilio_auth_token}
                        onChange={(e) => setFormData({...formData,twilio_auth_token:e.target.value})}/>
                    </div>
               </div>

               <div className="grid grid-cols-2">
                {/* Twilio Phone Number */}
               <div>
                    <label className="text-[#000000] font-poppins font-semibold text-sm">Twilio Phone Number</label>
                    <input type="text" placeholder="Enter Twilio Phone Number"
                    className="border border-opacity-gradient rounded-lg w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                    value={formData.twilio_phone_number}
                    onChange={(e) => setFormData({...formData,twilio_phone_number:e.target.value})}/>
                    </div>
               </div>

               {/* Submit Button */}
               <div className="flex justify-center pt-20 pb-4 place-items-center">
                <button className="px-24 py-3 text-lg font-medium text-white rounded-xl bg-button-gradient" 
                onClick={handleKeyUpdate}>
                Submit
                </button>
               </div>
               </div>
            }


            {option === "MSG" && 
               <div className="p-4">
               <div className="grid grid-cols-2 gap-4 py-4">
                     {/* MSG91 Auth Key */}
                     <div>
                         <label className="text-[#000000] font-poppins font-semibold text-sm">MSG91 Auth Key</label>
                         <input type="text" placeholder="Enter MSG91 Auth Key"
                         className="border border-opacity-gradient rounded-lg w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                         value={formData.msg91_auth_key}
                        onChange={(e) => setFormData({...formData,twilio_sid:e.target.value})}/>
                     </div>
               
                     {/* MSG91 Private Key */}
                     <div>
                         <label className="text-[#000000] font-poppins font-semibold text-sm">MSG91 Private Key</label>
                         <input type="text" placeholder="Enter MSG91 Private Key"
                         className="border border-opacity-gradient rounded-lg w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                         value={formData.msg91_private_key}
                        onChange={(e) => setFormData({...formData,msg91_private_key:e.target.value})}/>
                     </div>
                </div>
 
                {/* Submit Button */}
                <div className="flex justify-center pt-16 pb-4 place-items-center">
                 <button className="px-24 py-3 text-lg font-medium text-white rounded-xl bg-button-gradient" 
                 onClick={handleKeyUpdate}>
                 Submit
                 </button>
                </div>
                </div>
            }
         </div>
        </>
    )
}

export default SMSConfiguration;