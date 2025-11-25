import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useState, useContext } from 'react'
import { assets } from '../../assets/assets';
import { ShopContext } from '../../context/ShopContext';
// import { NavbarLinks } from './NavbarLinks';
import { NavbarLinks } from './NavbarLinks';
import { NavSidebarMenu } from './NavSidebarMenu';
import { NavProfile } from './NavProfile';
import { SearchBar } from '../SearchBar';



export const NavbarLayout = () => {
    // const [isVisible, setIsVisible] = useState(false);
    const {setShowSearch, showSearch, getCartCount} = useContext(ShopContext);

  return (

  <div className='flex flex-col w-full '>

   
    {/* // <div className='flex fixed items-center justify-between bg-gray-300 text-white p-1 md:mx-10 mx-0'> */}
    <div className='fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-gray-300 text-white px-2 md:px-7 py-1'>

        <Link to='/' >
            <img src={assets.logo2} className='w-13 rounded-xl p-0.5 border-1 border-slate-50  ' alt='logo'/>
        </Link>
 
        <SearchBar/>
          <NavbarLinks/>

          <div className='flex  items-center gap-2'>
                 
                 <NavProfile/>
                <Link to='/cart' className='relative '>
                <img src={assets.cart} className='w-6.5 min-w-5 h-7 mr-3 bg-gray-300' alt='cart'/>
                <p className='absolute right-[-5px] bottom-[-5px] w-4 mr-3 text-center leading-4 bg-green-500 text-black aspect-square rounded-full text-[10px]'>
                    {getCartCount()}
                </p>
                </Link>


                {/* <img  onClick={()=>{setIsVisible(!isVisible)}  }
                src={assets.menu}
                className='w-6.5 cursor-pointer sm:hidden'/>
                  */}
                {/* sidebar menu for small screen */}
                {/* <NavSidebarMenu isVisible={isVisible } setIsVisible={setIsVisible}/> */}

           
          </div>
    </div>

    <div className='fixed left-0 top-14 w-full z-30 flex items-center justify-between text-white '>
        <NavSidebarMenu/>
    </div>
  </div>
    
)
}