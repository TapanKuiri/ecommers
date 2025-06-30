import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
// import { ShopContext } from '../../context/ShopContext'
import { ShopContext } from '../../context/ShopContext'


export const NavProfile = () => {

  const { navigate, token, setToken, setCartItems} = useContext(ShopContext);
  // console.log("token", token)

  const logout = ()=>{
    localStorage.removeItem('token');
    setToken('')
    setCartItems({});
    navigate('/login')
  }
  return (
    <div> 
        <div className='group relative'>
           <img onClick={()=> token ? null : navigate('/login') } className='w-5 cursor-pointer'
            src={assets.profile}
            alt='Profile Icon'/>  
          {/* // dropdown menu  */}
          {
            token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 py-3 px-5 bg-slate-100 text-gray-700'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p onClick={()=> navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                            <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>

                        </div>
                    </div>
          }
             
        </div>    
    </div>
  )
}
