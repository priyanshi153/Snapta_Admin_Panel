import React,{useState,useEffect,useRef} from 'react';
import Search from '../../assets/search.png';
import Filter from '../../assets/filters.png';
import Searchbar from '../../components/Search';
import Edit from '../../assets/edit.png'
import Delete from '../../assets/trash.png'
import { Link } from 'react-router-dom';
import Arrow from '../../assets/Showing_Arrow.png'
import useApiPost from '../hooks/postData';
import Play from '../../assets/play.png'
import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';
import './MusicStyle.css'
import Loader from '../../assets/Loader.gif'
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

function MusicList() {
  // Sample data for posts
  const [activePage,setActivePage] = useState(1)
  const [selectedValue, setSelectedValue] = useState("10");
  const [order,setOrder] = useState("");
  const [category,setCategory] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const [isPlaying,setIsPlaying] = useState(false)
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);
  
  const { data, error, refetch,postData } = useApiPost()
const handleGetMusicList = async() => {
  setIsLoading(true)
  try{
    const response = await postData("/get_all_music_pagination",{page_no:activePage,per_page:selectedValue})
  } catch(error){}
  finally{
    setIsLoading(false)
  }
}

// Refetch data when page number changes
useEffect(() => {
  handleGetMusicList()
}, [activePage,selectedValue,order,category,refetch]);

const ActivePage = data?.music_list
console.log("Post @@@ !!!",ActivePage)

const pagination = data?.pagination;
const lastPage = pagination?.last_page || 1;
const currentPage = pagination?.current_page
const AllMusicList = data?.music_list || [];
  
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const dropdownRef = useRef(null);

console.log("Music @@@",AllMusicList)

// Options for dropdown
const options = ["10","25","50","100"];

// Function to handle option selection
const handleSelect = (value) => {
  setSelectedValue(value);
  setIsDropdownOpen(false);
};

// Close dropdown if clicked outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

