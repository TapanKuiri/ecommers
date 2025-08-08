import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useState, useContext } from 'react'
import { assets } from '../../assets/assets';
import { ShopContext } from '../../context/ShopContext';
// import { NavbarLinks } from './NavbarLinks';
import { NavbarLinks } from './NavbarLinks/';
import { NavSidebarMenu } from './NavSidebarMenu';
import { NavProfile } from './NavProfile/';



export const NavbarLayout = () => {
    const [isVisible, setIsVisible] = useState(false);
    const {setShowSearch, showSearch, getCartCount} = useContext(ShopContext);
    const [value, setValue] = useState('home');
 

  return (


    // <div className='flex fixed items-center justify-between bg-gray-300 text-white p-1 md:mx-10 mx-0'>
    <div className='fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-gray-300 text-white px-2 md:px-10 py-2 shadow-md'>

        <Link to='/' >
            <img src={assets.logo} className='w-13 rounded-2xl mx-2 ' alt='logo'/>
        </Link>

          <NavbarLinks value={value} setValue ={setValue}/>


          <div className='flex  items-center gap-6'>
                <img className='w-6 cursor-pointer' 
                src={assets.search_icon}
                alt='Search Icon'
                onClick={()=>setShowSearch(!showSearch)}/>
                

                 <NavProfile/>

                <NavLink onClick={()=>setValue('')} to='/cart' className='relative'> 
                    <img src={assets.cart}
                    className='w-6.5 min-w-5 bg-gray-300' alt='cart'/>
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </NavLink>

                <img  onClick={()=>{setIsVisible(!isVisible)}  }
                src={assets.menu}
                className='w-6.5 cursor-pointer sm:hidden'/>
                 
                {/* sidebar menu for small screen */}
                <NavSidebarMenu isVisible={isVisible } setIsVisible={setIsVisible}/>

          </div>
    </div>
)
}