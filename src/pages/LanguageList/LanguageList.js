import React,{useState,useEffect,useRef} from 'react';
import Search from '../../assets/search.png';
import Filter from '../../assets/filters.png';
import Searchbar from '../../components/Search';
import Flag from '../../assets/Flag.png'
import { Link } from 'react-router-dom';
import Arrow from '../../assets/Showing_Arrow.png'
import useApiPost from '../hooks/postData';
import Edit from '../../assets/edit.png'
import AddLanguage from './AddLanguageDialog'
import Add from '../../assets/add.png'
import Translate from '../../assets/translate.png'
import {useGetAllLanguageQuery} from '../../store/api/GetAllLanguage'

function LanguageList() {
  // Sample data for posts
  const [activePage,setActivePage] = useState(1)
  const [selectedValue, setSelectedValue] = useState("10");
  
  const { data, error, isLoading, refetch,postData } = useApiPost()
  const {data:LanguageData} = useGetAllLanguageQuery()
  const LanguageList = LanguageData?.languages
  console.log("Language !!!",LanguageData?.languages)

// Toggle button for status
    const [toggleStates, setToggleStates] = useState(() => {
      return LanguageList.reduce((acc,language) => {
        acc[language.status_id] = language.status === 1 ;
        return acc
      }, {})
    });
  
    useEffect(() => {
      if (LanguageList.length > 0) {
        const initialStates = LanguageList.reduce((acc,language) => {
          acc[language.status_id] = language.status === 1;
          return acc;
        }, {})
        // setToggleStates(LanguageList.reduce((acc, language) => ({ ...acc, [language.status_id]: true }), {}));
      }
    }, [LanguageList]);
    
    const handleCheckboxChange = (postId) => {
      setToggleStates((prevStates) => {
        const newValue = !prevStates[postId];
        const newStatus = newValue ? 1 : 0
        return {
          ...prevStates,
          [postId]: newValue,
        };
      });
    };

// Toggle button for default language
const [toggleDefaultStates, settoggleDefaultStates] = useState(() => {
  return LanguageList.reduce((acc, language) => ({ ...acc, [language.status_id]: true }), {});
});

useEffect(() => {
  if (LanguageList.length > 0) {
    settoggleDefaultStates(LanguageList.reduce((acc, language) => ({ ...acc, [language.status_id]: true }), {}));
  }
}, [LanguageList]);

const handleDefaultCheckboxChange = (statusId) => {
  settoggleDefaultStates((prevStates) => ({
    ...prevStates,
    [statusId]: !prevStates[statusId], // Toggle only the clicked post
  }));
};

  // To open Dialog 
  const [open,setOpen] = useState(false)
  const handleOpen = () => {setOpen(true)}
  const handleClose = () => {setOpen(false)}

  return (
    <>
    {/* <div className="mb-10 pl-72"> */}
    <div className="light:mb-10 xl:pl-72 dark:bg-primary bg-secondary">
      <Searchbar />

      {/* Title */}
      <div className="flex justify-between border-t-[#F2F2F2]  py-3 px-6">
        <h2 className="text-[#000000] font-poppins text-xl font-semibold pt-3 dark:text-darkText">Language List</h2>
        {/* Add Language Button */}
        <button className='flex gap-1.5 place-items-center px-4 text-sm font-poppins font-medium text-[#FFFFFF] bg-button-gradient rounded-xl' onClick={handleOpen}>
          <img src={Add} className='w-4 h-4' />
          <p>Add Language</p>
        </button>
      </div>

      {/* Navigation Path */}
      <div className="flex items-center justify-between px-6 mb-3">
        <div className="flex items-center gap-2">
          <Link to="/dashboard"><h3 className="text-[#3A3A3A] font-poppins text-base font-semibold dark:text-darkText">Dashboard</h3></Link>
          <div className="rounded-full w-1 h-1 bg-[#E0E0E0]"></div>
          <h3 className="text-[#858585] font-poppins text-base">Language List</h3>
        </div>
        {/* Search by username */}
        <div className="relative">
          <div className="absolute flex items-center p-2 transform -translate-y-1/2 left-2 top-1/2">
            <img src={Search} alt="Search" className="w-5 h-5" />
          </div>
        </div>
      
      </div>

      {/* Header Bar */}
      <div className="border border-[#E3E3E3] dark:border-[#1F1F1F] rounded-lg overflow-hidden mt-8 mx-6">
  {/* Table Header */}
  <div className="flex px-4 py-4 pl-16 text-left border-b dark:border-b-[#1F1F1F] bg-header">
    <div className="w-[15%] text-[#FFFFFF] font-poppins text-sm">S.L </div>
    {/* Language */}
    <div className="w-[20%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">LANGUAGE </div>

    {/* Country */}
    <div className='w-[20%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2'> COUNTRY </div>
    
    {/* Status */}
    <div className="w-[20%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">STATUS</div>
    {/* Default */}
    <div className="w-[20%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">DEFAULT</div>
    {/* Actions */}
    <div className="w-[15%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">ACTIONS </div>
  </div>

  {/* Data Rows */}
  {LanguageList.map((language, index) => (
    <div key={language.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-primary' : 'bg-[#00162e0a] dark:bg-primary'} flex items-center px-4 py-3 dark:border-b-[#1f1f1f] pl-16 border-b last:border-0`}>

      {/* Serial Number */}
      <div className="w-[15%] text-[#000000] dark:text-darkText font-poppins text-sm">{index + 1}</div>

      {/* LANGUAGE */}
      <div className="w-[20%]">
        <p className='text-[#00162e] font-poppins dark:text-tableDarkLarge text-sm'>{language.language}</p>
      </div>

      {/* COUNTRY */}
      <div className='w-[20%]'>
        <div className='flex gap-2'>
            <img src={Flag} className="object-cover w-6 h-6" />
            <p className='text-sm dark:text-tableDarkLarge'>{language.country}</p>
        </div>
      </div>

      {/* STATUS */}
      <div key={language.status_id} className="w-[20%]">
  <label className="flex items-center cursor-pointer select-none">
    <div className="relative">
      <input
        type="checkbox"
        checked={toggleStates[language.status_id]}
        onChange={() => handleCheckboxChange(language.status_id)}
        className="sr-only"
      />
      {/* Toggle Background */}
      <div
        className={`block h-6 w-10 rounded-full border transition ${
          toggleStates[language.status] ? "bg-header border-header" : "border-header"
        }`}></div>

      {/* Toggle Dot */}
      <div
        className={`absolute h-4 w-4 rounded-full transition ${
          toggleStates[language.status]
            ? "right-1 top-1 bg-white"
            : "left-1 top-1 bg-header"
        }`}
      ></div>
    </div>
  </label>
</div>

      {/* DEFAULT */}
      <div key={language.status_id} className="w-[20%]">
  <label className="flex items-center cursor-pointer select-none">
    <div className="relative">
      <input
        type="checkbox"
        checked={toggleDefaultStates[language.status_id]}
        onChange={() => handleDefaultCheckboxChange(language.status_id)}
        className="sr-only"
      />
      {/* Toggle Background */}
      <div
        className={`block h-6 w-10 rounded-full border transition ${
          toggleDefaultStates[language.default_status] ? "bg-header border-header" : "border-header"
        }`}></div>

      {/* Toggle Dot */}
      <div
        className={`absolute h-4 w-4 rounded-full transition ${
          toggleDefaultStates[language.default_status]
            ? "right-1 top-1 bg-white"
            : "left-1 top-1 bg-header"
        }`}
      ></div>
    </div>
  </label>
</div>

      {/* ACTIONS */}
       <div className="w-[15%] flex gap-4">
          <button className="bg-[#D0CCE1] bg-opacity-[57%] rounded-full p-2">
              <img src={Edit} className="w-4 h-4" />
          </button>
          <button className="bg-[#F3E5E5] rounded-full p-2">
              <img src={Translate} className="w-4 h-4" />
          </button>
       </div>
    </div>
  ))}

  {/* Pagination and Results Count */}
  
      </div>


      
    </div>

    <AddLanguage open={open} handleClose={handleClose} />
    </>
  );
}

export default LanguageList;

