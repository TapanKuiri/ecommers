import React from 'react'
import { ShopContext } from '../../context/ShopContext';
import { Title } from '../Title';
import { useContext } from 'react';

export const CartTotal = () => {
    const {currency, delivery_fee, getCartAmount, totalCartAmount} = useContext(ShopContext);
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTALS'}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>{currency}{totalCartAmount}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Visitation Fee</p> 
                <p>49</p>
                {/* <p>{currency}{delivery_fee}.00</p> */}
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                {/* <b>{currency}{totalCartAmount === 0 ? 0 : totalCartAmount+delivery_fee}</b> */}
                <b>{currency}{totalCartAmount === 0 ? 0 : (totalCartAmount+49).toFixed(2)}</b>
            </div>
        </div>
    </div>
  )
}
