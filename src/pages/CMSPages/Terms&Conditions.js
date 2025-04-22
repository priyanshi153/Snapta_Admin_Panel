import React,{useState} from 'react'
import ReactQuill from 'react-quill'
import useApiPost from '../hooks/postData'
import toast from 'react-hot-toast'
// import 'react-quill/dist/quill.snow.css'

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'link',
]

const modules = {
    toolbar: [
        [{ header: [false, 1, 2, 3, 4] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
      
      ],
}

function TermsConditions() 
{
      const [privacyPolicy, setPrivacyPolicy] = useState('')
      const [terms, setTerms] = useState('')
      const {data,error,postData} = useApiPost();

      const handleAddPolicy = () => {
        try{
          const response = postData("/update_policy",{terms:terms})
          toast.success("Done !!")
        } catch(error) {

        }
      }
        
    return(
        <>
        <div className="">
            <form className="space-y-6 ">
            <div>
          <label className="block mb-2 text-2xl font-semibold">Terms & Conditions</label>
          <div className="p-4 bg-white border rounded shadow h-[280px]">
            <ReactQuill
              value={terms}
              onChange={setTerms}
              modules={modules}
              formats={formats}
              placeholder="Enter the Terms and Conditions"
              className="h-[200px]"/>
          </div>
        </div>
            </form>
             {/* Submit Button */}
        <button className='flex gap-1.5 mt-5 place-items-center px-6 py-2 rounded-lg font-poppins font-medium text-[#FFFFFF] bg-button-gradient'
        onClick={handleAddPolicy}>
          Submit
        </button>
        </div>
        </>
    )
}

export default TermsConditions;