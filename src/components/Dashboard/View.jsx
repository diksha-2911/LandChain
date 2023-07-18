import React from 'react'
import land from '../../assets/land.jpg'
import CancelIcon from '@mui/icons-material/Cancel';

const Card = ({title, sqft, seller, loc}) => {
    const [sale, setSale] = React.useState(false)
    const [popup, setPopup] = React.useState(false)
    return (
        <>
            {popup && 
                <div className='absolute px-10 mb-10'>
                    <div className='bg-white shadow-lg px-10 py-10 w-[90%] rounded-[20px]'>
                        <div className='flex justify-between'>
                            <img src={land} className='rounded-t-lg h-[300px] mb-10' alt="" />
                            <span><CancelIcon className='!text-4xl text-slate-500 cursor-pointer' onClick={() => setPopup(false)} /></span>
                        </div>
                        <h1 className='text-2xl mb-10'><b>Title: </b>{title}</h1>

                        <h1 className='text-2xl mb-10'><b>Size: </b>{sqft} sqft</h1>

                        <h1 className='text-2xl mb-10'><b>Size: </b>{loc}</h1>

                        <h3 className='text-xl'><b>Description: </b></h3>
                        <p className='mb-10'>Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum</p>

                        <h3 className='text-xl'><b>Address: </b></h3>
                        <p className='mb-10'>Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum</p>


                    </div>
                </div>
            }
            <div className="max-w-sm bg-white border border-slate-200 rounded-lg shadow-lg bg-slate-100 border-slate-100 mb-10">
            <a href="#">
                <img className="rounded-t-lg" src={land} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-slate-900">{title}</h5>
                </a>
                <ul>
                    <li className="mb-3 font-normal text-slate-700"><b>Location:</b> {loc}</li>
                    <li className="mb-3 font-normal text-slate-700"><b>Area:</b> {sqft} sqft</li>
                    <li className="mb-3 font-normal text-slate-700"><b>Seller:</b> {seller.slice(0, 7) + '...'}</li>
                </ul>
                <div className='flex justify-between'>
                    {!sale ? 
                        <button onClick={() => setSale(true)} className="mt-5 px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none hover:bg-red-700 focus:ring-red-800">
                            Mark for sale
                        </button>
                    : 
                        <button onClick={() => setSale(false)} className="mt-5 px-3 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none hover:bg-green-700 focus:ring-green-800">
                            For Sale
                        </button>
                    }
                    <button onClick={() => setPopup(true)} className="mt-5 px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none hover:bg-blue-700 focus:ring-blue-800">
                        View Details
                    </button>
                </div>
            </div>
            </div>
        </>
    )
}

const View = () => {
  return (
    <div className='px-10 py-5'>
        <div className='grid grid-cols-3 gap-4 mt-10'>
        <Card title="Noteworthy technology acquisitions 2021" sqft={2000} seller="0x12552D91Ad5071228a274B0feaEabDF7D35AD902" loc="Kochi, Kerala" />
        <Card title="Noteworthy technology acquisitions 2021" sqft={2000} seller="0x12552D91Ad5071228a274B0feaEabDF7D35AD902" loc="Kochi, Kerala" />
        <Card title="Noteworthy technology acquisitions 2021" sqft={2000} seller="0x12552D91Ad5071228a274B0feaEabDF7D35AD902" loc="Kochi, Kerala" />
        
      </div>
    </div>
  )
}

export default View