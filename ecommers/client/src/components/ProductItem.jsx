import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

export const ProductItem = ({id, image, name, price}) => {
    // console.log(id, name, price);
    const {currency} = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`} className='text-green-700 cursor-pointer'>
        <div className='overflow-hidden'>
            <img src={image[0]} alt='img0' className='hover:scale-110 transition ease-in-out'/>
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}
