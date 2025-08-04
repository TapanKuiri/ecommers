import React from 'react'
import {assets} from '../assets/assets'

export const Navbar = ({setToken}) => {
  return (
    // <div className='flex item-center py-2 px-[4%] justify-between'>
    //     <img className='w-[max(10%, 80px)]' src={assets.logo} alt="" />
    //     <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-sm sm:text-sm' >Logout</button>
    // </div>

    <div className='flex item-center py-2 px-[4%] justify-between'>

        {/* <img className='w-[max(10%, 80px)]' src={assets.logo} alt="" /> */}
        {/* <img className='w-[max(10%, 80px)]' src={assets.contact} alt="" /> */}
        <p>hi</p>
        <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-sm sm:text-sm' >Logout</button>


    </div>

  )
}
