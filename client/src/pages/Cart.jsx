import React from 'react'
// import {Shopcontext} from '../context/ShopContext'
import {ShopContext} from '../context/ShopContext';
import { useContext, useEffect, useState } from 'react';
import { Title } from '../components/Title';
import { assets } from '../assets/assets';
// import { CartTotal } from '../components/cart/CartTotal';
import {CartTotal} from '../components/cart/CartTotal';
import axios from 'axios';

export default  function Cart(){
  const {currency, cartItems,updateQuantity, navigate, backendUrl, setTotalCartAmount} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // console.log("products: cart", products);

  const getCartData = async()=>{
    const tempData = [];
    let cartTotal = 0;


    for(const key in cartItems){
      const response = await axios.post(`${backendUrl}/api/product/single`, {productId: key});
      cartTotal += (response.data.product.finalPrice * cartItems[key]);
      tempData.push({
        ...response.data.product,
        quantity: cartItems[key]
      })
    }
    setIsLoading(true);

    setCartData(tempData);
    setTotalCartAmount(parseFloat(cartTotal.toFixed(2)));
  }


useEffect(() => {
  getCartData();
}, [cartItems]);

 
  return (
    <div className=' border-t pt-14 mx-2.5'>
      <div className='text-2xl mb-3'>
          <Title text1={'YOUR'} text2={'CART'}/>
      </div>

      <div>
       { isLoading ?   ( 
 
          cartData.map((item, index)=>{
            return (
              <div key = {index} className='py-4 border-t  border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_o.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{item.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{item.finalPrice}</p>
                    </div>
                  </div>
                </div>

                <input onChange={(e)=> e.target.value === '' || e.target.value === 0 ? null : updateQuantity(item._id, Number(e.target.value))}
                 className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                  type="number" min={1} defaultValue={item.quantity} />

                <img onClick={()=> updateQuantity(item._id, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin} alt="" />
             </div>
            )

          }) ) : (
          <div className='w-full flex justify-center items-center'>
            <img className='w-20' src={assets.spinner} alt="" />
          </div>
        )
        }  
      </div>

      <div className='flex justify-end mt-20'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal/>
            <div className='w-full text-end'>
              <button onClick={()=> navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECHOUT</button>

            </div>
          </div>

      </div>


    </div>
  )
}