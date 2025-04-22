import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import UserList from "./pages/UserList/UserList";
import Sidebar from "./pages/Sidebar/Sidebar";
import PostList from "./pages/PostList/PostList";
import ReelList from "./pages/ReelList/ReelList";
import StoriesList from "./pages/StoriesList/StoriesList";
import UserReportList from "./pages/ReportList/UserReportList";
import PostReportList from './pages/ReportList/PostReportList';
import ReelReportList from './pages/ReportList/ReelReportList'
import SignIn from "./pages/SignIn/SignIn";
import HashtagList from './pages/HashtagList/HashtagList'
import PushNotification from "./pages/PushNotification/PushNotification";
import LanguageList from './pages/LanguageList/LanguageList'
import MusicList from './pages/MusicList/MusicList'
import BlockList from './pages/BlockList/BlockList'
import AvatarList from './pages/AvatarList/AvatarList'
import CMS from './pages/CMSPages/PrivacyPolicy'
import Profile from './pages/Profile/Profile'
import UserProfile from './pages/UserProfile/Userprofile'
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from './pages/Settings/Settings'
import CountryWiseUserList from './pages/CountryWiseUsersList/CountryWiseUsersList'
import { ThemeProvider } from "./context/ThemeProvider";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideSidebarRoutes = ["/signin"];
  const hideSidebar = hideSidebarRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="min-h-screen xl:flex dark:bg-primary">
      <Toaster position="top-center" reverseOrder={false} />
      {!hideSidebar && 
       <div className="hidden xl:block">
        <Sidebar />
        </div>}
      
      <div className="xl:flex-1">
        <ThemeProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/post-list" element={<PostList />} />
          <Route path="/reel-list" element={<ReelList />} />
          <Route path="/stories-list" element={<StoriesList />}/>
          <Route path="/country-wise-users" element={<CountryWiseUserList />} />
          <Route path="/user-report-list" element={<UserReportList />} />
          <Route path="/post-report-list" element={<PostReportList />} />
          <Route path="/reel-report-list" element={<ReelReportList />} />
          <Route path="/hashtag-list" element={<HashtagList />} />
          <Route path="/language-list" element={<LanguageList />} />
          <Route path="/push-notification" element={<PushNotification />} />
          <Route path="/music-list" element={<MusicList />} />
          <Route path="/block-list" element={<BlockList />} />
          <Route path="/avatar-list" element={<AvatarList />} />
          <Route path="/:source/user-profile" element={<UserProfile />} />
          <Route path="/cms" element={<CMS />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        </ThemeProvider>
      </div>
    </div>
  );
}

