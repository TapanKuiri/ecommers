import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-1 '>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink to='/add' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                <img className='w-5 h-5' src={assets.add} alt="add" />
                <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink to='/list' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                <img className='w-5 h-5' src={assets.add} alt="add" />
                <p className='hidden md:block'>List items</p>
            </NavLink>

            <NavLink to='/orders' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                <img className='w-5 h-5' src={assets.add} alt="add" />
                <p className='hidden md:block'>Orders</p>
            </NavLink>
            <NavLink to='/repair' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                <img className='w-5 h-5' src={assets.repair} alt="add" />
                <p className='hidden md:block'>Repair</p>
            </NavLink>
        </div>
    </div>
  )
}