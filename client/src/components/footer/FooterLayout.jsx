import React from 'react'
import { assets } from '../../assets/assets'

export const FooterLayout = () => {
  return (
    <div>
        <div className='flex flex-col bg-gray-200 sm:grid grid-cols-[3fr_1fr_1fr] gap-10 sm:gap-0 justify-around items-center py-20 text-xs sm:text-xs md:text-base text-gray-900'>
            <div className='flex flex-col items-center justify-center text-center py-6'>
            <img src={assets.logo} className='mb-5 w-32' alt='logo' />
            <p className='w-full md:w-2/3 text-gray-400'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, doloremque.
            </p>
        </div>


            <div>
                <p className='text-xl font-medium mb-5' >COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy police</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+1-232-454-7500 us</li>
                    <li>contact@gmail.com</li>
                </ul>
            </div>

        </div>
            <div>
                <hr/>
                <p className='text-center text-gray-400 py-5'>Copyright © 2023 All rights reserved</p>
            </div>
    </div>
  )
}
