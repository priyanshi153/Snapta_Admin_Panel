import React,{useState,useEffect} from "react";
import { useGetAllMailSetupQuery } from "../../store/api/GetAllMailSetup";
import useApiPost from "../hooks/postData";
import Cookies from 'js-cookie'
import toast from "react-hot-toast";

function MailSetup() 
{
    const token = Cookies.get("token")
    const {data:MailSetupData,refetch} = useGetAllMailSetupQuery({token:token})
    const {data,error,postData} = useApiPost()
    const MailsSetupData = MailSetupData?.mail_setup_list
    console.log("Settings !!!",MailsSetupData)

    const [formData,setFormData] = useState({
        mail_mailer: "",
        mail_host:"",
        mail_port:"",
        mail_encryption:"",
        mail_username:"",
        mail_password:"",
        mail_from:""
    })


    const handleMailSetupUpdate = async () => {
        try {
          const response = await postData("/update_mailsetup", formData);
            toast.success(response.message || "Mail Setup updated!");
            refetch(); // Refetch new settings if needed
        } catch (err) {
          toast.error("Something went wrong");
          console.error(err);
        }
      };
    
    // Inside your component:
    useEffect(() => {
        if (MailsSetupData) {
            setFormData({
                 mail_mailer: MailsSetupData.mail_mailer || "",
                 mail_host: MailsSetupData.mail_host || "",
                 mail_port: MailsSetupData.mail_port || "",
                 mail_encryption: MailsSetupData.mail_encryption || "",
                 mail_username: MailsSetupData.mail_username || "",
                 mail_password: MailsSetupData.mail_password || "",
                 mail_from: MailsSetupData.mail_from || "",
            });
        }
}, [MailsSetupData]);

    return(
        <>
         <div className="border border-[#543691] border-opacity-15 rounded-lg px-6 pt-8">
            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-4">
                {/* Mail Mailer */}
                <div>
                    <label className="text-[#000000] font-poppins font-semibold text-sm">Mail Mailer</label>
                    <input type="text" placeholder="Enter Mail Mailer"
                    className="border border-opacity-gradient rounded-md w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                    value={formData.mail_mailer}
                    onChange={(e) => setFormData({...formData,mail_mailer:e.target.value})}/>
                </div>

                {/* Mail Host */}
                <div>
                    <label className="text-[#000000] font-poppins font-semibold text-sm">Mail Host</label>
                    <input type="text" placeholder="Enter Mail Host"
                    className="border border-opacity-gradient rounded-md w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                    value={formData.mail_host}
                    onChange={(e) => setFormData({...formData,mail_host:e.target.value})}/>
                </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-4 py-5">
                {/* Mail Port */}
                <div>
                    <label className="text-[#000000] font-poppins font-semibold text-sm">Mail Port</label>
                    <input type="text" placeholder="Enter Mail Mailer"
                    className="border border-opacity-gradient rounded-md w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                    value={formData.mail_port}
                    onChange={(e) => setFormData({...formData,mail_port:e.target.value})}/>
                </div>

                {/* Mail Encryption */}
                <div>
                    <label className="text-[#000000] font-poppins font-semibold text-sm">Mail Encryption</label>
                    <input type="text" placeholder="Enter Mail Host"
                    className="border border-opacity-gradient rounded-md w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                    value={formData.mail_encryption}
                    onChange={(e) => setFormData({...formData,mail_encryption:e.target.value})}/>
                </div>
            </div>

            {/* Row 3  */}
            <div className="grid grid-cols-2 gap-4">
                {/* Mail Username */}
                <div>
                    <label className="text-[#000000] font-poppins font-semibold text-sm">Mail Username</label>
                    <input type="text" placeholder="Enter Mail Mailer"
                    className="border border-opacity-gradient rounded-md w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                    value={formData.mail_username}
                    onChange={(e) => setFormData({...formData,mail_username:e.target.value})}/>
                </div>

                {/* Mail Password */}
                <div>
                    <label className="text-[#000000] font-poppins font-semibold text-sm">Mail Password</label>
                    <input type="text" placeholder="Enter Mail Host"
                    className="border border-opacity-gradient rounded-md w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                    value={formData.mail_password}
                    onChange={(e) => setFormData({...formData,mail_password:e.target.value})}/>
                </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-2 py-5">
                {/* Mail From Address */}
                <div>
                    <label className="text-[#000000] font-poppins font-semibold text-sm">Mail from Address</label>
                    <input type="text" placeholder="Enter Mail from Address"
                    className="border border-opacity-gradient rounded-md w-full py-3 my-1 px-4 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-header"
                    value={formData.mail_from}
                    onChange={(e) => setFormData({...formData,mail_from:e.target.value})}/>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center py-6 place-items-center">
                <button className="px-24 py-3 font-medium text-white rounded-xl bg-button-gradient" 
                onClick={handleMailSetupUpdate}>
                   Submit
                </button>
            </div>
         </div>
        </>
    )
}

export default MailSetup;