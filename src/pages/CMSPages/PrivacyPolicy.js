





import React,{useState,useEffect,useRef} from 'react';
import Search from '../../assets/search.png';
import Filter from '../../assets/filters.png';
import Searchbar from '../../components/Search';
import Dropdown from '../../assets/dropdown.png';
import DeactiveArrow from '../../assets/deactive_Arrow.png'
import Flag from '../../assets/Flag.png'
import UserProfile from '../../assets/user_profile.png'
import Eye from '../../assets/eye.png'
import Edit from '../../assets/edit.png'
import Delete from '../../assets/trash.png'
import Post1 from '../../assets/Post1.png'
import Post2 from '../../assets/Post1.png'
import Report from '../../assets/report_action.png'
import { Link } from 'react-router-dom';
import Arrow from '../../assets/Showing_Arrow.png'
import useApiPost from '../hooks/postData';
import formatDate from '../../components/formatDate';
import formatTime from '../../components/formatTime';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import TermsConditions from './Terms&Conditions';
import toast from 'react-hot-toast';

const modules = {
    toolbar: [
      [{ header: [false, 1, 2, 3, 4] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  }
  
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'link',
  ]

function PostReportList() {

    const [privacyPolicy, setPrivacyPolicy] = useState('')
    const {data,error,postData} = useApiPost()
    const handleAddPolicy = () => {
      try{
        const response = postData("/update_policy",{privacy_policy:privacyPolicy})
        toast.success("Policy Updated Successfully!")
      } catch(error) {
    
      }
    }
    
  return (
    <div className="mb-10 pl-72">
      <Searchbar />

      {/* Navigation Path */}
      <div className="flex items-center justify-between px-6 my-3">
          <div className="flex items-center gap-2">
            <Link to="/dashboard"><h3 className="text-[#3A3A3A] font-poppins text-base font-semibold">Dashboard</h3></Link>
            <div className="rounded-full w-1 h-1 bg-[#E0E0E0]"></div>
              <h3 className="text-[#858585] font-poppins text-base">CMS Pages</h3>
          </div>
      </div>

      {/* Privacy Policy T&C */}
      <div className="p-6 space-y-10 bg-opacityGradient">
      <form className="space-y-6">
        {/* Privacy Policy */}
        <div>
          <label className="block mb-2 text-2xl font-semibold">Privacy Policy</label>
          <div className="p-4 bg-white border rounded shadow h-[280px]">
            <ReactQuill
              value={privacyPolicy}
              onChange={setPrivacyPolicy}
              modules={modules}
              formats={formats}
              placeholder="Enter the Privacy Policy"
              className="h-[200px]"
            />
          </div>
        </div>
      </form>
       
        <button className='flex gap-1.5 place-items-center px-6 py-2 bg-button-gradient rounded-lg font-poppins font-medium text-[#FFFFFF]'
        onClick={handleAddPolicy}>
          Submit
        </button>

        {/* Terms and Conditions */}
        <TermsConditions />
    </div>

      
    </div>
  );
}

export default PostReportList;

