import React, { useState } from 'react'
import { Title } from '../components/Title'
import { CartTotal } from '../components/cart/CartTotal'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'


export const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext); 

  const [formData, setFromData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (event) =>{
      const name = event.target.name
      const value = event.target.value
      setFromData(data => ({...data, [name]: value}))
  }


  const onSubmitHandler = async (event) =>{
      event.preventDefault();
      try{

        let orderItems = []

        // console.log('cartItems: ', cartItems);
        // console.log('item: ',  cartItems[0]);

        for(const itemId in cartItems){
          for(const size in cartItems[itemId]){
            if(cartItems[itemId][size] > 0){
              const itemInfo = structuredClone(products.find(product => product._id === itemId))
              if(itemInfo){
                itemInfo.size = size
                itemInfo.quantity = cartItems[itemId][size]
                orderItems.push(itemInfo)
              }
            }
          }
        }

        // console.log("itemsrew", orderItems)
        let orderData = {
          address: formData,
          items : orderItems,
          amount: getCartAmount() + delivery_fee
        }

        switch(method){
          //api cash on delivery
          case 'cod':
            const response = await axios.post(backendUrl+'/api/order/place', orderData, {headers: {token}});
            // console.log("response", response);
            if(response.data.success){
               setCartItems({});
               
               navigate('/orders');
            }else{
              toast.error(response.data.message);
            }
            break;
          default: 
           break;
        }

      }catch(err){

      }
  }


  return (
    <form onSubmit={onSubmitHandler}
     className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ------------------left side---------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-xl sm:text-2xl my-3'>
            <Title text1 = {'DELIVERY'} text2 = {'INFORMATION'}/>
          </div>

          <div className='flex gap-3'>
            <input required onChange={onChangeHandler} name = 'firstName' value={formData.firstName}
             className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
            <input required  onChange={onChangeHandler} name = 'lastName' value={formData.lastName}
             className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
          </div>

            <input required  onChange={onChangeHandler} name = 'email' value={formData.email}
             className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
            <input required  onChange={onChangeHandler} name = 'street' value={formData.street}
             className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />

            <div className='flex gap-3'>
              <input required  onChange={onChangeHandler} name = 'city' value={formData.city}
               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City '/>
              <input required  onChange={onChangeHandler} name = 'state' value={formData.state}
               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
            </div>

            <div className='flex gap-3'>
              <input required  onChange={onChangeHandler} name = 'zipcode' value={formData.zipcode}
               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode'/>
              <input required  onChange={onChangeHandler} name = 'country' value={formData.country}
               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
            </div>
              <input required onChange={onChangeHandler} name = 'phone' value={formData.phone}
               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone Number' />

    </div>
{/* --------------------------------right side --------------------------- */}

      <div className='mt-8'>
        <div className='mt-8 min-w-80 '>
          <CartTotal/>
        </div>
        <div className='mt-12 '>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=> setMethod('razory')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razory' ? 'bg-green-500': ''}`}></p>
                <img src={assets.razoruypa} alt="" />
            </div>


            <div onClick={()=> setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500': ''}`}></p>
                <p className='text-gray-500 text-sm font-medium mx-4 '>CASH ON DELIVERY</p>
            </div>
            

          </div>
            <div className='w-full text-end mt-8'>
              <button type ='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </div>
        </div>
      </div>

      </form>
  )
}
