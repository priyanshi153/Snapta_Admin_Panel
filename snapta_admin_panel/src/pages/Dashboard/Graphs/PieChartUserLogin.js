import React from 'react' ;
import { PieChart, ResponsiveContainer, Pie, Cell, Label } from 'recharts';
import Calendar from '../../../assets/bar_calendar.png'
import ArrowDown from '../../../assets/bar_arrow.png'
import { useGetUserLoginQuery } from '../../../store/api/UserLoginDashboard';
import Cookies from 'js-cookie'
import Loader from '../../../assets/Loader.gif'

function CustomerLogin() 
{
    // const data = [
    //     { name: "Email", value: 250, percent: '25%'},
    //     { name: 'Mobile number', value: 650, percent: '45%'},
    //     { name: 'Gmail', value: 150, percent:'15%'},
    //     { name: 'Apple', value: 100, percent:'15%'},
    // ]

  const COLORS = [ '#D77960', '#6956E5', '#E6B47B','#B8D3E7'];

  const token = Cookies.get("token")
  const {data:UserLogin,isLoading} = useGetUserLoginQuery({token:token})
  console.log("UserLogin !!",UserLogin)

  const data = UserLogin ? [
    { name:"Email", value: UserLogin?.total_email_login, percent: UserLogin?.email_percentage},
    { name: "Mobile Number", value: UserLogin?.total_mobile_login, percent: UserLogin?.mobile_percentage},
    { name: "Gmail", value:UserLogin?.total_mobile_login, percent: UserLogin?.gmail_percentage},
    { name: "Apple", value:UserLogin?.total_apple_login, percent: UserLogin?.apple_percentage},
  ] : [];

   if (isLoading || !UserLogin) {
      return (
        <div className="border border-[#D1D5DB] rounded-lg p-4 w-[45%] h-[440px] flex items-center justify-center">
          <img src={Loader} className="w-12 h-12" alt="Loading..." />
        </div>
      );
    }

    return(
        <>
         <div className='border border-[#D1D5DB] dark:border-[#1F1F1F] p-4 2xl:w-[45%] w-fit rounded-lg'>
            <div className='flex justify-between place-items-center '>
                <h2 className='text-[#000000] text-base font-semibold font-poppins dark:text-darkText'>User by Login</h2>
            </div>
            {/* Pie Chart */}
            <ResponsiveContainer height={400} width={400} style={{ overflow: 'visible' }}>
  <PieChart>
    <defs>
      <filter id="pie-shadow" x="-20%" y="-20%" width="200%" height="200%">
        <feDropShadow dx="0" dy="4" stdDeviation="10" floodColor="#452B7A" floodOpacity="0.2" />
      </filter>
    </defs>

    <Pie
      data={data}
      innerRadius={75}
      outerRadius={110}
      paddingAngle={2}
      dataKey="value"
      filter="url(#pie-shadow)" 
      label={({ name, percent }) => `${percent}%`}
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  </PieChart>
</ResponsiveContainer>


            {/* Custom Legend */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
  {data.map((entry, index) => (
    <div
      key={index}
      style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          backgroundColor: COLORS[index],
          marginTop: 4, // ensures it aligns better with the text
        }}
      />
      <div className="flex flex-col items-start">
        <span className="font-poppins text-[#727272] text-sm">
          {entry.name}
        </span>
        <span className="text-[#484848] font-poppins text-sm">{entry.percent}%</span>
      </div>
    </div>
  ))}
            </div>
         </div>
        </>
    )
}

export default CustomerLogin;



