import React from 'react'
import { assets } from '../../assets/assets'

export const FooterLayout = () => {
  return (
    <div>
        <div className='flex flex-col bg-gray-200 sm:grid grid-cols-[3fr_1fr_1fr] gap-10 sm:gap-0 justify-around items-center py-20 text-xs sm:text-xs md:text-base text-gray-900'>
            <div className='flex flex-col items-center justify-center text-center py-6'>
            < img src={assets.logo21} className='mb-5 w-32' alt='logo' />
 


            <p className='w-full md:w-2/3 text-gray-400 p-3'>
            FixyBuy is a technology-driven platform offering expert repair & installation services. Powered by skilled technicials and advanced diagonostics, we ensure optimal performance, reliability, and smart value for every customer.
                {/* We offer a wide range of quality products, unique handmade crafts, and a reliable repair service for faulty items — giving you both new treasures and second chances for the old ones. */}
            </p>
        </div>


            <div className='text-center'>
                <p className='text-xl font-medium mb-5' >COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy police</li>
                </ul>
            </div>

            <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd2-ge48KmptIRVtPqM2TFl15pYrqhSDNXNtz3296L9VX7wCw/viewform?usp=publish-editor"
            target=" "
            rel="noopener noreferrer"
            className="px-5 py-3 border-2 border-green-500 rounded-lg font-medium
                      transition-all duration-300 hover:bg-green-500 hover:text-white
                      hover:shadow-lg hover:shadow-green-300
                      transform hover:-translate-y-1 hover:scale-105"
          >
            Register as a Service Partner
          </a>

            <div className='text-center'>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 8617892989 us</li>
                    <li>fixybuy@gmail.com</li>
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
