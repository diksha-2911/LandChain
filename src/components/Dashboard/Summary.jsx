import React from 'react'

const Card = ({bg, title, count}) => {
    const cardClassName = `bg-${bg}-800 rounded-[15px] px-[30px] py-[70px]`;
    return (
        <div className={cardClassName}>
            <div className=''>
                <h1 className='text-center text-4xl text-white font-semibold'>{title}</h1>
                <div className='flex'>
                    <span className='m-auto mt-5 text-center text-5xl text-white font-bold'>{count}</span>
                </div>
            </div>
        </div>
    )
}

const Summary = () => {
  return (
    <div className='py-5 px-10'>
        <div className='grid grid-cols-3 gap-5'>
            <Card bg="red" title="Uploaded" count={5} />
            <Card bg="blue" title="Requests" count={5} />
            <Card bg="green" title="Pending Requests" count={5} />
        </div>
        <div className='mt-10'>
            <h1 className='text-3xl'>Hello <b>0x12552D91Ad5071228a274B0feaEabDF7D35AD902</b>!</h1>
            <div className='grid grid-cols-2 gap-4 mt-10'>
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text" className='rounded-[15px] px-5 py-2 border border border-slate-500 w-full' value="Abhinav C V" />
                </div>
                <div>
                    <label htmlFor="">Age</label>
                    <input type="text" className='rounded-[15px] px-5 py-2 border border border-slate-500 w-full' value="Abhinav C V" />
                </div>
            </div>
            <div className='grid grid-cols-1 mt-5'>
                <label htmlFor="">Aadhard IPFS Document</label>
                <a href="https://ipfs.co/234asfasx2x" className='text-blue-400'>https://ipfs.co/234asfasx2x</a>
            </div>
        </div>
    </div>
  )
}

export default Summary