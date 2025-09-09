import React, { use } from 'react'
import { useNavigate } from 'react-router-dom';

export const ProductInfo = ({productData, currency, addToCart, buyHandler}) => {

  const navigate = useNavigate();  
  // console.log("id: ", productData._id);


  // const buyHandler = () => {
  //   console.log("Buy Now clicked");
  //   navigate('/cart');  
  // };
  
  return (
    <div> 
 <div className='flex-1 mx-3'>
        <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
        
       <div className="mt-5 flex items-center gap-4 flex-wrap ">
          <p className="text-3xl font-medium text-gray-500 line-through">
            {currency}{productData.price}
          </p>
          <p className="text-2xl font-semibold text-red-600">
            {productData.discount}%
          </p>
          <p className="text-3xl font-bold text-green-600">
            {currency}{productData.finalPrice}
          </p>
        </div>


        <p className='mt-5 text-gray-500 md:w-4/5:'>{productData.description}</p>
        <div className='flex flex-col gap-4 my-8'>
       
        <div className='fixed bottom-0 left-0 w-full flex items-center justify-center bg-white p-2 shadow-md sm:static sm:p-0'>
          <button
            onClick={() => addToCart(productData._id)}
            className='bg-orange-500 text-lg hover:bg-orange-600 transition-all duration-200 ease-in-out w-1/2 text-white py-3  font-semibold rounded-md'
          >
            🛒 Add to Cart
          </button>

          <button
             onClick={() => buyHandler(productData._id)}
            className='bg-green-500 hover:bg-green-600 transition-all duration-200 ease-in-out w-1/2 text-white py-3 text-lg font-semibold rounded-md ml-2'
          >
            ⚡ Buy Now
          </button>
        </div>



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
