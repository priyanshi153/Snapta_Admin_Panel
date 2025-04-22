import React from 'react'
import TotalUsers from './TotalUsers'
import TotalPosts from './TotalPosts'
import TotalReels from './TotalReels'
import TotalStories from './TotalStories'
import Searchbar from '../../components/Search'
import BarGraph from './Graphs/BarGraphCustomerGrowthSummaryGraph'
import PieChart from './Graphs/PieChartMediaAnalytics'
import CustomerLogin from './Graphs/PieChartUserLogin'
import UsersByCountry from './Graphs/LineChartUsersByCountries'
import PlatformActivity from './Graphs/PieChartPlatformActivity'
import UsersList from './DashboardUsersList'
import PostList from './DashboardPostList'
import HashtagList from './DashboardHashtagList'

function Dashboard() 
{
    return(
        <>
        <div className='mb-10 xl:pl-72 dark:bg-primary bg-secondary'>
            <Searchbar />
        <div className='flex flex-col gap-4 px-4 py-8 2xl:px-6 2xl:gap-8 2xl:flex 2xl:flex-row'>
            <div className='2xl:w-[25%]'>
                <TotalUsers />
            </div>
            <div className='2xl:w-[25%]'>
                <TotalPosts />
            </div>
            <div className='2xl:w-[25%]'>
                <TotalReels />
            </div>
            <div className='2xl:w-[25%]'>
                <TotalStories />
            </div>
          </div>

          {/* 2nd row */}
          <div className='flex flex-col w-full gap-4 px-6 2xl:flex-row'>
            <BarGraph />
            <PieChart />
          </div>
          
          {/* 3rd row */}
          <div className='flex flex-col w-full gap-4 px-6 py-8 2xl:flex-row'>
            <CustomerLogin />
            <UsersList />
          </div>

          {/* 4th row */}
          <div className='flex flex-col w-full gap-4 px-6 2xl:flex-row'>
            <UsersByCountry  />
            <PlatformActivity />
          </div>

          {/* 5th row */} 
          <div className='flex flex-col w-full gap-4 px-6 py-8 2xl:flex-row'>
            <PostList />
            <HashtagList />
          </div>
        </div>
        </>
    )
}

export default Dashboard