import React from 'react'
import Sidebar from '../components/Dashboard/Sidebar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Explore from '../components/Dashboard/Explore'
import Upload from '../components/Dashboard/Upload'
import Requests from '../components/Dashboard/Requests'
import Requested from '../components/Dashboard/Requested'
import Summary from '../components/Dashboard/Summary'
import View from '../components/Dashboard/View'

const DashboardPage = () => {
  return (
    <div className='grid grid-cols-4'>
        <Sidebar className="col-span-1" />
        <div className='col-span-3'>
          <Routes>
              <Route path='/' element={<Summary />} />
              <Route path='/view' element={<View />} />
              <Route path='/explore' element={<Explore />} />
              <Route path='/upload' element={<Upload />} />
              <Route path='/requests' element={<Requests />} />
              <Route path='/requested' element={<Requested />} />
          </Routes>
        </div>
    </div>
  )
}

export default DashboardPage