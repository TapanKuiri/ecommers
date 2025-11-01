import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { memo } from 'react'


export const ProductItem = memo(({id, image, name, price,discount,finalPrice}) => {
     const {currency, setProductClicked} = useContext(ShopContext);

     console.log("run...")
  return (
    <Link to={`/product/${id}`} onClick={()=>setProductClicked(false)} className='text-green-700 cursor-pointer '>
        <div className='overflow-hidden'> 
            <img src={image[0]} alt='img0'  />
        </div>
        <div className='mx-2'>
          <p className='pt-3 pb-1 text-sm'>{name}</p>
        <div className='flex justify-between px-4'>
            <p className='text-sm font-medium line-through text-gray-500'>
              {currency}{price}
            </p>
            <p className='text-sm font-medium text-red-500'>
              -{discount}%
            </p>
            <p className='text-sm font-medium text-green-600'>
              {currency}{finalPrice}
            </p>
        </div>
      </div>


    </Link>
  )
})
