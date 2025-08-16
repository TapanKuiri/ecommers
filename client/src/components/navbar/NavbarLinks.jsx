import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavbarLinks = ({value, setValue}) => {
  return (
    <div>
        <ul className='hidden sm:flex gap-11 text-sm text-gray-700'>

                        <NavLink to='/' onClick={()=>setValue('home')}  >
                            <p className={`${value === 'home' ? 'bg-black text-white rounded-2xl' : 'text-black'} p-1  flex flex-col items-center gap-1 font-extrabold`} >HOME</p>
                        </NavLink>
        
                        <NavLink  onClick={()=>setValue('products')}  to='/products'>
                            <p className={`${value === 'products' ? 'bg-black text-white rounded-2xl' : 'text-black'} p-1  flex flex-col items-center gap-1 font-extrabold`} >PRODUCTS</p>
                        </NavLink>
        
                        <NavLink to='/HandMade'  onClick={()=>setValue('HandMade')} >
                            <p className={`${value === 'HandMade' ? 'bg-black text-white rounded-2xl' : 'text-black'} p-1  flex flex-col items-center gap-1 font-extrabold`} >HANDMADE</p>
                        </NavLink>
                         <NavLink to='/service'  onClick={()=>setValue('service')} >
                            <p className={`${value === 'service' ? 'bg-black text-white rounded-2xl' : 'text-black'} p-1  flex flex-col items-center gap-1 font-extrabold`} >SERVICE</p>
                        </NavLink>
        
                        {/* <NavLink to='/contact'  onClick={()=>setValue('contact')} >
                            <p className={`${value === 'contact' ? 'bg-black text-white rounded-2xl' : 'text-black'} p-1  flex flex-col items-center gap-1 font-extrabold`} >CONTACT</p>
                        </NavLink> */}
                  </ul>
    </div>
  )
}
