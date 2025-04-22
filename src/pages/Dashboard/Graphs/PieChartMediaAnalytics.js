import React from 'react' ;
import { PieChart, ResponsiveContainer, Pie, Cell, Label } from 'recharts';
import Calendar from '../../../assets/bar_calendar.png'
import ArrowDown from '../../../assets/bar_arrow.png'
import { useGetMediaGraphQuery } from '../../../store/api/MediaGraphDashboard';
import Cookies from 'js-cookie'
import Loader from '../../../assets/Loader.gif'

function PieCharts() 
{

  const COLORS = ['#8DE3F5', '#59A7FF', '#A5F6C6'];

  const token = Cookies.get("token")
  const {data:MediaData,isLoading} = useGetMediaGraphQuery({token:token})

  console.log("Media @@@",MediaData)
  const data = MediaData ? [
    { name: "Post", value: MediaData.total_post, percentage: MediaData.post_persontage },
    { name: "Reel", value: MediaData.total_reel, percentage: MediaData.reel_persontage },
    { name: "Story", value: MediaData.total_story, percentage: MediaData.story_persontage },
  ] : [];

   if (isLoading || !MediaData) {
      return (
        <div className="border border-[#D1D5DB] rounded-lg p-4 w-full h-[440px] flex items-center justify-center">
          <img src={Loader} className="w-12 h-12" alt="Loading..." />
        </div>
      );
    }
    return(
        <>
         <div className='border border-[#D1D5DB] dark:border-[#1F1F1F] p-4 w-full rounded-lg'>
            <div className='flex justify-between place-items-center '>
                <h2 className='text-[#000000] text-base font-semibold font-poppins dark:text-darkText'>Media Analytics Graph</h2>
                {/* Year Dropdown */}
               <div className="flex items-center gap-2">
                <img src={Calendar} className="w-5 h-5" />
                <div className="flex items-center gap-2">
                    <h2 className="font-poppins text-[#8C8C8C] text-base font-medium">2025</h2>
                    <img src={ArrowDown} className="w-4 h-4 cursor-pointer" />
                </div>
               </div>
            </div>
            {/* Pie Chart */}
            <div className='relative flex items-center justify-center'>
            <ResponsiveContainer height={400} width={400}>
                <PieChart >
                    <Pie 
                      data={data}
                      borderRadius={5}
                      innerRadius={75}
                      outerRadius={130}
                      paddingAngle={2}
                      cornerRadius={10}
                      dataKey="value"
                      label={({ name,value }) => `${value}`}>
                        {data.map((entry,index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            <div className="absolute text-center">
                <p className="text-[#757575] font-semibold text-base">Total Media</p>
                <p className="text-[#484848] font-bold text-lg leading-none">{MediaData?.total_count}</p>
            </div>
        </div>

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
        <span className="font-poppins text-[#727272] text-base">
          {entry.name}
        </span>
        <span className="text-[#484848] font-poppins text-sm">{entry.percentage}%</span>
      </div>
    </div>
  ))}
</div>
         </div>
        </>
    )
}

export default PieCharts;

