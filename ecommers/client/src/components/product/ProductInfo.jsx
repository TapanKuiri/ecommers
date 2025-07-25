import React from 'react'
import { assets } from '../../assets/assets'

export const ProductInfo = ({productData, currency, addToCart}) => {
  // console.log("id", );
  // console.log("data", productData)

  return (
    <div> 
 <div className='flex-1'>
        <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
        {/* <div className='flex items-center gap-1 mt-2'>
          <img src={assets.star} alt="" className="w-3 5" />
          <img src={assets.star} alt="" className="w-3 5" />
          <img src={assets.star} alt="" className="w-3 5" />
          <img src={assets.star} alt="" className="w-3 5" />
          <img src={assets.star} alt="" className="w-3 5" />
          <p className='pl-2'>(122)</p>

        </div> */}

        <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
        <p className='mt-5 text-gray-500 md:w-4/5:'>{productData.description}</p>
        <div className='flex flex-col gap-4 my-8'>
          {/* <p>Select Size</p>
          <div className='flex gap-2'>
                {productData?.sizes?.map((item, index)=>( 
                  <button onClick={()=> setSize(item)}
                   className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500': ''}`} key={index}>{item}</button>
                ))}
          </div> */}

          <button onClick={()=> addToCart(productData._id)}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CAT</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy withing 7 days.</p>
          </div>


        </div>

      </div>
    </div>
  )
}  
