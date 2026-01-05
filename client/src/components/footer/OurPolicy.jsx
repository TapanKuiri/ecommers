import React from 'react'
import { assets } from '../../assets/assets'

export const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-xs md:text-base text-gray-700'> 
        <div>
            <img src={assets.exchange}  alt="exchange" className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Get services within 2 hours</p>
            {/* <p className='text-gray-400'>We provide best Services</p> */}
        </div>

        <div>
            <img src={assets.quality}  alt="quality" className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Up to 30 days of warranty</p>
            {/* <p className='text-gray-400'>We provide 7 days free return policy</p> */}
        </div>

        <div>
            <img src={assets.support}  alt="support" className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Best customer support</p>
            <p className='text-gray-400'>we provide 24/7 customer support</p>
        </div>
    </div>
  )
}
