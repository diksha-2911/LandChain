import React from 'react'
import land from '../../assets/land.jpg'
import SearchIcon from '@mui/icons-material/Search';

const Card = () => {
  return (
    <div className="max-w-sm bg-white border border-slate-200 rounded-lg shadow-lg bg-slate-100 border-slate-100">
        <a href="#">
            <img className="rounded-t-lg" src={land} alt="" />
        </a>
        <div className="p-5">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">Noteworthy technology acquisitions 2021</h5>
            </a>
            <ul>
              <li className="mb-3 font-normal text-slate-700"><b>Location:</b> Kochi, Kerala</li>
              <li className="mb-3 font-normal text-slate-700"><b>Area:</b> 2,000 sqft</li>
              <li className="mb-3 font-normal text-slate-700"><b>Seller:</b> 0xbassa234as...</li>
            </ul>
            <button className="w-[100%] mt-5 px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none hover:bg-green-700 focus:ring-green-800">
              Send Request
            </button>
        </div>
      </div>
  )
}

const Explore = () => {
  return (
    <div className='py-5 px-10'>
      <div className='grid grid-cols-7 gap-4'>
        <input type="text" placeholder='Search...' className='col-span-2 rounded-[15px] px-5 py-2 border border border-slate-500 w-full' />
        <input type="number" placeholder='sqft' className='col-span-2 rounded-[15px] px-5 py-2 border border border-slate-500 w-full' />
        <input type="number" placeholder='ID' className='col-span-2 rounded-[15px] px-5 py-2 border border border-slate-500 w-full' />
        <button className='bg-blue-700 rounded-[15px] col-span-1 text-center'><SearchIcon className="text-white" /></button>
      </div>
      <div className='grid grid-cols-3 gap-4 mt-10'>
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default Explore