const [toggleStates, setToggleStates] = useState(() => {
      return AllMusicList.reduce((acc, post) => ({ ...acc, [post.post_id]: true }), {});
    });
  
    useEffect(() => {
      if (AllMusicList.length > 0) {
        setToggleStates(AllMusicList.reduce((acc, post) => ({ ...acc, [post.post_id]: true }), {}));
      }
    }, [AllMusicList]);
    
    const handleCheckboxChange = (postId) => {
      setToggleStates((prevStates) => ({
        ...prevStates,
        [postId]: !prevStates[postId], // Toggle only the clicked post
      }));
    };

    const BeatVisualizer = ({ isPlaying }: { isPlaying:boolean }) => {
      return (
        <div className="beat-visualizer">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`bar ${isPlaying ? 'playing' : ''}`} />
          ))}
        </div>
      );
    };
    

  return (
    <div className="mb-10 pl-72">
      <Searchbar />

      {/* Title */}
      <div className="flex justify-between border-t-[#F2F2F2] py-3 px-6">
        <h2 className="text-[#000000] font-poppins text-xl font-semibold pt-3">Music List</h2>
        <div className="relative">
          <div className="absolute flex items-center p-2 transform -translate-y-1/2 left-2 top-1/2">
            <img src={Search} alt="Search" className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="border border-gray-500 bg-[#00000005] placeholder:dark:text-tableDarkLarge w-[250px] border-opacity-10 rounded-lg py-2 pl-12 placeholder:text-sm placeholder:text-[#0000004F] focus:outline-none focus:ring-1 focus:ring-gray-600"
            placeholder="Search by user name..."
          />
        </div>
      </div>

      {/* Navigation Path */}
      <div className="flex items-center justify-between px-6 mb-3">
        <div className="flex items-center gap-2">
          <Link to="/dashboard"><h3 className="text-[#3A3A3A] font-poppins text-base font-semibold">Dashboard</h3></Link>
          <div className="rounded-full w-1 h-1 bg-[#E0E0E0]"></div>
          <h3 className="text-[#858585] font-poppins text-base">Music List</h3>
        </div>
      </div>

      {/* Header Bar */}
      <div className="border border-[#E3E3E3] rounded-lg overflow-hidden mt-8 mx-6">
  {/* Table Header */}
  <div className="flex px-4 py-4 pl-16 text-left border-b bg-header">
    <div className="w-[15%] text-[#FFFFFF] font-poppins text-sm">S.L </div>
    {/* Music Name */}
    <div className="w-[45%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">MUSIC NAME </div>
    {/* Music Upload */}
    <div className='w-[50%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2'> MUSIC UPLOAD </div>
    {/* Status */}
    <div className="w-[25%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">STATUS</div>
    {/* Actions */}
    <div className="w-[20%] text-[#FFFFFF] font-poppins text-sm flex place-items-center gap-2">ACTIONS</div>
  </div>

  {/* Data Rows */}
  {AllMusicList.map((music, index) => (
    <div key={music.id} className={`${index % 2 === 0 ? 'bg-white dark:bg-primary' : 'bg-[#00162e0a] dark:bg-primary'} flex items-center px-4 py-3 pl-16 border-b last:border-0`}>

      {/* Serial Number */}
      <div className="w-[15%] dark:text-darkText text-[#000000] font-poppins text-sm">{index + 1}</div>

      {/* MUSIC NAME */}
      <div className="w-[45%]">
        <p className='text-[#00162e] font-poppins text-sm dark:text-darkText'>{music.title}</p>
      </div>

      {/* MUSIC UPLOAD */}
      <div className='w-[50%]'>
    
<div className="flex items-center gap-3">
  <AudioPlayer
    src={music.src}
    onPlay={() => setCurrentlyPlayingId(music.id)}
    onPause={() => setCurrentlyPlayingId(null)}
    showJumpControls={false}
    showDownloadProgress={false}
    showFilledVolume={false}
    showFilledProgress={false}
    customAdditionalControls={[]}
    customVolumeControls={[]}
    autoPlayAfterSrcChange={false}
    className="custom-player"
  />
  <BeatVisualizer isPlaying={currentlyPlayingId === music.id}  />
</div>
      </div>
     

      {/* STATUS */}
      <div key={music.id} className="w-[25%]">
  <label className="flex items-center cursor-pointer select-none">
    <div className="relative">
      <input
        type="checkbox"
        checked={toggleStates[music.id]}
        onChange={() => handleCheckboxChange(music.id)}
        className="sr-only"
      />
      {/* Toggle Background */}
      <div
        className={`block h-6 w-10 rounded-full border transition ${
          toggleStates[music.id] ? "bg-header border-header" : "border-header"
        }`}></div>

      {/* Toggle Dot */}
      <div
        className={`absolute h-4 w-4 rounded-full transition ${
          toggleStates[music.id]
            ? "right-1 top-1 bg-white"
            : "left-1 top-1 bg-header"
        }`}
      ></div>
    </div>
  </label>
      </div>

      {/* ACTIONS */}
       <div className="w-[20%] flex gap-4">
        <button className="bg-[#D0CCE1] bg-opacity-[57%] rounded-full p-2">
            <img src={Edit} className="w-4 h-4" />
        </button>
        <button className="bg-[#FDE4EA] rounded-full p-2">
            <img src={Delete} className="w-4 h-4" />
        </button>
       </div>
    </div>
  ))}

  {isLoading && (
      <div className='flex justify-center py-60'><img src={Loader} alt="loader" height={50} width={50}/></div>
    )}

  {/* Pagination and Results Count */}
  <div className="flex justify-between px-10 py-6 bg-white dark:bg-primary">
  {/* Results Count */}
  <div className="relative flex gap-2 place-items-center" ref={dropdownRef}>
    {/* Dropdown Button */}
    <div
      className="border border-[#9C9C9C] bg-[#edeff166] dark:bg-primary rounded-xl flex gap-2 items-center px-3 py-1 cursor-pointer relative"
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
      <p className="text-[#00162e] font-poppins dark:text-darkText">{selectedValue}</p>
      <button>
        <img src={Arrow} className="w-4 h-4" />
      </button>
    </div>
  
    {/* Dropdown Menu - Positioned Above */}
    {isDropdownOpen && (
      <div className="absolute left-0 z-50 mb-2 bg-white border border-gray-300 rounded-lg shadow-lg bottom-full w-max">
        {options.map((option) => (
          <p
            key={option}
            className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
            onClick={() => handleSelect(option)}>
            {option}
          </p>
        ))}
      </div>
    )}
  
    {/* Results Text */}
    <p className="text-[#333333] font-poppins text-sm dark:text-gray-500">
      Showing <span className="font-semibold text-[#000000] text-sm dark:text-darkText">{pagination?.total}</span> results
    </p>
  </div>
  
      {/* Pagination Buttons */}
  
    <div className="flex items-center">
    {/* Previous Button */}
    <button 
      className={`text-[#000000] dark:text-darkText text-sm font-poppins px-3 py-1 rounded-full transition-all duration-200 
        ${pagination?.prev_page === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
      onClick={() => setActivePage(prev => (prev > 1 ? prev - 1 : prev))}
      disabled={pagination?.prev_page === 0}>
      Previous
    </button>
  
    {/* Page Numbers */}
    {[...Array(lastPage)].map((_, index) => {
      const page = index + 1;
      return (
        <button 
          key={page} 
          className={`text-sm font-poppins px-3 py-1 rounded-full transition-all duration-200 
            ${activePage === page ? "text-white bg-button-gradient" : "text-black dark:text-darkText hover:bg-gray-200"}`}
          onClick={() => setActivePage(page)}
        >
          {page}
        </button>
      );
    })}
  
    {/* Next Button */}
    <button 
      className={`text-[#000000] dark:text-darkText text-sm font-poppins px-3 py-1 rounded-full transition-all duration-200 
        ${pagination?.next_page > lastPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
      onClick={() => setActivePage(prev => (prev < lastPage ? prev + 1 : prev))}
      disabled={pagination?.next_page > lastPage}
    >
      Next
    </button>
  </div>
  
    </div>
      </div>


      
    </div>
  );
}

export default MusicList;

