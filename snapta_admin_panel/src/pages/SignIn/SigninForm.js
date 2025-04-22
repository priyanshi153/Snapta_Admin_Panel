import React,{useState,useEffect} from 'react';
// import logo from '../../assets/logo.png'; //Ziogram Logo 
import Logo from '../../assets/SnaptaLogo.png'
import snapta from '../../assets/Snapta.png';
import sms from '../../assets/sms.png';
import lock from '../../assets/lock.png';
import Bottom from '../../assets/SignInBottom.png'
import useApiPost from '../hooks/postData';
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom';
import eye from '../../assets/password_eye.png'
import eye_off from '../../assets/eye-off.png'
import { useNavigate } from 'react-router-dom'
import Arrow from '../../assets/sign-arrow.png'
// import Line from '../../assets/sign-line.png'
import axios from 'axios';
import { LuLockKeyhole } from "react-icons/lu";
// import Line from '../../assets/ZioGramLine.png'
import Line from '../../assets/vector_bottom.png'
import { MdOutlineEmail } from "react-icons/md";

function SignIn() {
    const SigninForm = process.env.REACT_APP_API_URL
    console.log("Sign @@@@",SigninForm)

    const navigate = useNavigate()

    const {data,loading,error,postData} = useApiPost()
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })
    
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async (e) => {
      e.preventDefault();
      if (!formData.email || !formData.password) {
        toast.error("All fields are required!");
        return;
      }
  
      try {
        const response = await postData("/login", formData);
        toast.success(response?.message);
        Cookies.set("token", response?.data?.token);
        navigate("/post-list");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Sign-in failed");
      }
    };
    console.log("Form data @@@",formData)

    // Get Email and Password
    const [loginData,setLoginData] = useState()
    useEffect(() => {
      const fetchAdminDetails = async () => {
        try {
          const response = await axios.post('http://192.168.0.5:8002/api/admin_login_details');
          setLoginData(response.data)
        } catch (err) {
          console.error('Failed to fetch admin login details', err);
        }
      };
    
      fetchAdminDetails();
    }, []);
    const Datas=loginData?.admin_login_details
    console.log("Data !!!",Datas)

        
  return (
    <div className="flex flex-col items-center justify-center min-h-screen lg:py-20 place-items-center 2xl:px-0 ">
      {/* Form */}
      <form className="2xl:w-[630px] lg:w-[400px] w-[350px] sm:w-[400px] md:w-[520px] 2xl:p-6 bg-white rounded-lg ">
        {/* Logo Title */}
      <div className="flex gap-2 place-items-center">
        <img src={Logo}  alt="Logo" width={40} height={40} className='w-10 h-10 2xl:w-12 2xl:h-12' />
        {/* <img src={logo} className='w-[150px]'/>  Ziogram Logo*/}    
        <img src={snapta} alt="Snapta" className='w-24 pt-1' width={110} height={24} />
      </div>
      
      {/* Sign In Header */}
    
      {/* <h2 class=" font-bold text-[26px] leading-snug md:text-3xl w-[500px] md:!leading-normal mt-5 lg:pe-16 lg:text-[28px] xl:text-3xl 2xl:pe-8 2xl:text-4xl">Welcome back! Please 
      <span class="relative inline-block">Sign in to</span> continue.</h2>
      <img src={Line} className='mb-5' /> */}

      <h2 className="font-bold xl:text-[26px] text-[22px] leading-snug md:text-3xl 2xl:w-[500px] w-[300px] md:w-[420px] md:!leading-normal my-5 lg:pe-16 lg:text-[28px] xl:text-3xl 2xl:pe-8 2xl:text-4xl">
  Welcome back! Please
  <span className="relative inline-block">
    Sign in to 
    <img src={Line} className="absolute left-0 top-full mt-[-5px]" />
  </span> {""}
  continue.
</h2>

      <p className="text-[#7B7B7B] text-base font-poppins text-left pb-6">Enter your email and password to login</p>
      
        <div className="rounded-lg ">
          {/* Email Field */}
          <div className="flex flex-col mb-4">
            <label className="text-[#000000] font-poppins text-sm font-semibold">Email<span className="text-red-600">*</span></label>
            <div className="relative">
              <div 
                className="absolute flex items-center justify-center p-2.5 transform bg-opacityGradient -translate-y-1/2 rounded-lg left-2 top-1/2">
                {/* style={{ background: 'linear-gradient(213deg, rgba(108, 71, 183, 0.1) -27.59%, rgba(52, 31, 96, 0.1) 105.15%)' }}> */}
                {/* <img src={sms} alt="User" className="w-5 h-5" /> */}
                <MdOutlineEmail className='w-5 h-5 text-sidebarText'/>
              </div>
              <input 
                type="email" 
                className="border border-[#452B7A] border-opacity-10 rounded-lg w-full py-3 my-1 pl-16 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-[#452B7A]"
                placeholder="Enter Email"
                value={formData.email} 
                autoComplete="new-email"
                onChange = {(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      email:e.target.value
                    }))
                  }}
              />
            </div>
          </div>
          
          {/* Password Field */}
          <div className="flex flex-col mb-4">
            <label className="text-[#000000] font-poppins text-sm font-semibold">
              Password<span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <div
                className="absolute flex items-center bg-opacityGradient justify-center p-2.5 transform -translate-y-1/2 rounded-lg left-2 top-1/2"
                // style={{
                //   background:
                //     "linear-gradient(213deg, rgba(108, 71, 183, 0.1) -27.59%, rgba(52, 31, 96, 0.1) 105.15%)",
                // }}
              >
                {/* <img src={lock} alt="lock" className="w-5 h-5" /> */}
                <LuLockKeyhole className='w-5 h-5 text-sidebarText' />
              </div>

              {/* Show/Hide Password Button */}
              <button
                type="button"
                className="absolute py-4 right-2"
                onClick={() => setShowPassword(!showPassword)}>
                <img
                  src={showPassword ? eye_off : eye}
                  className="w-5 h-5"
                  alt="Toggle Password Visibility"
                />
              </button>

              <span className='h-12 py-4'>
              <input
                type={showPassword ? "text" : "password"}
                className="border border-[#452B7A] border-opacity-10 rounded-lg w-full py-3 my-1 pl-16 placeholder:font-gilroy_regular placeholder:text-sm placeholder:text-[#000000] placeholder:opacity-50 bg-white focus:outline-none focus:ring-1 focus:ring-[#452B7A]"
                placeholder="Enter Password"
                value={formData.password}
                autoComplete="new-password"
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    password: e.target.value,
                  }))}/>
              </span>
            </div>
          </div>
        </div>
        
        {/* Sign In Button */}
        <div className='flex justify-center pt-4 place-items-center'>
        <button className="text-base flex gap-2 justify-center place-items-center bg-button-gradient text-center font-poppins text-[#FFFFFF] rounded-lg w-full py-3" 
        // style={{ background: "linear-gradient(213deg, #6C47B7 -27.59%, #341F60 105.15%)" }}
        onClick={handleSignIn}>
          Sign In  <img src={Arrow} className='w-6 h-6'/>
        </button>
       </div>
     
        
        {/* Email and Password Details */}
        <div className="py-8 text-center ">
   <table className="w-full border border-collapse border-[#452B7A] border-opacity-10">
    <tbody>
      {/* Email Row */}
      <tr className="border border-[#452B7A] border-opacity-10">
        <td className="px-4 py-2 text-left font-poppins text-[#000000] border border-[#452B7A] border-opacity-10">Email:</td>
        <td className="px-4 py-2 text-[#000000] font-poppins text-left border border-[#452B7A] border-opacity-10">{Datas?.email}</td>
      </tr>

      {/* Password Row */}
      <tr className="border border-[#452B7A] border-opacity-10">
        <td className="px-4 py-2 text-left font-poppins text-[#000000] border border-[#452B7A] border-opacity-10">Password:</td>
        <td className="px-4 py-2 text-[#000000] font-poppins text-left border border-[#452B7A] border-opacity-10">{Datas?.main_password}</td>
      </tr>

      
      {/* Copy Button Row */}
      <tr className="border border-[#452B7A] border-opacity-10">
        <td colSpan={2} className="px-4 py-2 text-center border border-[#452B7A] border-opacity-10">
          <button className='text-[#FFFFFF] text-base font-poppins rounded-lg px-6 py-1 mt-2 bg-button-gradient'
          //  style={{ background: "linear-gradient(213deg, #6C47B7 -27.59%, #341F60 105.15%)"}}
          onClick={(e) => {
            e.preventDefault();  //button inside form always refresh page so add this to prevent refresh
            setFormData({
              email: (Datas?.email),
              password: (Datas?.main_password)
            })
          }}>
            Copy
          </button>
       </td>
      </tr>
    </tbody>
  </table>
</div>

      </form>
      <div className='absolute bottom-0 right-[700px] 2xl:right-[550px]'>
        <img src={Bottom} className='h-36'/>
      </div>

    </div>
  );
}

export default SignIn;

